import app from "../../firebase/clientApp";
import { getFirestore, getDoc, doc } from "firebase/firestore/lite";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Default() {
  const router = useRouter();
  const siteId = router.query.siteId;
  useEffect(() => {
    const getStatic = () => {
      importData();
    };
    getStatic();
  }, [router.query.siteId]);
  const importData = async () => {
    if (siteId !== undefined) {
      try {
        const jsonData = await import(`./static/${siteId}.json`);
        setPageData(jsonData.default.webContent.pages.main.structure);
        setMetaData(jsonData.default.webContent.meta);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const [fullSite, setFullSite] = useState(<></>);
  useEffect(() => {
    const el = document.getElementById("fetch");
    setTimeout(() => {
      el.click();
    }, 1500);
  }, []);

  let dataArr = [];
  const [fullData, setFullData] = useState({});
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
    try {
      const data = await getDoc(ref).then((doc) => {
        dataArr.push(doc.data());
        dataArr.forEach((item, index) => {
          if (item !== undefined) {
            try {
              setPageData(item.webContent.pages.main.structure);
              setMetaData(item.webContent.meta);
              setFullData(item);
            } catch (err) {
              console.log(err);
            }
          }
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    try {
      let main = document.querySelector(".published main");
      for (let i = 0; i < main.children.length; i++) {
        if (main.children[i].id !== "emptySection") {
          console.log(
            window.getComputedStyle(main.children[i])["background-color"]
          );
          main.children[i].children[0].style.color = getContrastYIQfromBG(
            window.getComputedStyle(main.children[i])["background-color"]
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, [fullSite]);
  function getContrastYIQfromBG(rgbColor) {
    console.log(rgbColor);

    // Extracting the individual color components from the RGB format
    var rgbValues = rgbColor.substring(4, rgbColor.length - 1).split(",");
    var r = parseInt(rgbValues[0].trim());
    var g = parseInt(rgbValues[1].trim());
    var b = parseInt(rgbValues[2].trim());

    // Calculating YIQ value
    var yiq = (r * 299 + g * 587 + b * 114) / 1000;
    console.log(yiq);

    return yiq >= 128 ? "var(--colorDark)" : "var(--colorLight)";
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
              <p>{section.content.txt}</p>
            </section>
          );
        case "imgAndTxt":
          return (
            <section
              key={index}
              className={section.type + " " + section.options.direction}
            >
              <div className="txtWrapper">
                <h2>{section.content.heading}</h2>
                <p>{section.content.txt}</p>
              </div>
              <div className="imgWrapper">
                <img
                  src={section.content.img}
                  draggable={false}
                  loading={index > 3 ? "lazy" : "eager"}
                />
              </div>
            </section>
          );
        case "nav":
          return (
            <nav className={section.type} key={index}>
              <a href="" id="navLogo" className="noSelect">
                <img src={metaData.metaFavicon} draggable={false} />
                <p>{fullData.name}</p>
              </a>
            </nav>
          );
        case "footer":
          return (
            <footer className={section.type} key={index}>
              <p id="watermark">
                <a href="https://inkmorphism.com" target="_blank">
                  Built with Inkmorphism 🖋️
                </a>
              </p>
              <p>{section.content.txt}</p>
            </footer>
          );
        case "imgOnly":
          return (
            <section
              key={index}
              className={section.type + " " + section.options.direction}
            >
              <img
                src={section.content.img}
                draggable={false}
                loading={index > 3 ? "lazy" : "eager"}
              />
            </section>
          );
        case "grid2":
          return (
            <section
              key={index}
              className={section.type + " " + section.options.direction}
            >
              <article>
                <div className="imgWrapper">
                  <img
                    src={section.content.img1}
                    draggable={false}
                    loading={index > 3 ? "lazy" : "eager"}
                  />
                </div>
                <p>{section.content.txt1}</p>
              </article>
              <article>
                <div className="imgWrapper">
                  <img
                    src={section.content.img2}
                    draggable={false}
                    loading={index > 3 ? "lazy" : "eager"}
                  />
                </div>
                <p>{section.content.txt2}</p>
              </article>
            </section>
          );
        // case "grid3":
        //   return (
        //     <section
        //       key={index}
        //       className={section.type + " " + section.options.direction}
        //     >
        //       <article>
        //         <div className="imgWrapper">
        //           <img
        //             src={section.content.img1}
        //             draggable={false}
        //             loading={index > 3 ? "lazy" : "eager"}
        //           />
        //         </div>
        //         <p>{section.content.txt1}</p>
        //       </article>
        //       <article>
        //         <div className="imgWrapper">
        //           <img
        //             src={section.content.img2}
        //             draggable={false}
        //             loading={index > 3 ? "lazy" : "eager"}
        //           />
        //         </div>
        //         <p>{section.content.txt2}</p>
        //       </article>
        //       <article>
        //         <div className="imgWrapper">
        //           <img
        //             src={section.content.img3}
        //             draggable={false}
        //             loading={index > 3 ? "lazy" : "eager"}
        //           />
        //         </div>
        //         <p>{section.content.txt3}</p>
        //       </article>
        //     </section>
        //   );
        // case "grid2":
        //   return (
        //     <section
        //       key={index}
        //       className={section.type + " " + section.options.direction}
        //     >
        //       <article>
        //         <div className="imgWrapper">
        //           <img
        //             src={section.content.img1}
        //             draggable={false}
        //             loading={index > 3 ? "lazy" : "eager"}
        //           />
        //         </div>
        //         <p>{section.content.txt1}</p>
        //       </article>
        //       <article>
        //         <div className="imgWrapper">
        //           <img
        //             src={section.content.img2}
        //             draggable={false}
        //             loading={index > 3 ? "lazy" : "eager"}
        //           />
        //         </div>
        //         <p>{section.content.txt2}</p>
        //       </article>
        //     </section>
        //   );
        // case "hero":
        //   return (
        //     <section key={index} className={section.type}>
        //       <div className="txtWrapper">
        //         {section.content.heading !== "" ? (
        //           <h2>{section.content.heading}</h2>
        //         ) : null}
        //         <p>{section.content.txt}</p>
        //       </div>
        //       <div className="imgWrapper">
        //         <img src={section.content.img} draggable={false} />
        //       </div>
        //     </section>
        //   );
        default:
          break;
      }
    });

    setFullSite(sections);
  }, [pageData]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--scrollbarThumb", metaData.colorPalette.color1);
    root.style.setProperty("--scrollbarTrack", "#121212");
  }, [pageData]);

  return (
    <div
      className={metaData.metaStyle + " published"}
      style={{
        "--color1": metaData["colorPalette"]["color1"],
        "--color2": metaData["colorPalette"]["color2"],
        "--color3": metaData["colorPalette"]["color3"],
        "--colorLight": metaData["colorPalette"]["colorLight"],
        "--colorDark": metaData["colorPalette"]["colorDark"],
      }}
    >
      <Head>
        <title>{metaData.metaTitle}</title>
        <meta name="description" content={metaData.metaDescription}></meta>
        <link rel="icon" href={metaData.metaFavicon} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content={metaData.metaAuthor}></meta>
        <meta property="og:image" content={metaData.metaThumbnail}></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:title" content={metaData.metaTitle}></meta>
        <meta
          property="og:description"
          content={metaData.metaDescription}
        ></meta>
        <meta property="twitter:card" content="summary_large_image"></meta>
        <meta property="twitter:title" content={metaData.metaTitle}></meta>
        <meta
          property="twitter:description"
          content={metaData.metaDescription}
        ></meta>
      </Head>
      <button id="fetch" onClick={getData}></button>
      <main>{fullSite}</main>
    </div>
  );
}
