
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
            const md = await import('./raw_files/5-web-design-trends-for-2023.md');
            setProcessedMD(<ReactMarkdown>{md.default.replace(
              "%placeholder%",
              "https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/blog%2F5-web-design-trends-for-2023%2F5-web-design-trends-for-2023.webp?alt=media&token=10a6fab6-0e14-4c6a-b6da-21e3bc37f839&_gl=1*1dhqw7*_ga*MTE1NDIyNjIyMi4xNjczMTk2MTM5*_ga_CW55HF8NVT*MTY4NjIxNjA3Ny44OS4xLjE2ODYyMTYxMzIuMC4wLjA."
            )}</ReactMarkdown>)
          } catch (err) {
            console.log(err);
          }
      };

          return (
            <div className={"Article"}>
              <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Futuristic Designs: Exploring 5 Next-Level Web Design Trends in 2023</title>
                <meta name="author" content="Yassen Shopov"></meta>
                <meta name="description" content="Unveil the future of web design with 5 cutting-edge trends for 2023. Dive into futuristic designs that redefine online experiences." />
                <link rel="icon" href="/faviconWh.ico" />
                <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/blog%2F5-web-design-trends-for-2023%2F5-web-design-trends-for-2023.webp?alt=media&token=10a6fab6-0e14-4c6a-b6da-21e3bc37f839&_gl=1*1dhqw7*_ga*MTE1NDIyNjIyMi4xNjczMTk2MTM5*_ga_CW55HF8NVT*MTY4NjIxNjA3Ny44OS4xLjE2ODYyMTYxMzIuMC4wLjA."></meta>
                <meta property="og:type" content="website"></meta>
                <meta property="og:title" content="Futuristic Designs: Exploring 5 Next-Level Web Design Trends in 2023"></meta>
                <meta property="og:description" content="Unveil the future of web design with 5 cutting-edge trends for 2023. Dive into futuristic designs that redefine online experiences."></meta>
                <meta property="twitter:card" content="summary_large_image"></meta>
                <meta property="twitter:title" content="Futuristic Designs: Exploring 5 Next-Level Web Design Trends in 2023"></meta>
                <meta property="twitter:description" content="Unveil the future of web design with 5 cutting-edge trends for 2023. Dive into futuristic designs that redefine online experiences."></meta>
              </Head>
            
              <MainNav />
          
              <main>
                <div id="thumbnail">
                  <img src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/blog%2F5-web-design-trends-for-2023%2F5-web-design-trends-for-2023.webp?alt=media&token=10a6fab6-0e14-4c6a-b6da-21e3bc37f839&_gl=1*1dhqw7*_ga*MTE1NDIyNjIyMi4xNjczMTk2MTM5*_ga_CW55HF8NVT*MTY4NjIxNjA3Ny44OS4xLjE2ODYyMTYxMzIuMC4wLjA." />
                </div>
                <article id="article">{
                  processedMD
                }
                </article>
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
              </main>
          
              <MainFooter />
            </div>
          );
      }