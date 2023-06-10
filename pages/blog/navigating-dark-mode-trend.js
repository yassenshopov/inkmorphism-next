
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
            const jsonData = await import('./authors/yassenshopov.json');
            setAuthorData(jsonData);
            const articleDataJSON = await import("./articlesData.json");
            setArticleData(articleDataJSON.default.filter((item) => item.urlSlug !== "navigating-dark-mode-trend"));
            const md = await import('./raw_files/navigating-dark-mode-trend.md');
            setProcessedMD(<ReactMarkdown>{md.default.replace(
              "%placeholder%",
              "https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/blog%2Fnavigating-dark-mode-trend%2Fthumbnail.webp?alt=media&token=ba740e3e-4ff7-4321-a7f9-f7e876409a8a&_gl=1*1tospw6*_ga*MTE1NDIyNjIyMi4xNjczMTk2MTM5*_ga_CW55HF8NVT*MTY4NjM5NDIzOS45MS4xLjE2ODYzOTYyOTMuMC4wLjA."
            )}</ReactMarkdown>)
          } catch (err) {
            console.log(err);
          }
      };

          return (
            <div className={"Article"}>
              <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Navigating the Dark Mode Trend: Designing Websites</title>
                <meta name="author" content="Yassen Shopov"></meta>
                <meta name="description" content="Discover the benefits of dark mode in web design and learn how to design websites that prioritize eye comfort. Navigate the dark mode trend with practical tips and techniques." />
                <link rel="icon" href="/faviconWh.ico" />
                <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/blog%2Fnavigating-dark-mode-trend%2Fthumbnail.webp?alt=media&token=ba740e3e-4ff7-4321-a7f9-f7e876409a8a&_gl=1*1tospw6*_ga*MTE1NDIyNjIyMi4xNjczMTk2MTM5*_ga_CW55HF8NVT*MTY4NjM5NDIzOS45MS4xLjE2ODYzOTYyOTMuMC4wLjA."></meta>
                <meta property="og:type" content="website"></meta>
                <meta property="og:title" content="Navigating the Dark Mode Trend: Designing Websites"></meta>
                <meta property="og:description" content="Discover the benefits of dark mode in web design and learn how to design websites that prioritize eye comfort. Navigate the dark mode trend with practical tips and techniques."></meta>
                <meta property="twitter:card" content="summary_large_image"></meta>
                <meta property="twitter:title" content="Navigating the Dark Mode Trend: Designing Websites"></meta>
                <meta property="twitter:description" content="Discover the benefits of dark mode in web design and learn how to design websites that prioritize eye comfort. Navigate the dark mode trend with practical tips and techniques."></meta>
              </Head>
            
              <MainNav />
          
              <main>
                <div id="thumbnail">
                  <img src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/blog%2Fnavigating-dark-mode-trend%2Fthumbnail.webp?alt=media&token=ba740e3e-4ff7-4321-a7f9-f7e876409a8a&_gl=1*1tospw6*_ga*MTE1NDIyNjIyMi4xNjczMTk2MTM5*_ga_CW55HF8NVT*MTY4NjM5NDIzOS45MS4xLjE2ODYzOTYyOTMuMC4wLjA." />
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
                      <h3>Yassen Shopov</h3>
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