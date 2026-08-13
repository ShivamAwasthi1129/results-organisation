import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import nodemailer from "nodemailer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-01-27.acacia",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;


export async function POST(req: NextRequest) {
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
      const session = event.data.object as Stripe.Checkout.Session;
      
      const email = session.customer_email || session.customer_details?.email;
      const amountTotal = session.amount_total;
      const amountFormatted = amountTotal ? (amountTotal / 100).toFixed(2) : "0.00";

      console.log(`Extracted email: ${email}, amount: ${amountFormatted}`);

      if (email) {
        try {
          const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com",
            port: parseInt(process.env.SMTP_PORT || "587"),
            secure: process.env.SMTP_SECURE === "true",
            auth: {
              user: process.env.EMAIL_ID,
              pass: process.env.EMAIL_PASS,
            },
          });

          await transporter.sendMail({
            from: `"Results.org" <${process.env.EMAIL_ID}>`,
            to: email,
            subject: "Thank You for Your Donation!",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                <h1 style="color: #e53e3e;">Thank You!</h1>
                <p>We have successfully received your donation of <strong>$${amountFormatted}</strong>.</p>
                <p>Your support makes a real difference and helps us continue our mission.</p>
                <br />
                <p>With gratitude,</p>
                <p><strong>The Results.org Team</strong></p>
              </div>
            `,
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
