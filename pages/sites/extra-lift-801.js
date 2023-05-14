
    import Head from "next/head";
    import { useEffect } from "react";
  
    export default function Default() {

          useEffect(() => {
            const root = document.documentElement;
            root.style.setProperty("--scrollbarThumb", "#4f7a28");
            root.style.setProperty("--scrollbarTrack", "#121212");
          }, []);

          return (
            <main
              className={"skeletal published"}
              style={{
                "--color1": "#4f7a28",
                "--color2": "#e4ef65",
                "--color3": "#79e16b",
                "--colorLight": "#fefefe",
                "--colorDark": "#121212",
                "--scrollbarThumb": "#4f7a28",
                "--scrollbarTrack": "#121212",
              }}
            >
            <Head>
              <title>The Test Chunk</title>
              <meta name="description" content="The description for your website"></meta>
              <link rel="icon" href="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-x3tIpaOWjwXF47Ccgx60vqe1c6i1%2Fextra-lift-801%2Flogo.png?alt=media&token=1b32ad7c-8e13-4723-8091-e9389c1cffd6" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta name="author" content="Meta Author"></meta>
              <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-x3tIpaOWjwXF47Ccgx60vqe1c6i1%2Fextra-lift-801%2Fthumbnail.png?alt=media&token=b4f15d3c-0342-4c1f-a2fe-a087f36293f4"></meta>
              <meta property="og:type" content="website"></meta>
              <meta property="og:title" content="The Test Chunk"></meta>
              <meta
                property="og:description"
                content="The description for your website"
              ></meta>
              <meta property="twitter:card" content="summary_large_image"></meta>
              <meta property="twitter:title" content="The Test Chunk"></meta>
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
                <img src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-x3tIpaOWjwXF47Ccgx60vqe1c6i1%2Fextra-lift-801%2Flogo.png?alt=media&token=1b32ad7c-8e13-4723-8091-e9389c1cffd6" draggable="false" />
                <p>The Test Chunk</p>
              </a>
            </nav>
            ,
            <section
              key="1"
              className="txtOnly reverseHorizontal"
            >
              <p>Test stuff</p>
            </section>
            ,
            <section
              key="2"
              className="imgOnly "
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-x3tIpaOWjwXF47Ccgx60vqe1c6i1%2Fextra-lift-801%2FR2FSvye5iesCIGxp.png?alt=media&token=1cf46fe9-6e61-44f7-aeff-7625798c249f"
                draggable="false"
                loading="eager"
              />
            </section>
            ,
            <section
              key="3"
              className="txtOnly reverseHorizontal"
            >
              <p>Hello to your new section</p>
            </section>
            ,
            <footer 
              className="footer"
              key="4"
            >
              <p id="watermark">
                <a href="https://inkmorphism.com" target="_blank">
                  Built with Inkmorphism 🖋️
                </a>
              </p>
              <p>Copyright by B0b0 D</p>
            </footer>
            
            </main>
          );
      }