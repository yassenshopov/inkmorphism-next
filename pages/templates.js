import Head from "next/head";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
import app from "../firebase/clientApp";
import { useState, useEffect } from "react";
import defaultProfilePic from "../styles/images/defaultProfilePic.png";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Loader from "./components/loader.js";
import MainNav from "./components/MainNav.js";
import MainFooter from "./components/MainFooter.js";

let domainSlug;
let newSite;
let col;
let slug;

export default function Templates() {
  // Meta data:
  let title = "Inkmorphism - Templates for every website need";
  let img = "https://inkmorphism.com/pricing/og.webp";
  let description =
    "Explore Inkmorphism's AI-powered website templates – Effortlessly create stunning sites with our innovative design solutions. Get started today!";
  let author = "Yassen Shopov";

  let profile_pic = "";

  const [loadBool, setLoadBool] = useState(false);
  const [isUser, setIsUser] = useState(false);

  const [recommendedTemplates, setRecommendedTemplates] = useState([]);

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
  let db = getFirestore(app);

  async function getData() {
    const auth = getAuth(app);
    let uid;
    try {
      uid = "user-" + auth.currentUser.uid;
      setIsUser(true);
    } catch (err) {
      uid = "_";
    }
    //check if user has filled out the survey
    try {
      const userSurveyData = doc(db, "users", uid, "surveyData", "data");
      const userSurveyDataDoc = await getDoc(userSurveyData)
        .then((doc) => {
          if (!doc.exists()) {
            setSurveyNotFilled(true);
          }
        })
      // if (!userSurveyDataDoc.exists()) {
      // setTimeout(() => {
      // setSurveyNotFilled(true);
      // throw new Error("User hasn't filled out the survey yet");
      // } , 1000);
      // }
      try {
        const userSurveyResults = await getDoc(
          doc(db, "users", uid, "surveyData", "results")
        );
        setRecommendedTemplates(userSurveyResults.data().recommendedTemplates);
      } catch (err) {
        setRecommendedTemplates([]);
      }
      // setSurveyNotFilled(false);
    } catch (err) {
      console.log(err);
      setSurveyNotFilled(true);
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

  useEffect(() => {
    //check if a template from templatesArr is in the recommendedTemplates array
    //if it is,
  }, [recommendedTemplates]);

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

  const templatesArr = [
    "industrial",
    "simple",
    "glassmorphism",
    "minimalism",
    "neobrutalism",
    "web3",
  ];
  const templates = templatesArr.map((template, index) => (
    <article
      key={index}
      className={recommendedTemplates.includes(template) ? "recommended" : ""}
    >
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
      <h2>
        {template.slice(0, 1).toUpperCase() +
          template.slice(1) +
          `${
            recommendedTemplates.includes(template)
              ? " (Recommended for you)"
              : ""
          }`}
      </h2>
    </article>
  ));

  const [showInput, setShowInput] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    // Check if the selected option should show the input field
    setShowInput(selectedOption === "other");
    setSelectedOption(selectedOption);
    if (selectedOption !== "default") {
      setCanProceed(true);
    } else {
      setCanProceed(false);
    }
  };

  const [canProceed, setCanProceed] = useState(false);
  const [surveyQuestionIndex, setSurveyQuestionIndex] = useState(0);
  const [surveyNotFilled, setSurveyNotFilled] = useState(false);
  const [surveyData, setSurveyData] = useState({});

  const questionArr = [
    {
      question: "What is the name for your website?",
      type: "input",
      propName: "name",
      placeholder: "Enter the name of your website...",
    },
    {
      question: "What is the primary goal of your website?",
      type: "select",
      propName: "goal",
      options: [
        { txt: "Choose option...", value: "default" },
        { txt: "To sell services", value: "To sell services" },
        { txt: "To sell products", value: "To sell products" },
        { txt: "To showcase a portfolio", value: "To showcase a portfolio" },
        { txt: "To showcase a blog", value: "To showcase a blog" },
        { txt: "To showcase a gallery", value: "To showcase a gallery" },
        { txt: "Other", value: "other" },
      ],
    },
    {
      question: "Who is your target audience?",
      type: "select",
      propName: "audience",
      options: [
        { txt: "Choose option...", value: "default" },
        { txt: "General public", value: "General public" },
        { txt: "Business professionals", value: "Business professionals" },
        { txt: "Students", value: "Students" },
        { txt: "Hobbyists", value: "Hobbyists" },
        { txt: "Other", value: "other" },
      ],
    },
    {
      question:
        "What keywords would you use to describe your website? (separate with commas)",
      type: "input",
      propName: "keywords",
      placeholder: "Enter keywords...",
    },
    {
      question: "Do you have any specific design preferences for your website?",
      type: "select",
      propName: "designPreferences",
      options: [
        { txt: "Choose option...", value: "default" },
        { txt: "Minimalistic and clean", value: "Minimalistic and clean" },
        { txt: "Colorful and vibrant", value: "Colorful and vibrant" },
        { txt: "Elegant and professional", value: "Elegant and professional" },
        { txt: "Other", value: "other" },
      ],
    },
    {
      question: "When a user visits your website, what do you want them to do?",
      type: "select",
      propName: "cta",
      options: [
        { txt: "Choose option...", value: "default" },
        { txt: "Buy a product", value: "Buy a product" },
        { txt: "Book a service", value: "Book a service" },
        { txt: "Read a blog post", value: "Read a blog post" },
        { txt: "Explore my website", value: "Explore my website" },
        { txt: "Join my newsletter", value: "Join my newsletter" },
        { txt: "Other", value: "other" },
      ],
    },
  ];

  return (
    <div className="Templates">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <meta name="author" content={author}></meta>
        <meta name="description" content={description} />
        <link rel="icon" href="/faviconWh.ico" />
        <meta property="og:image" content={img}></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:title" content={title}></meta>
        <meta property="og:description" content={description}></meta>
        <meta property="twitter:card" content="summary_large_image"></meta>
        <meta property="twitter:title" content={title}></meta>
        <meta property="twitter:description" content={description}></meta>
      </Head>

      {loadBool ? <Loader /> : ""}

      {isUser && surveyNotFilled ? (
        <div id="popUpSurvey" className="">
          <p>
            Question {surveyQuestionIndex + 1}/{questionArr.length}
          </p>
          <h2>{questionArr[surveyQuestionIndex].question}</h2>

          <form id="popUpSurveyOptions">
            {questionArr[surveyQuestionIndex].type === "select" ? (
              <>
                <select onChange={handleSelectChange} value={selectedOption}>
                  {questionArr[surveyQuestionIndex].options.map(
                    (option, index) => (
                      <option key={index} value={option.value}>
                        {option.txt}
                      </option>
                    )
                  )}
                </select>
                {showInput && <input type="text" placeholder="Enter..." />}
              </>
            ) : questionArr[surveyQuestionIndex].type === "input" ? (
              <input
                type="text"
                placeholder={questionArr[surveyQuestionIndex].placeholder}
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setCanProceed(true);
                  } else {
                    setCanProceed(false);
                  }
                }}
              />
            ) : (
              ""
            )}

            <button
              disabled={!canProceed}
              onClick={(e) => {
                // prevent Default
                e.preventDefault();
                if (surveyQuestionIndex < questionArr.length - 1) {
                  setSurveyQuestionIndex(surveyQuestionIndex + 1);
                  setCanProceed((prevState) => !prevState);
                  setShowInput(false);
                  setSelectedOption("");
                  setSurveyData({
                    ...surveyData,
                    [questionArr[surveyQuestionIndex].propName]:
                      selectedOption || document.querySelector("input").value,
                  });
                } else {
                  setSurveyNotFilled(false);
                  // send the filled out surveydata to firestore under user-uid/surveyData
                  let db = getFirestore(app);
                  const auth = getAuth(app);
                  let uid;
                  try {
                    uid = "user-" + auth.currentUser.uid;
                  } catch (err) {
                    uid = "_";
                  }
                  const col = collection(db, `users/` + uid + `/surveyData`);
                  setTimeout(() => {
                    setDoc(doc(col, "data"), surveyData);
                  }, 1000);
                }
              }}
            >
              Next <span>→</span>
            </button>
          </form>
        </div>
      ) : (
        ""
      )}

      <button id="fetch" onClick={getData}></button>

      <MainNav />
      <main id="templatesWrapper">
        <section>
          <h1>Templates</h1>
        </section>
        <section id="templates">{templates}</section>
      </main>
      <MainFooter />
    </div>
  );
}
