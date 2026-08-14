import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2026-06-24.dahlia" as const,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, recurring, campaign } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    // Amount comes in as dollars, convert to cents for Stripe
    const unitAmount = Math.round(amount * 100);
    const getAppUrl = () => {
      if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
      if (process.env.VERCEL_ENV === "production") return "https://www.r3sults.org";
      if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
      return "http://localhost:3000";
    };
    const appUrl = getAppUrl();

    const sessionData: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      metadata: {
        campaign: campaign || "General Fund",
      },
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Donation to Results.org",
              description: `Thank you for choosing to make a ${recurring ? 'monthly ' : ''}impact.`,
            },
            unit_amount: unitAmount,
            ...(recurring ? { recurring: { interval: "month" } } : {}),
          },
          quantity: 1,
        },
      ],
      mode: recurring ? "subscription" : "payment",
      success_url: `${appUrl}/donation/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/#donate`,
    };

    const session = await stripe.checkout.sessions.create(sessionData);

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Error creating checkout session:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
