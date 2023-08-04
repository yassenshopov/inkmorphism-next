import {loadStripe} from '@stripe/stripe-js';

let stripePromise;

const initializeStripe = async () => {
    if (!stripePromise) {
        // stripePromise = await loadStripe(`${process.env.STRIPE_PUBLISHABLE_KEY}`);
        stripePromise = await loadStripe("pk_live_51NHrXlCwphplMhaRwvZCW8gHqxpHfgXaqBjfALA0yj1uF2Gp8gtfJPoJx9baGYTkc0s7aDyCGsn12r5M8eatpGBJ00UPbo3kNl");
    }
    return stripePromise;
};
export default initializeStripe;