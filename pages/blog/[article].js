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
import { BiLoaderAlt } from "react-icons/bi";

export default function Article() {
  const router = useRouter();
  const articleId = router.query.article;

  const [markdownContent, setMarkdownContent] = useState(
    <div id="articleLoader">
      <BiLoaderAlt />
    </div>
  );
  const db = getFirestore();
  const [article, setArticle] = useState({});
  const [thumbnail, setThumbnail] = useState("https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/blog%2Fbanner.webp?alt=media&token=0941c310-98e5-45e0-af1b-8bb48c9218b3");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [authorProfilePic, setAuthorProfilePic] = useState("");
  const [authorBio, setAuthorBio] = useState("");
  const [authorSocials, setAuthorSocials] = useState([]);//[twitter, linkedin, github, website

  useEffect(() => {
    // const getStatic = () => {
    //   importData();
    // };
    // getStatic();
    getData();

    if (articleId !== undefined && thumbnail !== "") {
      import(`./raw_files/${articleId}.md`)
        .then((module) => {
          const processedMD = module.default.replace(
            "%placeholder%",
            thumbnail
          );
          // console.log((<ReactMarkdown>{processedMD}</ReactMarkdown>).props.children.toString())
          console.log(document.getElementById("article").children)
          setMarkdownContent(<ReactMarkdown>{processedMD}</ReactMarkdown>);
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
      setTitle(data.data().title);
      setAuthor(data.data().author);
      setDescription(data.data().description);
      setAuthorProfilePic(data.data().authorProfilePic);
      setAuthorBio(data.data().authorBio);
      setAuthorSocials(data.data().authorSocials);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={"Article"}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <meta name="author" content={author}></meta>
        <meta name="description" content={description} />
        <link rel="icon" href="/faviconWh.ico" />
        <meta property="og:image" content={thumbnail}></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:title" content={title}></meta>
        <meta property="og:description" content={description}></meta>
        <meta property="twitter:card" content="summary_large_image"></meta>
        <meta property="twitter:title" content={title}></meta>
        <meta property="twitter:description" content={description}></meta>
      </Head>

      <MainNav />

      <main>
        <div id="thumbnail">
          <img src={thumbnail} />
        </div>
        <article id="article">{markdownContent}
          <section id="authorProfile">
            <div id="authorProfilePic">
              <img src={authorProfilePic} />
            </div>
            <div id="authorProfileInfo">
              <h3><em>{author}</em></h3>
              <p><em>{authorBio}</em></p>
              <div id="socials">
                {
                  authorSocials.map((social, index) => {
                    return (
                      <a href={social.url} target="_blank" key={index}>
                        <img src={social.icon} />
                      </a>
                    )
                  })
                }
              </div>
            </div>
          </section>
        </article>
      </main>

      <MainFooter />
    </div>
  );
}
