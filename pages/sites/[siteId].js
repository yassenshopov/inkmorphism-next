import app from "../../firebase/clientApp";
import {
  getFirestore,
  getDoc,
  doc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore/lite";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
export default function Default() {
  const router = useRouter();
  const siteId = router.query.siteId;
  console.log(siteId);

  const [fullSite, setFullSite] = useState(<></>);
  useEffect(() => {
    const el = document.getElementById("fetch");
    // el.click();
    setTimeout(() => {
      el.click();
    }, 3500);
  }, []);

  let dataArr = [];
  const [pageData, setPageData] = useState([]);
  const [metaData, setMetaData] = useState({
    metaThumbnail:
      "https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fmusic-point-595%2Fthumbnail.png?alt=media&token=667a1542-8de7-45b2-ae39-520667a9af22",
    metaTitle: "Inkmorphism - Your Website",
    metaFavicon:
      "https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fmusic-point-595%2Flogo.png?alt=media&token=b601d1f8-8708-4c89-b8f5-8d75f2f1c164",
    metaStyle: "skeletal",
    metaAuthor: "Meta Author",
    colorPalette: {
      color1: "#8fffb8",
      color2: "#fdff80",
      colorDark: "#0a0000",
      colorLight: "#ffffff",
      color3: "#fcffe5",
    },
    metaDescription: "The description for your website",
  });
  
  let db = getFirestore(app);

  async function getData() {
    const ref = doc(db, "publicSites", siteId);
    const data = await getDoc(ref).then((doc) => {
      dataArr.push(doc.data());
      dataArr.forEach((item, index) => {
        if (item !== undefined && index === 1) {
          try {
            setPageData(item.webContent.pages.main.structure);
            setMetaData(item.webContent.meta);
            console.log(item.webContent.meta);
          } catch (err) {
            console.log(err);
          }
        }
      });
      console.log(dataArr);
    });
  }

  useEffect(() => {
    const sections = pageData.map((section, index) => {
      switch (section.type) {
        case "txtOnly":
          return (
            <section
              key={index}
              className={section.type + " " + section.options.direction}
            >
              <p
              >
                {section.content.txt}
              </p>
            </section>
          );
        case "imgAndTxt":
          return (
            <section
              key={index}
              className={section.type + " " + section.options.direction}
            >
              <p
              >
                {section.content.txt}
              </p>
              <div className="imgWrapper">
                <img src={section.content.img} draggable={false} />
              </div>
            </section>
          );
        case "nav":
          return (
            <nav className={section.type} key={index}>
              <a id="navLogo">
                <img
                  src={section.content.logo}
                  draggable={false}
                  loading="lazy"
                />
                {/* <p>{defaults.name}</p> */}
              </a>
            </nav>
          );
        case "footer":
          return (
            <footer className={section.type} key={index}>
              <p>{section.content.txt}</p>
            </footer>
          );
        case "imgOnly":
          return (
            <section
              key={index}
              className={section.type + " " + section.options.direction}
            >
              <div className="imgWrapper">
                <img
                  src={section.content.img}
                  draggable={false}
                  loading="lazy"
                />
              </div>
            </section>
          );
        default:
          break;
      }
    });
    setFullSite(sections);
  }, [pageData]);

  return (
    <div className={metaData.metaStyle}>
      <Head></Head>
      <button id="fetch" onClick={getData}></button>
      {fullSite}
    </div>
  );
}
