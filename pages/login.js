import {
  GithubAuthProvider,
  getAuth,
  signInWithPopup,
  TwitterAuthProvider,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithRedirect,
} from "firebase/auth";
import { useEffect, useState, useCallback, useContext } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore/lite";
import app from "../firebase/clientApp";
import Head from "next/head";
import { SiGoogle, SiGithub, SiTwitter } from "react-icons/si";
import logo from "../styles/images/logoWh.webp";
import { useRouter } from "next/router";
import Loader from "./components/loader.js";
import {
  getDownloadURL,
  ref,
  uploadString,
  getStorage,
  getMetadata,
  getBytes,
} from "firebase/storage";

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
      setLoadBool(true);
      redirect();
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  let db = getFirestore(app);
  const col = collection(db, "users");

  //storage
  const storage = getStorage();

  async function sendRegisterData(regData) {
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

  function getProviderForSignInMethods(methods) {
    let provider;
    if (methods.includes(GoogleAuthProvider.PROVIDER_ID)) {
      provider = new GoogleAuthProvider();
      console.log(provider);
    } else if (methods.includes(FacebookAuthProvider.PROVIDER_ID)) {
      provider = new FacebookAuthProvider();
      console.log(provider);
    } else if (methods.includes(TwitterAuthProvider.PROVIDER_ID)) {
      provider = new TwitterAuthProvider();
      console.log(provider);
    }
    // Add more providers if needed.
    return provider;
  }

  function signInWithGH() {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        const credential = GithubAuthProvider.credentialFromResult(result);
        if (credential) {
          const token = credential.accessToken;
          // ...
        }
        // The signed-in user info.
        const user = result.user;
      })
      .catch((err) => {
        console.dir(err);
        if (err.code === "auth/account-exists-with-different-credential") {
          const email = err.customData.email;
          console.log(err);
          fetchSignInMethodsForEmail(auth, email).then((methods) => {
            console.log(methods);
            const provider = getProviderForSignInMethods(methods);
            // const credential = provider.credentialFromResult(result);
            setLoadBool(true);
            signInWithRedirect(auth, provider)
              .then((result) => {
                console.log(result);
                // The signed-in user info.
                const credential = provider.credentialFromResult(result);
                if (credential) {
                  const token = credential.accessToken;
                }
                const user = result.user;
                setLoadBool(false);
              })
              .catch((err) => {
                console.log(err);
              });
          });
        }
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
    setLoadBool(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          const token = credential.accessToken;
        }
        const user = result.user;
      })
      .catch((err) => {
        setLoadBool(false);
      });
  }

  function signInWithEmail() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    if (password.length < 6 || password.length > 50) {
      alert("Password should be between 6 and 50 characters long.");
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          console.log(error);
          if (
            error.code === "auth/invalid-email" ||
            error.code === "auth/missing-email"
          ) {
            setInvalidEmail(true);
          } else if (
            error.code === "auth/wrong-password" ||
            error.code === "auth/missing-password" ||
            error.code === "auth/user-not-found"
          ) {
            setInvalidPassword(true);
          } else if (error.code === "auth/user-not-found") {
            setInvalidEmail(true);
          } else if (error.code === "auth/too-many-requests") {
            alert("Too many requests. Please try again later.");
          }
          // setInvalidEmail(true);
          // setInvalidPassword(true);
        });
    }
  }

  function registerWithEmail() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    // let name = document.getElementById("name").value;
    // auth.currentUser.displayName = name;
    if (password.length < 6 || password.length > 50) {
      alert("Password should be between 6 and 50 characters long.");
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
              if (
                error.code === "auth/invalid-email" ||
                error.code === "auth/missing-email"
              ) {
                setInvalidEmail(true);
              } else if (
                error.code === "auth/wrong-password" ||
                error.code === "auth/missing-password" ||
                error.code === "auth/user-not-found"
              ) {
                setInvalidPassword(true);
              } else if (error.code === "auth/user-not-found") {
                setInvalidEmail(true);
              } else if (error.code === "auth/too-many-requests") {
                alert("Too many requests. Please try again later.");
              }
              // ...
            });
        })
        .catch((error) => {
          console.log(error);
          if (
            error.code === "auth/invalid-email" ||
            error.code === "auth/missing-email"
          ) {
            setInvalidEmail(true);
          } else if (
            error.code === "auth/wrong-password" ||
            error.code === "auth/missing-password" ||
            error.code === "auth/user-not-found"
          ) {
            setInvalidPassword(true);
          } else if (error.code === "auth/user-not-found") {
            setInvalidEmail(true);
          } else if (error.code === "auth/too-many-requests") {
            alert("Too many requests. Please try again later.");
          }
        });
    }
  }

  let router = useRouter();
  function redirect() {
    setTimeout(() => {
      router.push("/dashboard");
    }, 500);
  }

  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [emptyEmail, setEmptyEmail] = useState(true);
  const [emptyPassword, setEmptyPassword] = useState(true);

  const [loadingAnimation, setLoadingAnimation] = useState(false);

  useEffect(() => {
    setLoadingAnimation((prev) => !prev);
    setTimeout(() => {
      setLoadingAnimation((prev) => !prev);
    }, 1400);
  }, [isRegisterMode]);

  const handleFormSubmit = (event) => {
    if (event.key === "Enter") {
      if (isRegisterMode) {
        registerWithEmail();
      } else {
        signInWithEmail();
      }
    }
  };

  return (
    <>
      <Head>
        <title>Log in | Inkmorphism - the AI Website Builder</title>
        <meta name="description" content="" />
        <link rel="icon" href="/faviconWh.ico" />
      </Head>
      {loadBool ? <Loader /> : ""}
      <div className={"login"}>
        {/* <h2>Login:</h2> */}
        <div id="loginWrapper" className={isRegisterMode ? "registerMode" : ""}>
          <div id="img">
            <img
              src={isRegisterMode ? "/tea2.png" : "/tea1.png"}
              className={loadingAnimation ? "loading" : ""}
              draggable="false"
            />
          </div>
          <div id="form">
            <a href=".." className="noSelect logo">
              <img src={logo.src} />
            </a>
            <h2>Welcome to Inkmorphism</h2>
            <label htmlFor="email">Email address:</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="me@gmail.com"
              autoComplete="username"
              className={invalidEmail ? "invalid" : ""}
              onFocus={() => {
                setInvalidEmail(false);
              }}
              onChange={(e) => {
                if (e.target.value === "") {
                  setEmptyEmail(true);
                } else {
                  setEmptyEmail(false);
                }
              }}
            />
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              className={invalidPassword ? "invalid" : ""}
              onFocus={() => {
                setInvalidPassword(false);
              }}
              onChange={(e) => {
                if (e.target.value === "") {
                  setEmptyPassword(true);
                } else {
                  setEmptyPassword(false);
                }
              }}
              onKeyPress={handleFormSubmit}
            />
            <p
              className={
                invalidEmail || invalidPassword
                  ? "invalidEmail"
                  : "invalidEmail invisible"
              }
            >
              Invalid email or password
            </p>
            <button
              onClick={isRegisterMode ? registerWithEmail : signInWithEmail}
              className="noSelect ctaBtn"
              // disabled={invalidEmail || emptyEmail || emptyPassword}
            >
              {isRegisterMode ? "Register" : "Sign in"}
            </button>
            <div id="orSection">
              <div></div>
              <p>or</p>
              <div></div>
            </div>
            <div id="buttons">
              <button onClick={signInWithG} className="noSelect">
                <SiGoogle />
              </button>
              <button onClick={signInWithTW} className="noSelect">
                <SiTwitter />
              </button>
              <button onClick={signInWithGH} className="noSelect">
                <SiGithub />
              </button>
            </div>
            <div id="disclaimer">
              <p>
                {isRegisterMode
                  ? "Already have an account? "
                  : "Don't have an account? "}
                <span
                  onClick={() => {
                    setIsRegisterMode(!isRegisterMode);
                  }}
                >
                  {isRegisterMode ? "Sign in" : "Register with us"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
