import Head from "next/head";
import Link from "next/link";
import Dashnav from "./components/dashnav.js";
import Dashfooter from "./components/dashfooter.js";
import { randomWords } from "random-words";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
import app from "../firebase/clientApp";
import { useState, useEffect } from "react";
import placeholder from "../styles/images/placeholder.png";
import defaultProfilePic from "../styles/images/defaultProfilePic.png";
import defaultLogo from "../styles/images/logoPlace.png";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export default function Templates() {
  let profile_pic = "";

  useEffect(() => {
    const el = document.getElementById("fetch");
    setTimeout(() => {
      el.click();
    }, 1500);
  }, []);

  const auth = getAuth(app);

  const [userData, setUserData] = useState({
    profile_pic: defaultProfilePic.src,
    displayName: "Default",
  });

  console.log(userData);

  async function getData() {
    let db = getFirestore(app);
    const auth = getAuth(app);
    let uid;
    try {
      uid = "user-" + auth.currentUser.uid;
    } catch (err) {
      uid = "_";
    }

    try {
      // profile_pic = auth.currentUser.photoURL;
      console.log(auth);
      setUserData({
        profile_pic: auth.currentUser.photoURL,
        displayName: auth.currentUser.displayName,
      });
      console.log(userData);
    } catch (err) {
      console.log(err);
    }
  }

  try {
    profile_pic = auth.currentUser.photoURL;
  } catch (err) {
    profile_pic = userData.profile_pic;
  }

  const [file, setFile] = useState(null)

  async function randomSiteGen(style) {
    let user;
    let db = getFirestore(app);
    const auth = getAuth(app);
    let uid;
    let col;
    try {
      uid = auth.currentUser.uid;
      user = "user-" + uid;
      col = collection(db, "users", user, "websites");
    } catch (error) {
      console.log(error);
      uid = "_";
    }
    let randomWords = require("random-words");
    let words = randomWords(2);
    let slug = "";
    for (let word in words) {
      slug = slug + words[word] + "-";
    }
    slug = slug + Math.ceil(100 + Math.random() * 899);
    let domainSlug = slug;
    slug = slug + ".inkmorphism.com";
    console.log(slug);
    let newSite = {
      deleted: false,
      domain: slug,
      domainSlug: domainSlug,
      initDate: "",
      name: "New Site v4",
      style: style,
      thumbnail:
        "https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-default%2Fwebsite-default%2Fthumbnail.png?alt=media&token=7ac92b40-dd97-42be-91e2-87aa677ebae1",
      webContent: {
        meta: {
          colorPalette: {
            color1: "#e6970f",
            color2: "#d9d8af",
            color3: "#79e16b",
            colorLight: "#fefefe",
            colorDark: "#121212",
          },
          metaFavicon:
            "https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-default%2Fwebsite-default%2Flogo.png?alt=media&token=ba50553d-4f67-4d24-b909-e98e6585dad9",
          metaStyle: style.toLowerCase(),
          metaTitle: "Your Website",
          metaDescription: "The description for your website",
          metaThumbnail:
            "https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-default%2Fwebsite-default%2Fthumbnail.png?alt=media&token=bf24a392-9096-4d28-a9b0-f9d7941f8e85",
          metaAuthor: "Meta Author",
        },
        pages: {
          main: {
            structure: [1, 2, 3]
          }
        } 
      },
    };
    await setDoc(doc(col, domainSlug), newSite);

    const storage = getStorage();
    let logoRef = ref(storage, user + "/" + domainSlug + "/logo.png");
    let metadata = { contentType: "image/png" };
    const logoUrl = newSite["webContent"]["meta"]["metaFavicon"];
    // const fileName = 'logo.png'

    // let file;
    let url = "./newSiteLogo.png"
    fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      console.log(blob)
      const fileObject = new File([blob], "logo.png", {
        type:"image/png",
      });
      console.log(fileObject)
      setFile(fileObject);
          // access file here
      uploadBytes(logoRef, file, metadata).then((snapshot) => {
        // window.location.reload(false)
        
        let urlRedirect = "../../config/" + domainSlug;
        window.location.href = urlRedirect
      });
    });
  }

  return (
    <div className={"Templates"}>
      <Head>
        {/* <link rel="icon" href={defaultFiles['logo']} /> */}
        <link rel="icon" href="/faviconWh.ico" />
        <title>Inkmorphism - Templates for your websites!</title>
      </Head>

      <button id="fetch" onClick={getData}></button>

      <Dashnav profile_pic={profile_pic} auth={auth} />
      <main id="templatesWrapper">
        <section id="templates">
          <article>
            <img src="templates/neobrutalismTemplate2.png" />
            <h2>Neobrutalism</h2>
            <div id="hiddenBtns">
              <a
                onClick={() => {
                  randomSiteGen("Neobrutalism");
                }}
              >
                Get Started with Neobrutalism ???
              </a>
              <a href="templates/neobrutalism">Preview Template</a>
            </div>
          </article>
          <article>
            <img src="templates/glassmorphismTemplate.png" />
            <h2>Glassmorphism</h2>
            <div id="hiddenBtns">
              <a
                onClick={() => {
                  randomSiteGen("Glassmorphism");
                }}
              >
                Get Started with glassmorphism ???
              </a>
              <a href="templates/glassmorphism">Preview Template</a>
            </div>
          </article>
          <article>
            <img src="templates/web3Template.png" />
            <h2>Web3</h2>
            <div id="hiddenBtns">
              <a
                onClick={() => {
                  randomSiteGen("Web3");
                }}
              >
                Get Started with Web3 ???
              </a>
              <a href="templates/web3">Preview Template</a>
            </div>
          </article>
          <article>
            <img src="templates/futurismTemplate.png" />
            <h2>Futurism</h2>
            <div id="hiddenBtns">
              <a
                onClick={() => {
                  randomSiteGen("Futurism");
                }}
              >
                Get Started with Futurism ???
              </a>
              <a href="templates/futurism">Preview Template</a>
            </div>
          </article>
          <article>
            <img src="templates/minimalismTemplate.png" />
            <h2>Minimalism</h2>
            <div id="hiddenBtns">
              <a
                onClick={() => {
                  randomSiteGen("Minimalism");
                }}
              >
                Get Started with Minimalism ???
              </a>
              <a href="templates/minimalism">Preview Template</a>
            </div>
          </article>
          <article>
            <h2>Isometrism</h2>
          </article>
          <article>
            <h2>Fantasm</h2>
          </article>
        </section>
      </main>
      <Dashfooter />
    </div>
  );
}
