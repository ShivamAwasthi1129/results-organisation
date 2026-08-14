import Stripe from 'stripe';
import fs from 'fs';

// Read .env.local
const envStr = fs.readFileSync(".env.local", "utf-8");
const env = Object.fromEntries(
  envStr.split("\n").filter(l => l && !l.startsWith("#")).map(l => {
    const splitIndex = l.indexOf("=");
    return [l.substring(0, splitIndex), l.substring(splitIndex + 1).trim()];
  })
);

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2026-06-24.dahlia",
});

async function run() {
  const payload = JSON.stringify({
    id: "evt_test_123",
    object: "event",
    type: "checkout.session.completed",
    data: {
      object: {
        id: "cs_test_mock",
        object: "checkout.session",
        amount_total: 25000,
        customer_details: {
          email: env.EMAIL_ID || "test@example.com",
          name: "Test User",
        },
        metadata: {
          campaign: "Colombia Earthquake Relief 2026",
        },
        payment_intent: "pi_test_mock",
        mode: "payment"
      }
    }
  });

  const secret = env.STRIPE_WEBHOOK_SECRET;
  
  // Generate a valid signature for localhost testing
  const timestamp = Math.floor(Date.now() / 1000);
  const payloadToSign = `${timestamp}.${payload}`;
  const crypto = await import('crypto');
  const signature = crypto.createHmac('sha256', secret).update(payloadToSign).digest('hex');
  const sigHeader = `t=${timestamp},v1=${signature}`;

  console.log("Sending mock webhook to localhost:3000...");
  
  try {
    const res = await fetch("http://localhost:3001/api/webhooks/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "stripe-signature": sigHeader
      },
      body: payload
    });

    const text = await res.text();
    console.log("Response status:", res.status);
    console.log("Response body:", text);
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

run();
