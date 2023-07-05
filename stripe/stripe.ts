import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.PK_STRIPE || '');

export default stripePromise;