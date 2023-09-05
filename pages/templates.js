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
import Loader from "./components/loader.js";
import MainNav from "./components/MainNav.js";
import MainFooter from "./components/MainFooter.js";

let domainSlug;
let newSite;
let col;
let slug;

export default function Templates() {
  let profile_pic = "";

  const [loadBool, setLoadBool] = useState(false);
  const [isUser, setIsUser] = useState(false);

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
      setIsUser(true);
    } catch (err) {
      uid = "_";
    }
    const storage = getStorage();
    const storageRef = ref(storage, uid + "/profilePic.png");
    getDownloadURL(storageRef)
      .then((metadata) => {
        setUserData({
          photoURL: metadata,
        });
        try {
          // profile_pic = auth.currentUser.photoURL;
          setUserData({
            profile_pic: metadata,
            // profile_pic: auth.currentUser.photoURL,
            displayName: auth.currentUser.displayName,
          });
        } catch (err) {}
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        try {
          // profile_pic = auth.currentUser.photoURL;
          setUserData({
            profile_pic: auth.currentUser.photoURL,
            // profile_pic: auth.currentUser.photoURL,
            displayName: auth.currentUser.displayName,
          });
        } catch (err) {}
      });
  }

  try {
    profile_pic = auth.currentUser.photoURL;
  } catch (err) {
    profile_pic = userData.profile_pic;
  }

  const [defaultLogo, setDefaultLogo] = useState("");
  const [defaultThumbnail, setDefaultThumbnail] = useState("");
  const [styleVar, setStyleVar] = useState("");

  async function randomSiteGen(style) {
    setLoadBool((prevState) => !prevState);
    setStyleVar(style);
    let user;
    let db = getFirestore(app);
    const auth = getAuth(app);
    let uid;
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
    slug = "";
    for (let word in words) {
      slug = slug + words[word] + "-";
    }
    slug = slug + Math.ceil(100 + Math.random() * 899);
    domainSlug = slug;
    slug = slug + ".inkmorphism.com";

    const storage = getStorage();
    let logoRef = ref(storage, user + "/" + domainSlug + "/logo.png");
    let thumbnailRef = ref(storage, user + "/" + domainSlug + "/thumbnail.png");
    let metadata = { contentType: "image/png" };

    let url = "./newSiteLogo.png";
    let url2 = "./newSiteThumbnail.png";
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const fileObject = new File([blob], "logo.png", {
          type: "image/png",
        });
        uploadBytes(logoRef, fileObject, metadata).then(() => {
          getDownloadURL(logoRef).then((url) => {
            setDefaultLogo(url);
          });
        });
      })
      .then(() => {
        fetch(url2)
          .then((response) => response.blob())
          .then((blob) => {
            const fileObject2 = new File([blob], "thumbnail.png", {
              type: "image/png",
            });
            uploadBytes(thumbnailRef, fileObject2, metadata).then(() => {
              getDownloadURL(thumbnailRef).then((url) => {
                setDefaultThumbnail(url);
                // setLoadBool(prevState => !prevState)
              });
            });
          });
      });
  }

  useEffect(() => {
    if (defaultThumbnail !== "" && defaultLogo !== "") {
      newSite = {
        published: false,
        deleted: false,
        domain: slug,
        domainSlug: domainSlug,
        initDate: "",
        name: "Fuzzy Beats",
        style: styleVar.slice(0, 1).toUpperCase() + styleVar.slice(1),
        thumbnail: defaultThumbnail,
        pageType: "SPA",
        webContent: {
          meta: {
            colorPalette: {
              color1: "#ffffff",
              color2: "#ffffeb",
              color3: "#79e16b",
              colorLight: "#fefefe",
              colorDark: "#121212",
            },
            metaFavicon: defaultLogo,
            metaStyle: styleVar.toLowerCase(),
            metaTitle: "Fuzzy Beats",
            metaDescription: "The description for your website",
            metaThumbnail: defaultThumbnail,
            metaAuthor: "Meta Author",
          },
          pages: {
            main: {
              structure: [
                {
                  type: "nav",
                  options: {},
                  content: {
                    logo: defaultLogo,
                  },
                },
                {
                  type: "imgAndTxt",
                  content: {
                    img: "https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fminerals-locate-276%2FsrcFiles%2FimgPlaceholder.png?alt=media&token=f3dbf650-3ac2-4644-9047-a207ab6f80f9",
                    txt: "Get ready to hop along with Fuzzy Beats at their high-energy bunny bash!",
                  },
                  options: {
                    direction: "directHorizontal",
                  },
                },
                {
                  type: "footer",
                  options: {},
                  content: {
                    txt: "Copyright by Fuzzy Beats ©",
                  },
                },
              ],
            },
          },
        },
      };
      setDoc(doc(col, domainSlug), newSite);
      let urlRedirect = "../../config/" + domainSlug;
      window.location.href = urlRedirect;
    }
  }, [defaultThumbnail]);

  const templatesArr = ["industrial", "simple", "glassmorphism", "minimalism", "neobrutalism", "web3"];
  const templates = templatesArr.map((template, index) => (
    <article key={index}>
      <div className="imgWrapper">
        <img src={"main/" + template + "Thumbnail.png"} />
        <div id="hiddenBtns">
        <a
          className="noSelect"
          onClick={() => {
            if (isUser) {
              randomSiteGen(template);
            } else {
              window.location.href = "/login";
            }
          }}
        >
          Get Started with <em>{template}</em> →
        </a>
        <a href={"templates/" + template} className="noSelect">
          Preview Template
        </a>
      </div>
      </div>
      <h2>{template.slice(0, 1).toUpperCase() + template.slice(1)}</h2>
    </article>
  ));

  return (
    <div className="Templates">
      <Head>
        <link rel="icon" href="/faviconWh.ico" />
        <title>Inkmorphism - Templates for your websites!</title>
      </Head>

      {loadBool ? <Loader /> : ""}

      <button id="fetch" onClick={getData}></button>

      {/* <Dashnav profile_pic={userData.profile_pic} auth={auth} /> */}
      < MainNav />
      <main id="templatesWrapper">
        <section>
          <h1>Templates</h1>
        </section>
        <section id="templates">
          {templates}
          {/* <article>
            <img src="templates/simpleTemplate.png" />
            <h2>Simple</h2>
            <div id="hiddenBtns">
              <a
                onClick={() => {
                  randomSiteGen("Skeletal");
                }}
              >
                Get Started with Simple →
              </a>
              <a href="templates/simple">Preview Template</a>
            </div>
          </article> */}
          {/* <article>
            <img src="templates/neobrutalismTemplate2.png" />
            <h2>Neobrutalism</h2>
            <div id="hiddenBtns">
              <a
                onClick={() => {
                  randomSiteGen("Neobrutalism");
                }}
              >
                Get Started with Neobrutalism →
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
                Get Started with glassmorphism →
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
                Get Started with Web3 →
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
                Get Started with Futurism →
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
                Get Started with Minimalism →
              </a>
              <a href="templates/minimalism">Preview Template</a>
            </div>
          </article>
          <article>
            <h2>Isometrism</h2>
          </article>
          <article>
            <h2>Fantasm</h2>
          </article> */}
        </section>
      </main>
      < MainFooter />
    </div>
  );
}
