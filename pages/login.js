import {
  GithubAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  TwitterAuthProvider,
  onAuthStateChanged,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useState, useCallback, useContext } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore/lite";
import app from "../firebase/clientApp";
import Head from "next/head";
import { SiGoogle, SiGithub, SiTwitter } from "react-icons/si";
import logo from '../styles/images/logo.png';
import { useRouter } from "next/router";

export default function Login() {
  const [userData, setUserData] = useState({});

  const auth = getAuth(app);
  console.log(auth.currentUser)
  // signInWithRedirect(auth, provider)
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
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
    signInWithPopup(auth, provider).then((result) => {
      const credential = GithubAuthProvider.credentialFromResult(result);
      if (credential) {
        const token = credential.accessToken;
        // ...
      }
      // The signed-in user info.
      const user = result.user;
    });
  }

  function signInWithTW() {
    const provider = new TwitterAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      const credential = TwitterAuthProvider.credentialFromResult(result);
      if (credential) {
        const token = credential.accessToken;
        // ...
      } else {
        console.log("Weird error");
      }
      // The signed-in user info.
      const user = result.user;
    });
  }

  function signInWithG() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
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
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    console.log(password);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential)
        // Signed in
        const user = userCredential.user;
        console.log(user)
        // ...
      })
      .catch((error) => {
        console.log(error);
      });
  }

  console.log(auth)

  let router = useRouter();
  function redirect() {
    setTimeout(() => {
      router.push('/dashboard')
    }, 500)
  }
  return (
    <>
      <Head>
        <title>Log in | Inkmorphism - the AI Website Builder</title>
        <meta name="description" content="" />
        <link rel="icon" href="/faviconWh.ico" />
      </Head>
      <div className="login">
        {/* <p>{(auth.currentUser == null) ? "You are not logged in" : redirect()}</p> */}
        <img src={logo.src}/>
        {/* <h2>Login:</h2> */}
        <div id="loginWrapper">
          <form>
            <label htmlFor="email">Email address:</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="me@gmail.com"
              autoComplete="username"
              disabled
            />
            <label htmlFor="password">Password:</label>
            <input
              id="pasword"
              type="password"
              name="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              disabled
            />
            <button onClick={signInWithEmail} disabled>Log in</button>
          </form>
          <div id="orSection">
            <div></div>
            <p>OR</p>
            <div></div>
          </div>
          <div id="buttons">
            <button onClick={signInWithG} className="noSelect">
              <div></div>
              <p>Log in with Google</p> <SiGoogle />{" "}
            </button>
            <button onClick={signInWithGH} className="noSelect">
              <div></div>
              <p>Log in with GitHub</p> <SiGithub />
            </button>
            <button onClick={signInWithTW} className="noSelect">
              <div></div>
              <p>Log in with Twitter</p> <SiTwitter />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
