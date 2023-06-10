
    import Head from "next/head";
    import { useEffect, useState } from "react";
    import MainNav from "../components/MainNav";
    import MainFooter from "../components/MainFooter";  
    import ReactMarkdown from "react-markdown";
  
    export default function Article() {
      const [authorData, setAuthorData] = useState({
        authorProfilePic: "",
        authorBio: "",
        authorSocials: [],
        author: "",
      });
      const [articleData, setArticleData] = useState([]);
      const [processedMD, setProcessedMD] = useState("");

      useEffect(() => {
        const getStatic = () => {
          importData();
        };
        getStatic();
      }, []);
      const importData = async () => {
          try {
            const jsonData = await import('./authors/danriemen.json');
            setAuthorData(jsonData);
            const articleDataJSON = await import("./articlesData.json");
            setArticleData(articleDataJSON.default.filter((item) => item.urlSlug !== "can-ai-build-a-website"));
            const md = await import('./raw_files/can-ai-build-a-website.md');
            setProcessedMD(<ReactMarkdown>{md.default.replace(
              "%placeholder%",
              "https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/blog%2Fcan-ai-build-a-website%2Fthumbnail.webp?alt=media&token=c4513118-2aa7-45c3-bda6-23ff53966704"
            )}</ReactMarkdown>)
          } catch (err) {
            console.log(err);
          }
      };

          return (
            <div className={"Article"}>
              <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Can AI Build a Website?</title>
                <meta name="author" content="Dan Riemen"></meta>
                <meta name="description" content="Discover the power of AI in web design: save time, money, and effort while creating stunning websites that rival the biggest names in your field." />
                <link rel="icon" href="/faviconWh.ico" />
                <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/blog%2Fcan-ai-build-a-website%2Fthumbnail.webp?alt=media&token=c4513118-2aa7-45c3-bda6-23ff53966704"></meta>
                <meta property="og:type" content="website"></meta>
                <meta property="og:title" content="Can AI Build a Website?"></meta>
                <meta property="og:description" content="Discover the power of AI in web design: save time, money, and effort while creating stunning websites that rival the biggest names in your field."></meta>
                <meta property="twitter:card" content="summary_large_image"></meta>
                <meta property="twitter:title" content="Can AI Build a Website?"></meta>
                <meta property="twitter:description" content="Discover the power of AI in web design: save time, money, and effort while creating stunning websites that rival the biggest names in your field."></meta>
              </Head>
            
              <MainNav />
          
              <main>
                <div id="thumbnail">
                  <img src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/blog%2Fcan-ai-build-a-website%2Fthumbnail.webp?alt=media&token=c4513118-2aa7-45c3-bda6-23ff53966704" />
                </div>
                <article id="article">{
                  processedMD
                }
                </article>
                <aside>
                  <section id="authorProfile">
                    <div id="authorProfilePic">
                      <img loading="lazy" src={authorData.authorProfilePic} />
                    </div>
                    <div id="authorProfileInfo">
                      <h3>Dan Riemen</h3>
                      <p>{authorData.authorBio}</p>
                      <div id="socials">
                      {
                        authorData.authorSocials.map((social, index) => {
                          return (
                            <a href={social.url} target="_blank" key={index} className="noSelect">
                              <img loading="lazy" src={social.icon} />
                            </a>
                          )
                        })
                      }
                      </div>
                    </div>
                  </section>
                  <section>
                    <div id="suggestions">
                      <h2>Suggested Content:</h2>
                      {articleData.map((article, index) => {
                        return (
                          <a
                            href={"/blog/" + article.urlSlug}
                            key={index}
                            className="noSelect"
                          >
                            <div className="imgWrapper">
                              <img loading="lazy" src={article.thumbnail} />
                            </div>
                            <div className="middleContent">
                              <h3>{article.title}</h3>
                              <div className="tags">
                                {article.tags.map((item, index) => (
                                  <p key={index}>{item}</p>
                                ))}
                              </div>
                            </div>
                            <button>Read more</button>
                          </a>
                        );
                      })}
                    </div>
                  </section>
                </aside>
              </main>
          
              <MainFooter />
            </div>
          );
      }