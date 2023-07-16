import app from "../firebase/clientApp";
import { getAuth } from "firebase/auth";

export default async function isUserCreator() {
  const auth = getAuth(app);
  let decodedToken;
  try {
    decodedToken = await auth.currentUser.getIdTokenResult();
  } catch (err) {
    return false;
  }

  return decodedToken.claims.stripeRole ? true : false;
}