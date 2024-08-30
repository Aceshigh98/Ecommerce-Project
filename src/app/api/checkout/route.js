const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { auth } from "@/src/lib/auth"; // Adjust the import path as needed

export async function POST(req) {
  const userSession = await auth();

  if (!userSession) {
    return new Response(null, {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Parse request body to extract the price ID and order value
    const formData = await req.formData();
    const origin = req.headers.get("origin");
    const orderValue = parseFloat(formData.get("orderValue")); // Ensure orderValue is a number

    // Convert orderValue to the smallest currency unit (e.g., cents)
    const amountInCents = Math.round(orderValue * 100);

    // Create Stripe Checkout session with custom price_data
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // Specify accepted payment methods
      line_items: [
        {
          price_data: {
            currency: "usd", // Set the currency
            product_data: {
              name: "Custom Order", // Customize product name
            },
            unit_amount: amountInCents, // Set the amount based on orderValue
          },
          quantity: 1, // Specify quantity
        },
      ],
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`, // URL to redirect after successful payment
      cancel_url: `${origin}/cancel`, // URL to redirect after canceled payment
    });
    // Redirect to the Stripe Checkout URL
    return new Response(null, {
      status: 303,
      headers: { Location: checkoutSession.url }, // Correct redirect URL
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: err.statusCode || 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
