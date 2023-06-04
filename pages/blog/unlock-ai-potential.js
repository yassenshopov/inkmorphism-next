
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
            const jsonData = await import('./authors/yassenshopov.json');
            setAuthorData(jsonData);
            const md = await import('./raw_files/unlock-ai-potential.md');
            setProcessedMD(<ReactMarkdown>{md.default.replace(
              "%placeholder%",
              "https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/blog%2Funlock-ai-potential%2Fthumbnail.webp?alt=media&token=c41a78da-a3ae-44c9-837c-770f9cf29085&_gl=1*es9gy4*_ga*MTE1NDIyNjIyMi4xNjczMTk2MTM5*_ga_CW55HF8NVT*MTY4NTgxMjc5NS44Mi4xLjE2ODU4MTQwMDAuMC4wLjA."
            )}</ReactMarkdown>)
          } catch (err) {
            console.log(err);
          }
      };

          return (
            <div className={"Article"}>
              <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Maximizing SEO Potential with AI-Powered Website Builders</title>
                <meta name="author" content="Yassen Shopov"></meta>
                <meta name="description" content="Discover how AI-powered website builders can supercharge your SEO efforts. Unlock the full potential of search engine optimization with advanced automation." />
                <link rel="icon" href="/faviconWh.ico" />
                <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/blog%2Funlock-ai-potential%2Fthumbnail.webp?alt=media&token=c41a78da-a3ae-44c9-837c-770f9cf29085&_gl=1*es9gy4*_ga*MTE1NDIyNjIyMi4xNjczMTk2MTM5*_ga_CW55HF8NVT*MTY4NTgxMjc5NS44Mi4xLjE2ODU4MTQwMDAuMC4wLjA."></meta>
                <meta property="og:type" content="website"></meta>
                <meta property="og:title" content="Maximizing SEO Potential with AI-Powered Website Builders"></meta>
                <meta property="og:description" content="Discover how AI-powered website builders can supercharge your SEO efforts. Unlock the full potential of search engine optimization with advanced automation."></meta>
                <meta property="twitter:card" content="summary_large_image"></meta>
                <meta property="twitter:title" content="Maximizing SEO Potential with AI-Powered Website Builders"></meta>
                <meta property="twitter:description" content="Discover how AI-powered website builders can supercharge your SEO efforts. Unlock the full potential of search engine optimization with advanced automation."></meta>
              </Head>
            
              <MainNav />
          
              <main>
                <div id="thumbnail">
                  <img src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/blog%2Funlock-ai-potential%2Fthumbnail.webp?alt=media&token=c41a78da-a3ae-44c9-837c-770f9cf29085&_gl=1*es9gy4*_ga*MTE1NDIyNjIyMi4xNjczMTk2MTM5*_ga_CW55HF8NVT*MTY4NTgxMjc5NS44Mi4xLjE2ODU4MTQwMDAuMC4wLjA." />
                </div>
                <article id="article">{
                  processedMD
                }
                  <section id="authorProfile">
                    <div id="authorProfilePic">
                      <img loading="lazy" src={authorData.authorProfilePic} />
                    </div>
                    <div id="authorProfileInfo">
                      <h3><em>Yassen Shopov</em></h3>
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
      }