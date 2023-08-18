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
  sendSignInLinkToEmail,
  updateProfile,
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
import logo from "../styles/images/logo.png";
import { useRouter } from "next/router";

export default function Register() {
  const [userData, setUserData] = useState({});

  let auth = getAuth(app);
  // signInWithRedirect(auth, provider)
  onAuthStateChanged(auth, (user) => {
    if (user) {
      let name = document.getElementById("name").value;
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // user.updateProfile({
      //   displayName: name,
      // })
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
    regData = JSON.parse(JSON.stringify(regData));
    const isUserRegistered = await getDocs(col).then((snapshot) => {
      let isRegistered = false;
      snapshot.forEach((doc) => {
        if (doc.id === "user-" + regData["uid"]) {
          isRegistered = true;
        }
      });
      return isRegistered;
    });
    if (isUserRegistered) {
      await updateDoc(doc(col, "user-" + regData["uid"]), regData);
    } else {
      await setDoc(doc(col, "user-" + regData["uid"]), regData);
    }
  }

  function signInWithGH() {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
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
    signInWithPopup(auth, provider).then((result) => {
      const credential = TwitterAuthProvider.credentialFromResult(result);
      if (credential) {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
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
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          // This gives you a GitHub Access Token. You can use it to access the GitHub API.
          const token = credential.accessToken;
          // ...
        }
        // The signed-in user info.
        const user = result.user;
      })
      .catch((err) => {
        return;
      });
  }

  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: "https://www.inkmorphism.com/verify-email",
    // This must be true.
    handleCodeInApp: true,
    iOS: {
      bundleId: "com.inkmorphism.ios",
    },
    android: {
      packageName: "com.inkmorphism.android",
      installApp: true,
      minimumVersion: "12",
    },
    dynamicLinkDomain: "inkmorphism.page.link",
  };

  function registerWithEmail() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    // let name = document.getElementById("name").value;
    // auth.currentUser.displayName = name;
    if (password.length < 6) {
      alert("Your password must be at least 6 symbols long");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
          sendSignInLinkToEmail(auth, email, actionCodeSettings)
            .then(() => {
              // The link was successfully sent. Inform the user.
              // Save the email locally so you don't need to ask the user for it again
              // if they open the link on the same device.
              window.localStorage.setItem("emailForSignIn", email);
              // ...
            })
            .catch((error) => {
              console.log(error);
              // ...
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // signInWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     console.log(userCredential)
    //     // Signed in
    //     const user = userCredential.user;
    //     console.log(user)
    //     // ...
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  console.log(auth);

  let router = useRouter();
  function redirect() {
    setTimeout(() => {
      router.push("/dashboard");
    }, 500);
  }
  return (
    <>
      <Head>
        <title>Register | Inkmorphism - the AI Website Builder</title>
        <meta name="description" content="" />
        <link rel="icon" href="/faviconWh.ico" />
      </Head>
      <div className="register">
        <p>{auth.currentUser == null ? "" : redirect()}</p>
        <a href=".." className="noSelect">
          <img src={logo.src} />
        </a>{" "}
        <div id="registerWrapper">
          <div id="form">
            <label htmlFor="email">Email address:</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="me@gmail.com"
            />
            <label htmlFor="name">Full name:</label>
            <input
              id="name"
              type="name"
              name="name"
              placeholder="Jon Snow..."
            />
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
            />
            <button onClick={registerWithEmail}>Register</button>
          </div>
          <div id="orSection">
            <div></div>
            <p>OR</p>
            <div></div>
          </div>
          <div id="buttons">
            <button onClick={signInWithG} className="noSelect">
              <div></div>
              <p>Sign up with Google</p> <SiGoogle />{" "}
            </button>
            <button onClick={signInWithGH} className="noSelect">
              <div></div>
              <p>Sign up with GitHub</p> <SiGithub />
            </button>
            <button onClick={signInWithTW} className="noSelect">
              <div></div>
              <p>Sign up with Twitter</p> <SiTwitter />
            </button>
          </div>
        </div>
        <div id="registerDisclaimer">
          <p>
            Do you have an account? <a href="../login">Log in</a>
          </p>
        </div>
      </div>
    </>
  );
}
