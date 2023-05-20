import Head from "next/head";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import MainNav from "../components/MainNav";
import MainFooter from "../components/MainFooter";
// import markdownContent from "./raw_files/can-ai-build-a-website.md";

export default function Article() {
  const router = useRouter();
  const articleId = router.query.article;

  const [markdownContent, setMarkdownContent] = useState("");
  useEffect(() => {
    // const getStatic = () => {
    //   importData();
    // };
    // getStatic();
    if (articleId !== undefined) {
      import(`./raw_files/${articleId}.md`)
        .then((module) => {
            setMarkdownContent(module.default);
        })
        .catch((error) => {
          // Handle any errors that occurred during import
          console.error(error);
        });
    }
  }, [router.query.article]);

  return (
    <div className={"Article"}>
      <Head>
        {/* <link rel="icon" href={defaultFiles['logo']} /> */}
        <title>Inkmorphism - Article</title>
        <link rel="icon" href="/faviconWh.ico" />
      </Head>

      <MainNav />

      <main>
        <article>
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
        </article>
      </main>

      <MainFooter />
    </div>
  );
}
