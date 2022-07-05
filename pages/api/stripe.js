import Stripe from 'stripe'

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    
    try {
      // we have added additional properties like submit type, mode, payment methods etc. 
      const params = {
        submit_type: 'pay', 
        mode: 'payment',
        payment_method_types: ['card'], 
        billing_address_collection: 'auto', 
        shipping_options: [
            // Free shipping
            {shipping_rate: 'shr_1LHqQnDB0yFJmfsIwKje5OJi'},
        ],
        // line_itms = items which the user has selected to purchase
        line_items: req.body.map((item) => { 
            const img = item.image[0].asset._ref; 
            // depending on the image, we might need to change -.webp to something else
            const newImage = img.replace('image-', 'https://cdn.sanity.io/images/3t3tdzj2/production/').replace('-.webp', '.webp')
            
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name, 
                        images: [newImage],
                    },
                    unit_amount: item.price * 100, 
                },
                adjustable_quantity: {
                    enabled: true,
                    minimum: 1, 
                },
                quantity: item.quantity
            }
        }),
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/canceled`,
      }

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session)
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}