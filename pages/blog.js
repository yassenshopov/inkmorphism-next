import Head from "next/head";
import MainNav from "./components/MainNav";
import MainFooter from "./components/MainFooter";
import { useEffect, useState } from "react";
import data from "./blog/articlesData.json";

export default function Blog() {
  const [articlesData, setArticlesData] = useState([]);
  const [articlesRendered, setArticlesRendered] = useState([]);

  const [sth, setSth] = useState("sth");

  useEffect(() => {
    setTimeout(() => {
      setSth("sth2");
    }, 2000);
    importData();
  }, []);
  const importData = async () => {
    try {
      setArticlesData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const renderedArticles = articlesData.map((site) => (
      <a
        key={site.urlSlug}
        href={"/blog/" + site.urlSlug}
        className="noSelect article"
      >
        <div className="imgWrapper">
          <img src={site.thumbnail} loading="lazy" />
        </div>
        <div className="middleContent">
          <p className="author">- by {site.author}</p>
          <h2>{site.title}</h2>
          {/* <p className="description">{site.description}</p> */}
          <div className="tags">
            {" "}
            {site.tags.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        </div>
        <button>Read more</button>
      </a>
    ));
    setArticlesRendered(renderedArticles);
    console.log(renderedArticles);
  }, [articlesData]);

  return (
    <div className={"Blog"}>
      <Head>
        {/* <link rel="icon" href={defaultFiles['logo']} /> */}
        <title>Inkmorphism - Blog</title>
        <link rel="icon" href="/faviconWh.ico" />
      </Head>

      <MainNav />

      <main>
        <section id="hero">
          <div id="heroTxt">
            <h1>Insights, tips, and inspiration</h1>
            <h2>Elevate your design skills with expert articles</h2>
            <a href="#explore" className="noSelect">
              Explore ↓
            </a>
          </div>
          <div id="heroImg">
            <img src="blog/hero.gif" />
          </div>
        </section>

        <section id="blogs">
          {articlesRendered}
          <div id="explore"></div>
        </section>
      </main>

      <MainFooter />
    </div>
  );
}
