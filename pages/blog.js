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
  const db = getFirestore(app);

  const articlesArr = {
    published: [
      {
        urlSlug: "can-ai-build-a-website",
        publishDate: {
          timestampValue: "2023-05-23T21:00:00.520Z",
        },
        description:
          "Discover the power of AI in web design: save time, money, and effort while creating stunning websites that rival the biggest names in your field.",
        title: "Can AI Build a Website?",

        isPublished: true,

        author: "Dan Riemen",

        tags: ["Web Design", "AI", "ChatGPT"],
        thumbnail:
          "https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/blog%2Fcan-ai-build-a-website%2Fthumbnail.webp?alt=media&token=c4513118-2aa7-45c3-bda6-23ff53966704",
      },
    ],

    // {
    //   urlSlug: {
    //     stringValue: "3-ways-to-build-a-website",
    //   },
    //   author: {
    //     stringValue: "Yassen Shopov",
    //   },
    //   description: {
    //     stringValue: "",
    //   },
    //   title: {
    //     stringValue: "3 Ways to Build a website in 2023",
    //   },
    //   tags: {
    //     arrayValue: {
    //       values: [
    //         {
    //           stringValue: "Web Design",
    //         },
    //         {
    //           stringValue: "Content Creation",
    //         },
    //       ],
    //     },
    //   },
    //   thumbnail: {
    //     stringValue:
    //       "https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/blog%2F3-ways-to-build-a-website%2Fthumbnail.png?alt=media&token=6afcd0b0-c143-47b2-9449-ef031e6b2d88",
    //   },
    //   isPublished: {
    //     booleanValue: false,
    //   },
    // },
  };

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
  const [articles, setArticles] = useState(renderedArticles);

  async function getData() {
    const ref = collection(db, `articles`);
    let data = await getDocs(ref);
    console.log(data._docs);
    let dbRenderedData = [];
    for (let entry in data._docs) {
      dbRenderedData.push(data._docs[entry].data());
    }
    // const articlesArr = dbRenderedData.reduce(
    //   (obj, site) => {
    //     site.isPublished
    //       ? obj.published.push(site)
    //       : obj.notPublished.push(site);
    //     return obj;
    //   },
    //   { notPublished: [], published: [] }
    // );
    console.log(articlesArr);
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
            <h1>Insights, Tips, and Inspiration</h1>
            <h2>Elevate Your design skills with expert articles</h2>
            <a href="#blogs">Explore ↓</a>
          </div>
          <div id="heroImg">
            <img src="blog/hero.gif" />
          </div>
        </section>

        <section id="blogs">{articles}</section>
      </main>

      <MainFooter />
    </div>
  );
}
