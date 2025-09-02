import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with your secret key from the .env.local file
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

export async function POST(req: Request) {
  // Get the URL of your application to build the success/cancel URLs
  const origin = req.headers.get("origin") || "http://localhost:3000";

  try {
    // Create a Checkout Session using the Price ID from your .env.local file
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID, 
          quantity: 1,
        },
      ],
      mode: "payment",
      // These are the URLs Stripe will redirect the user to after the payment attempt
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment/cancel`,
    });

    // Send the session URL back to the frontend
    return NextResponse.json({ sessionId: session.id, url: session.url });

  } catch (error){
    console.error("Error creating Stripe session:", error);
    return NextResponse.json(
      { error: "Error creating checkout session" },
      { status: 500 }
    );
  }
}

