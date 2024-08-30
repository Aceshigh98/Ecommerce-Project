import Stripe from "stripe";

class StripeService {
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  async createCheckoutSession(priceId, origin, itemQuantity) {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: itemQuantity,
        },
      ],
      mode: "payment",
      success_url: `${origin}/?success=true`,
      cancel_url: `${origin}/?canceled=true`,
    });

    return session;
  }

  async getBalance() {
    const balance = await this.stripe.balance.retrieve();
    return balance;
  }

  async createProduct() {
    const product = await this.stripe.products.create({
      name: "",
    });

    return product;
  }
}
export default StripeService;
