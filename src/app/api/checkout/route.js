import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    // Parse request body to extract the price ID
    const formData = await req.formData();
    const priceId = formData.get("priceId");

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId, // Use the price ID passed from the form
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/?success=true`,
      cancel_url: `${req.headers.get("origin")}/?canceled=true`,
    });

    // Redirect to the Stripe Checkout URL
    return new Response(null, {
      status: 303,
      headers: { Location: session.url },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: err.statusCode || 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
