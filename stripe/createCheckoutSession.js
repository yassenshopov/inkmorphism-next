import app from "../firebase/clientApp";
import getStripe from "./initializeStripe";
import {
  collection,
  getFirestore,
  setDoc,
  onSnapshot,
  doc,
  getDoc,
  addDoc,
} from "firebase/firestore";

export default async function createCheckoutSession(uid) {
  const db = getFirestore(app);

  // const checkoutSesh = await addDoc(
  //   doc(db, "users", `user-${uid}`, "checkout_sessions", "active"),
  //   {
  //     price: "price_1NHt89CwphplMhaR6UzbRKqT",
  //     success_url: window.location.origin + "/dashboard",
  //     cancel_url: window.location.origin + "/",
  //   }
  // );
  const checkoutSessionRef = doc(
    db,
    "users",
    `user-${uid}`,
    "checkout_sessions",
    "active"
  );

  const checkoutSessionData = {
    price: "price_1GqIC8HYgolSBA35zoTTN2Zl",
    success_url: window.location.origin,
    cancel_url: window.location.origin,
    sessionId: "123", // Placeholder for the sessionId that will be added later
  };

  setDoc(
    checkoutSessionRef,
    checkoutSessionData
  );

  // Wait for the CheckoutSession to get attached by the extension
  onSnapshot(checkoutSessionRef, async (snap) => {
    try {
      console.log(snap);
      console.log(snap.data());
      const { sessionId } = snap.data();
      console.log(sessionId==true)
      if (sessionId) {
        // We have a session, let's redirect to Checkout
        // Init Stripe
        const stripe = await getStripe();
        console.log(stripe);
        stripe.redirectToCheckout({ sessionId });
      }
    } catch (err) {
      console.log(err);
    }
  });
}
