
    import Head from "next/head";
    import { useEffect } from "react";
  
    export default function Default() {

          useEffect(() => {
            const root = document.documentElement;
            root.style.setProperty("--scrollbarThumb", "#8fffb8");
            root.style.setProperty("--scrollbarTrack", "#121212");
          }, []);

          return (
            <main
              className={"skeletal published"}
              style={{
                "--color1": "#8fffb8",
                "--color2": "#fdff80",
                "--color3": "#fcffe5",
                "--colorLight": "#ffffff",
                "--colorDark": "#0a0000",
                "--scrollbarThumb": "#8fffb8",
                "--scrollbarTrack": "#121212",
              }}
            >
            <Head>
              <title>Inkmorphism - Your Website</title>
              <meta name="description" content="The description for your website"></meta>
              <link rel="icon" href="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fmusic-point-595%2Flogo.png?alt=media&token=b601d1f8-8708-4c89-b8f5-8d75f2f1c164" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta name="author" content="Meta Author"></meta>
              <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fmusic-point-595%2Fthumbnail.png?alt=media&token=667a1542-8de7-45b2-ae39-520667a9af22"></meta>
              <meta property="og:type" content="website"></meta>
              <meta property="og:title" content="Inkmorphism - Your Website"></meta>
              <meta
                property="og:description"
                content="The description for your website"
              ></meta>
              <meta property="twitter:card" content="summary_large_image"></meta>
              <meta property="twitter:title" content="Inkmorphism - Your Website"></meta>
              <meta
                property="twitter:description"
                content="The description for your website"
              ></meta>
            </Head>    
              
            <nav 
              className="nav" 
              key="0"
            >
              <a href="" id="navLogo" className="noSelect">
                <img src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fmusic-point-595%2Flogo.png?alt=media&token=b601d1f8-8708-4c89-b8f5-8d75f2f1c164" draggable="false" />
                <p>Leafy Summer</p>
              </a>
            </nav>
            ,
            <section
              key="1"
              className="imgAndTxt reverseHorizontal"
            >
              <p>Bread section #1</p>
              <img
                src="https://cdn.discordapp.com/ephemeral-attachments/1062880104792997970/1090657787555610735/midjourney_bread_2d_minimalism_anime_style_realism_afd91681-d51d-4612-8322-0a5b2bb6dd20.png"
                draggable="false"
                loading="eager"
              />
            </section>
            ,
            <section
              key="2"
              className="imgAndTxt reverseHorizontal"
            >
              <p>Bread section #2</p>
              <img
                src="https://cdn.discordapp.com/ephemeral-attachments/1062880104792997970/1090657787555610735/midjourney_bread_2d_minimalism_anime_style_realism_afd91681-d51d-4612-8322-0a5b2bb6dd20.png"
                draggable="false"
                loading="eager"
              />
            </section>
            
            </main>
          );
      }