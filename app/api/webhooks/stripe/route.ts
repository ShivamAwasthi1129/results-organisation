import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import nodemailer from "nodemailer";
import { generateReceiptPDF } from "@/lib/generate-receipt";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;


export async function POST(req: NextRequest) {
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecret) {
    throw new Error("STRIPE_SECRET_KEY is not defined in environment variables");
  }
  const stripe = new Stripe(stripeSecret, {
    apiVersion: "2026-06-24.dahlia" as const,
  });

  console.log(`\n\n--- Webhook Hit at ${new Date().toISOString()} ---\n`);

  const payload = await req.text();
  const sig = req.headers.get("stripe-signature");

  console.log(`Signature present: ${!!sig}, Secret present: ${!!endpointSecret}`);

  let event: Stripe.Event;

  try {
    if (!sig || !endpointSecret) {
      throw new Error("Missing signature or secret");
    }
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    console.log(`Event constructed successfully: ${event.type}`);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const sessionBase = event.data.object as Stripe.Checkout.Session;

      const session = await stripe.checkout.sessions.retrieve(sessionBase.id, {
        expand: ['payment_intent', 'payment_intent.payment_method', 'subscription'],
      });

      const email = session.customer_email || session.customer_details?.email;
      const amountTotal = session.amount_total;
      const amountFormatted = amountTotal ? (amountTotal / 100).toFixed(2) : "0.00";

      const campaign = session.metadata?.campaign || "Standard Contribution";
      const campaignId = session.metadata?.campaign_id || "CAM-001";
      const campaignLocation = session.metadata?.campaign_location || "";
      const campaignDate = session.metadata?.campaign_date || "";

      let paymentMethodStr = "Credit Card";
      let transactionIdStr = session.id;

      if (session.payment_intent && typeof session.payment_intent !== 'string') {
        const pi = session.payment_intent as Stripe.PaymentIntent;
        transactionIdStr = pi.id;
        if (pi.payment_method && typeof pi.payment_method !== 'string') {
          const pm = pi.payment_method as Stripe.PaymentMethod;
          if (pm.card) {
            paymentMethodStr = `Credit Card ending in •••• ${pm.card.last4}`;
          } else {
            paymentMethodStr = pm.type;
          }
        }
      } else if (session.subscription) {
        paymentMethodStr = "Recurring Subscription";
      }

      let donorLocation = "";
      if (session.customer_details?.address) {
        const city = session.customer_details.address.city;
        const country = session.customer_details.address.country;
        if (city && country) {
          donorLocation = `${city}, ${country}`;
        } else if (country) {
          donorLocation = country;
        }
      }

      console.log(`Extracted email: ${email}, amount: ${amountFormatted}`);

      if (email) {
        try {
          const name = session.customer_details?.name || "Donor";
          const randomStr = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
          const receiptNo = `R3S-${new Date().getFullYear()}-${randomStr}`;
          
          const createdTimestamp = session.created ? new Date(session.created * 1000) : new Date();
          const donationDate = createdTimestamp.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
          const donationTime = createdTimestamp.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' });

          const pdfBuffer = await generateReceiptPDF({
            receiptNo,
            donationDate,
            donationTime,
            donorName: name,
            donorEmail: email,
            amount: amountFormatted,
            campaign: campaign,
            campaignId: campaignId,
            campaignLocation: campaignLocation || undefined,
            campaignDate: campaignDate || undefined,
            contributionType: session.mode === 'subscription' ? 'Monthly Recurring Donation' : 'Monetary Donation',
            paymentMethod: paymentMethodStr,
            transactionId: transactionIdStr,
            donorLocation: donorLocation || undefined,
          });

          const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com",
            port: parseInt(process.env.SMTP_PORT || "587"),
            secure: process.env.SMTP_SECURE === "true",
            auth: {
              user: process.env.EMAIL_ID,
              pass: process.env.EMAIL_PASS,
            },
          });

          const campaignImpactText = campaign === "Standard Contribution" 
            ? "various natural disasters and humanitarian crises" 
            : campaign;

          await transporter.sendMail({
            from: `"R3SULTS Foundation" <${process.env.EMAIL_ID}>`,
            to: email,
            subject: `Your Donation Receipt – R3SULTS Foundation (Receipt No. ${receiptNo})`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
                <p>Dear ${name},</p>
                <p>Thank you for your generous gift of $${amountFormatted} to R3SULTS Foundation Inc. in support of ${campaign}.</p>
                <p>Your official tax receipt is attached to this email. Please retain it for your records.</p>
                
                <p style="margin-top: 20px; font-weight: bold;">Donation Summary</p>
                <ul style="list-style-type: none; padding-left: 0; margin-top: 5px;">
                  <li>• Receipt No.: ${receiptNo}</li>
                  <li>• Date & Time: ${donationDate} at ${donationTime}</li>
                  <li>• Amount: $${amountFormatted} USD</li>
                  <li>• Campaign: ${campaign} (${campaignId})</li>
                  <li>• Payment Method: ${paymentMethodStr}</li>
                  ${donorLocation ? `<li>• Location: ${donorLocation}</li>` : ''}
                </ul>
                
                <p>No goods or services were provided in exchange for this contribution. Please consult your tax adviser regarding the deductibility of your gift.</p>
                
                <p style="margin-top: 20px; font-weight: bold;">Your Impact</p>
                <p>Your contribution helps us deliver urgent humanitarian assistance — shelter, supplies, and recovery support — to communities affected by disasters like ${campaignImpactText}. Because of donors like you, help arrives when it matters most.</p>
                <p>Thank you for helping communities when they need it most.</p>
                
                <p style="margin-top: 30px;">With gratitude,</p>
                <p>
                  <strong>R3SULTS Foundation Inc.</strong><br/>
                  A U.S. nonprofit organization<br/>
                  R3SULTS.org | <a href="mailto:donations@r3sults.org">donations@r3sults.org</a>
                </p>
                <hr style="border: none; border-top: 1px solid #ccc; margin-top: 30px; margin-bottom: 20px;" />
                <p style="font-size: 12px; color: #666;">
                  Questions about your donation? Reply to this email or write to <a href="mailto:donations@r3sults.org">donations@r3sults.org</a> and reference Receipt No. ${receiptNo}.
                </p>
              </div>
            `,
            attachments: [
              {
                filename: `Receipt_${receiptNo}.pdf`,
                content: pdfBuffer,
                contentType: 'application/pdf'
              }
            ]
          });
          console.log(`Confirmation email sent to ${email}`);
        } catch (error: any) {
          console.error("Error sending email:", error);
        }
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
