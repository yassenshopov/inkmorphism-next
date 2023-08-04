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
  const checkoutSessionRef = collection(
    db,
    "users",
    `${uid}`,
    "checkout_sessions"
  );

  const checkoutSessionData = {
    price: "price_1NHt89CwphplMhaR6UzbRKqT",
    success_url: window.location.origin,
    cancel_url: window.location.origin,
  };

  const newCheckoutSessionRef = await addDoc(
    checkoutSessionRef,
    checkoutSessionData
  );

  // Wait for the CheckoutSession to get attached by the extension
  onSnapshot(newCheckoutSessionRef, async (snap) => {
    console.log(snap)
    try {
      if (snap.exists()) {
        console.log(snap)
        console.log(snap.data())
        const sessionData = snap.data();
        let sessionId = sessionData.sessionId;
        if (sessionData && sessionData.sessionId) {
          // We have a session, let's redirect to Checkout
          // Init Stripe
          const stripe = await getStripe();
          console.log(stripe)
          stripe.redirectToCheckout({sessionId: sessionId});
        }
      }
    } catch (err) {
      console.log(err);
    }
  });
}
