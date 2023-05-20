import Head from "next/head";
import WIP from "./components/wip";
import MainNav from "./components/MainNav";
import MainFooter from "./components/MainFooter";
import { useEffect, useState } from "react";
import app from "../firebase/clientApp";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore/lite";

export default function Blog() {
  const [articles, setArticles] = useState([]);

  const db = getFirestore(app);

  async function getData() {
    const ref = collection(db, `articles`);
    let data = await getDocs(ref);
    console.log(data._docs);
    let dbRenderedData = [];
    for (let entry in data._docs) {
      dbRenderedData.push(data._docs[entry].data());
    }
    const articlesArr = dbRenderedData.reduce(
      (obj, site) => {
        site.isPublished
          ? obj.published.push(site)
          : obj.notPublished.push(site);
        return obj;
      },
      { notPublished: [], published: [] }
    );
    // articlesArr.published.sort((a, b) => {
    //   // First, sort by the 'published' property
    //   if (a.published && !b.published) {
    //     return -1;
    //   } else if (!a.published && b.published) {
    //     return 1;
    //   } else {
    //     // If both have the same 'published' property value, sort alphabetically by the 'urlSlug' property
    //     return a.urlSlug.localeCompare(b.urlSlug);
    //   }
    // });
    console.log(articlesArr);
    const renderedArticles = articlesArr.published.map((site) => (
      <a
        key={site.urlSlug}
        href={"/blog/" + site.urlSlug}
        className="noSelect article"
      >
        <div className="imgWrapper">
          <img src={site.thumbnail} loading="lazy" />
        </div>
        <p className="author">- by {site.author}</p>
        <h2>{site.title}</h2>
        {/* <p className="description">{site.description}</p> */}
        <div className="tags">
          {" "}
          {site.tags.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
        <button>Read more</button>
      </a>
    ));
    setArticles(renderedArticles);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={"Blog"}>
      <Head>
        {/* <link rel="icon" href={defaultFiles['logo']} /> */}
        <title>Inkmorphism - Blog</title>
        <link rel="icon" href="/faviconWh.ico" />
      </Head>

      <MainNav />

      {/* <WIP/> */}

      <main>
        <section id="hero">
          <div id="heroTxt">
            <h1>Got a new website and not sure how to make it pop?</h1>
            <h2>Let Inkmorphism build it for you!</h2>
            <a href="/templates">Let's go</a>
          </div>
        </section>

        <section id="blogs">{articles}</section>
      </main>

      <MainFooter />
    </div>
  );
}
