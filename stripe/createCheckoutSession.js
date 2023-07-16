import app from "../firebase/clientApp";
import getStripe from "./initializeStripe";
import {
  collection,
  getFirestore,
  setDoc,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";

export default async function createCheckoutSession(uid) {
  const db = getFirestore(app);
  const checkoutSessionRef = collection(
    db,
    `users/user-` + uid + `/checkout_sessions`
  );
  console.log(doc(checkoutSessionRef));
  const newCheckoutSession = {
    price: "price_1NHt89CwphplMhaR6UzbRKqT",
    success_url: window.location.origin + "/dashboard",
    cancel_url: window.location.origin + "/",
  };

  const checkoutSesh = await setDoc(
    doc(checkoutSessionRef),
    newCheckoutSession
  );


  // Wait for the CheckoutSession to get attached by the extension
  const ohWell = onSnapshot(checkoutSessionRef, async (snap) => {
    try {
      console.log(snap)
      // console.log(snap.docs[0]._key.path.segments[snap.docs[0]._key.path.segments.length - 1]);
      // const sessionId = snap.docs[0]._key.path.segments[snap.docs[0]._key.path.segments.length - 1];
      const sessionId = snap.docs[0]._key.path.segments[
        snap.docs[0]._key.path.segments.length - 1
      ];
      if (sessionId) {
        // We have a session, let's redirect to Checkout
        // Init Stripe
        const stripe = await getStripe();
        console.log(stripe)
        stripe.redirectToCheckout({ sessionId });
      }
    } catch (err) {
      console.log(err);
    }
  });
}
