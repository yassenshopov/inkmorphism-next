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
                  <section id="authorProfile">
                    <div id="authorProfilePic">
                      <img loading="lazy" src={authorData.authorProfilePic} />
                    </div>
                    <div id="authorProfileInfo">
                      <h3><em>${item.author}</em></h3>
                      <p><em>{authorData.authorBio}</em></p>
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
                </article>
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
