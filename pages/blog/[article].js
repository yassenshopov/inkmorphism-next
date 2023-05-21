import Head from "next/head";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import MainNav from "../components/MainNav";
import MainFooter from "../components/MainFooter";
// import markdownContent from "./raw_files/can-ai-build-a-website.md";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore/lite";

export default function Article() {
  const router = useRouter();
  const articleId = router.query.article;

  const [markdownContent, setMarkdownContent] = useState("");
  const db = getFirestore();
  const [article, setArticle] = useState({});
  const [thumbnail, setThumbnail] = useState("");

  useEffect(() => {
    // const getStatic = () => {
    //   importData();
    // };
    // getStatic();
    getData()

    if (articleId !== undefined && thumbnail !== "") {
      import(`./raw_files/${articleId}.md`)
        .then((module) => {
            const processedMD = module.default.replace("%placeholder%", thumbnail)
          setMarkdownContent(processedMD);
        })
        .catch((error) => {
          // Handle any errors that occurred during import
          console.error(error);
        });
      
    }
  }, [router.query.article, thumbnail]);

  async function getData() {
    const ref = doc(db, `articles/${articleId}`);
    let data = await getDoc(ref);
    console.log(data.data());
    setArticle(data.data());
    try {
        setThumbnail(data.data().thumbnail);
    } catch(err) {
        console.log(err)
    }
  }

  return (
    <div className={"Article"}>
      <Head>
        {/* <link rel="icon" href={defaultFiles['logo']} /> */}
        <title>Inkmorphism - Article</title>
        <link rel="icon" href="/faviconWh.ico" />
      </Head>

      <MainNav />

      <main>
        <div id="thumbnail">
            <img src={thumbnail}/>
        </div>
        <article>
          <ReactMarkdown>{markdownContent}</ReactMarkdown>
        </article>
      </main>

      <MainFooter />
    </div>
  );
}
