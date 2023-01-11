import {
  GithubAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  TwitterAuthProvider,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { useEffect, useState, useCallback, useContext } from "react";
import { resolve } from "styled-jsx/css";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore/lite";
import app from "../firebase/clientApp";

export default function Login() {
  const [profilePic, setProfilePic] = useState("");

  const auth = getAuth(app);
  // signInWithRedirect(auth, provider)
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log(user);
      setProfilePic(user.photoURL);
      sendRegisterData(user);
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  let db = getFirestore(app);
  const col = collection(db, "users");

  async function sendRegisterData(regData) {
    regData = JSON.parse(JSON.stringify(regData));
    await setDoc(doc(col, regData["uid"]), regData);
  }

  function signInWithGH() {
    const provider = new GithubAuthProvider();
    signInWithRedirect(auth, provider).then((result) => {
      const credential = GithubAuthProvider.credentialFromResult(result);
      if (credential) {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const token = credential.accessToken;
        // ...
      }
      // The signed-in user info.
      const user = result.user;
      console.log(result);
    });
  }

  function signInWithTW() {
    const provider = new TwitterAuthProvider();
    signInWithRedirect(auth, provider).then((result) => {
      const credential = TwitterAuthProvider.credentialFromResult(result);
      if (credential) {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const token = credential.accessToken;
        // ...
      }
      // The signed-in user info.
      const user = result.user;
      console.log(result);
    });
  }

  function signInWithG() {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential) {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const token = credential.accessToken;
        // ...
      }
      // The signed-in user info.
      const user = result.user;
      console.log(result);
    });
  }

  return (
    <>
      <h2>Login:</h2>
      <button onClick={signInWithGH}>Sign in w/ GitHub</button>
      <button onClick={signInWithTW}>Sign in w/ Twitter</button>
      <button onClick={signInWithG}>Sign in w/ Google</button>
      <img src={profilePic} alt="Profile Pic" />
    </>
  );
}
