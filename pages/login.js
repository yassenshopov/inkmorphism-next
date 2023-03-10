import {
  GithubAuthProvider,
  getAuth,
  signInWithPopup,
  TwitterAuthProvider,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
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
import Loader from './components/loader.js'

export default function Login() {
  const [userData, setUserData] = useState({});
  const [loadBool, setLoadBool] = useState(false);

  const auth = getAuth(app);
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
    await setDoc(doc(col, "user-"+ regData["uid"]), regData);
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
    setLoadBool(true)
    signInWithPopup(auth, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential) {
        const token = credential.accessToken;
      }
      const user = result.user;
    }).catch((err) => {
      setLoadBool(false)
    })
  }

  function signInWithEmail() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
      {loadBool ? <Loader /> : ""}
      <div className="login">
        <p>{(auth.currentUser == null) ? "" : redirect()}</p>
        <img src={logo.src}/>
        {/* <h2>Login:</h2> */}
        <div id="loginWrapper">
          <div id="form">
            <label htmlFor="email">Email address:</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="me@gmail.com"
              autoComplete="username"
            />
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              autoComplete="current-password"
            />
            <button onClick={signInWithEmail}>Log in</button>
          </div>
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
        <div id="loginDisclaimer">
          <p>Don't have an account? <a href="../register">Register</a></p>
        </div>
      </div>
    </>
  );
}
