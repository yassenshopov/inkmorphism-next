import fs from "fs";

function itemToPage(item) {
  return `
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
            const jsonData = await import('./authors/${item.author
              .replace(/\s/g, "")
              .toLowerCase()}.json');
            setAuthorData(jsonData);
            const articleDataJSON = await import("./articlesData.json");
            setArticleData(articleDataJSON.default.filter((item) => item.urlSlug !== "${item.urlSlug}"));
            const md = await import('./raw_files/${item.urlSlug}.md');
            setProcessedMD(<ReactMarkdown>{md.default.replace(
              "%placeholder%",
              "${item.thumbnail}"
            )}</ReactMarkdown>)
          } catch (err) {
            console.log(err);
          }
      };

          return (
            <div className={"Article"}>
              <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>${item.title}</title>
                <meta name="author" content="${item.author}"></meta>
                <meta name="description" content="${item.description}" />
                <link rel="icon" href="/faviconWh.ico" />
                <meta property="og:image" content="${item.thumbnail}"></meta>
                <meta property="og:type" content="website"></meta>
                <meta property="og:title" content="${item.title}"></meta>
                <meta property="og:description" content="${
                  item.description
                }"></meta>
                <meta property="twitter:card" content="summary_large_image"></meta>
                <meta property="twitter:title" content="${item.title}"></meta>
                <meta property="twitter:description" content="${
                  item.description
                }"></meta>
              </Head>
            
              <MainNav />
          
              <main>
                <div id="thumbnail">
                  <img src="${item.thumbnail}" />
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
                      <h3>${item.author}</h3>
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
      }`;
}

export default function handler(req, res) {
  const { item } = req.body;

  fs.writeFileSync(`pages/blog/${item.urlSlug}.js`, itemToPage(item));

  res.status(200).json({ message: "Page created successfully." });
}
