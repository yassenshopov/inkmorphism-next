
    import Head from "next/head";
    import { useEffect } from "react";
  
    export default function Default() {

          useEffect(() => {
            const root = document.documentElement;
            root.style.setProperty("--scrollbarThumb", "#02000a");
            root.style.setProperty("--scrollbarTrack", "#121212");
          }, []);

          return (
            <main
              className={"simple published"}
              style={{
                "--color1": "#02000a",
                "--color2": "#0a0a0a",
                "--color3": "#79e16b",
                "--colorLight": "#fefefe",
                "--colorDark": "#ffffff",
                "--scrollbarThumb": "#02000a",
                "--scrollbarTrack": "#121212",
              }}
            >
            <Head>
              <title>Fuzzy Beats</title>
              <meta name="description" content="The description for your website"></meta>
              <link rel="icon" href="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fsign-master-810%2Flogo.png?alt=media&token=0ce9c75f-c506-41b2-b717-3075ba396e32" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta name="author" content="Meta Author"></meta>
              <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fsign-master-810%2Fthumbnail.png?alt=media&token=07afd689-332e-42b0-ae8e-5fad8565a83a"></meta>
              <meta property="og:type" content="website"></meta>
              <meta property="og:title" content="Fuzzy Beats"></meta>
              <meta
                property="og:description"
                content="The description for your website"
              ></meta>
              <meta property="twitter:card" content="summary_large_image"></meta>
              <meta property="twitter:title" content="Fuzzy Beats"></meta>
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
                <img src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fsign-master-810%2Flogo.png?alt=media&token=0ce9c75f-c506-41b2-b717-3075ba396e32" draggable="false" />
                <p>Pokemon Palette</p>
              </a>
            </nav>
            ,
            <section
              key="1"
              className="imgOnly "
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fsign-master-810%2FcDv5n2xoFnRH9I9e.png?alt=media&token=9b11a56f-49c9-4749-a4c5-569535e546c5"
                draggable="false"
                loading="eager"
              />
            </section>
            ,
            <section
              key="2"
              className="imgOnly "
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fsign-master-810%2FEJm3rSqRuhXPnkX9.png?alt=media&token=47723a66-98ec-4aac-a72e-406b90a7f574"
                draggable="false"
                loading="eager"
              />
            </section>
            ,
            <section
              key="3"
              className="imgOnly "
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fsign-master-810%2FYd6g9m6ZL4OBzJob.png?alt=media&token=af03894f-f1a1-4fab-90c2-300ac544e984"
                draggable="false"
                loading="eager"
              />
            </section>
            ,
            <section
              key="4"
              className="imgOnly "
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fsign-master-810%2FplVlbUWi4lVBq1hN.png?alt=media&token=c5750d3b-3d5c-47b2-bad3-384a89da1cc0"
                draggable="false"
                loading="lazy"
              />
            </section>
            ,
            <footer 
              className="footer"
              key="5"
            >
              <p id="watermark">
                <a href="https://inkmorphism.com" target="_blank">
                  Built with Inkmorphism 🖋️
                </a>
              </p>
              <p>Copyright by Pokemon Palette ©</p>
            </footer>
            
            </main>
          );
      }