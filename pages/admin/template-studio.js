import { useEffect, useState } from "react";
import Dashnav from "../components/dashnav";
// import styles from "../../styles/glassmorphism.module.css";

export default function TemplateStudio() {
  const [pageStructure, setPageStructure] = useState([]);
  const [metaData, setMetaData] = useState({});
  const [mainData, setMainData] = useState({name: ""});
  const [style, setStyle] = useState("");

  const exampleSite = {
    logo: "../templates/" + style + "Logo.png"
  };

  function handleCreateTemplate(style) {
    let newSite = require("../templates/" + style + "Starter.json");
    console.table(newSite.webContent.pages.main.structure);
    setPageStructure(newSite.webContent.pages.main.structure);
    setMetaData(newSite.webContent.meta);
    setMainData({
      name: newSite.name,
    })
    setStyle(style);
  }

  useEffect(() => {
    handleCreateTemplate("glassmorphism");
  }, []);

  function createSection(type, content, options, index) {
    switch (type) {
      case "nav": {
        return (
          <nav className="nav" key={index}>
            <a href="" id="navLogo" className="noSelect">
              <img src={exampleSite.logo} draggable="false" />
              <p>{mainData.name}</p>
            </a>
          </nav>
        );
      }
      case "hero": {
        return (
          <section className="hero" key={index}>
            <div className="txtWrapper">
              <h2>{content.heading}</h2>
              <p>{content.txt}</p>
              <p
                className="cta"
                onClick={() => {
                  window.scrollTo({
                    top: window.innerHeight / 0.75,
                    behavior: "smooth",
                  });
                }}
              >
                {content.cta}
              </p>
            </div>
            <div className="imgWrapper">
              <img src={content.img} draggable="false" loading="eager" />
            </div>
          </section>
        );
      }
      case "imgAndTxt": {
        return (
          <section
            className={
              "imgAndTxt " + (options.direction ? options.direction : "")
            }
            key={index}
          >
            <div className="imgWrapper">
              <img src={content.img} draggable="false" loading="eager" />
            </div>
            <div className="txtWrapper">
              <h2>{content.heading}</h2>
              <p>{content.txt}</p>
            </div>
          </section>
        );
      }
      case "grid3": {
        return (
          <section className="grid3" key={index}>
            <h2 className="heading">{content.heading}</h2>
            <div className="grid">
              <article>
                <div className="imgWrapper">
                  <img src={content.img1} draggable="false" loading="eager" />
                </div>
                <p>{content.txt1}</p>
              </article>
              <article>
                <div className="imgWrapper">
                  <img src={content.img2} draggable="false" loading="eager" />
                </div>
                <p>{content.txt2}</p>
              </article>
              <article>
                <div className="imgWrapper">
                  <img src={content.img3} draggable="false" loading="eager" />
                </div>
                <p>{content.txt3}</p>
              </article>
            </div>
          </section>
        );
      }
      case "grid2": {
        return (
          <section className="grid2" key={index}>
            <h2 className="heading">{content.heading}</h2>
            <div className="grid">
              <article>
                <div className="imgWrapper">
                  <img src={content.img1} draggable="false" loading="eager" />
                </div>
                <p>{content.txt1}</p>
              </article>
              <article>
                <div className="imgWrapper">
                  <img src={content.img2} draggable="false" loading="eager" />
                </div>
                <p>{content.txt2}</p>
              </article>
            </div>
          </section>
        );
      }
      case "maps": {
        return (
          <section className="maps" key={index}>
            <h2>{content.heading}</h2>
            <div className="mapsWrapper">
              <iframe
                src={content.embedURL}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </section>
        );
      }
      case "footer": {
        return (
          <footer className="footer" key={index}>
            <p id="watermark">
              <a href="https://inkmorphism.com" target="_blank">
                Built with Inkmorphism <img src="../logoWh.webp" />
              </a>
            </p>
            <p>{content.txt}</p>
          </footer>
        );
      }
    }
  }

  return (
    <div className="TemplateStudio">
      <Dashnav />
      <main
        className={style + " published"}
        style={{
          "--color1": (metaData.colorPalette ? metaData.colorPalette.color1 : "#000000"),
          "--color2": (metaData.colorPalette ? metaData.colorPalette.color2 : "#000000"),
          "--color3": (metaData.colorPalette ? metaData.colorPalette.color3 : "#000000"),
          "--colorLight": (metaData.colorPalette ? metaData.colorPalette.colorLight : "#000000"),
          "--colorDark": (metaData.colorPalette ? metaData.colorPalette.colorDark : "#000000"),
        }}
      >
        {pageStructure.map((section, index) => {
          return createSection(
            section.type,
            section.content,
            section.options,
            index
          );
        })}
      </main>
    </div>
  );
}
