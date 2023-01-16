import {
  GithubAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  TwitterAuthProvider,
  onAuthStateChanged,
  GoogleAuthProvider,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { useEffect, useState, useCallback, useContext } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore/lite";
import app from "../firebase/clientApp";7
import Head from 'next/head'
import { SiGoogle, SiGithub, SiTwitter } from 'react-icons/si'

export default function Login() {

  const [userData, setUserData] = useState({});

  const auth = getAuth(app);
  // signInWithRedirect(auth, provider)
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log(user);
      setUserData(user);
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
      } else {
        console.log("Weird error")
      }
      // The signed-in user info.
      const user = result.user;
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
    });
  }

  function signInWithEmail() {
    let email = document.getElementById("email")
    let password = document.getElementById("password")
    console.log(password)
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      console.log(error)
    });
  }


    function getTimeFromDate(timestamp) {
        const pad = num => ("0" + num).slice(-2); // or use padStart
        const date = new Date(parseInt(timestamp));
        let hours = date.getHours(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds(),
            month = date.getMonth(),
            day = date.getDate(), 
            year = date.getFullYear();
        return (day) + "/" + (month+1) + "/" + year+ " " + pad(hours) + ":" + pad(minutes) + ":" + pad(seconds)
    }

    let timeCreated;
    try {
        timeCreated = getTimeFromDate(userData.metadata.createdAt);
    } catch {
        timeCreated = "---"
    }

  return (
    <>
    <Head>
      <title>Log in | Inkmorphism - the AI Website Builder</title>
      <meta name="description" content="" />
    </Head>
    <div className="login">
      <h2>Login:</h2>
      <form>
        <label for="email">Email address:</label>
        <input id="email" type="email" name="email" placeholder="me@gmail.com"/>
        <label for="password">Password:</label>
        <input id="pasword" type="password" name="password" placeholder="Enter your password"/>
        <button onClick={signInWithEmail}>Log in</button>
      </form>
      <div id="orSection">
        <div></div>
        <p>OR</p>
        <div></div>
      </div>
      <div id="buttons">
        <button onClick={signInWithG}><div></div>Sign in with Google < SiGoogle /> </button>
        <button onClick={signInWithGH}><div></div>Sign in with GitHub < SiGithub /></button>
        <button onClick={signInWithTW}><div></div>Sign in with Twitter < SiTwitter /></button>
      </div>
      {/* <div>
        <img src={userData.photoURL} alt="Profile Pic" />
        <p>Name: {userData.displayName}</p>
        <p>Email: {userData.email}</p>
        <p>Created at: {timeCreated}</p>
      </div> */}
    </div>
    </>
  );
}
