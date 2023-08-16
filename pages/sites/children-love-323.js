
    import Head from "next/head";
    import { useEffect } from "react";
  
    export default function Default() {

          useEffect(() => {
            const root = document.documentElement;
            root.style.setProperty("--scrollbarThumb", "#0b0a0a");
            root.style.setProperty("--scrollbarTrack", "#121212");
          }, []);

          return (
            <main
              className={"simple published"}
              style={{
                "--color1": "#0b0a0a",
                "--color2": "#e0e2ff",
                "--color3": "#000000",
                "--colorLight": "#fcfcfc",
                "--colorDark": "#121212",
                "--scrollbarThumb": "#0b0a0a",
                "--scrollbarTrack": "#121212",
              }}
            >
            <Head>
              <title>Your Website</title>
              <meta name="description" content="The description for your website"></meta>
              <link rel="icon" href="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fchildren-love-323%2Flogo.png?alt=media&token=5985477f-82e1-4470-9cd5-e5cfd2c23948" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta name="author" content="Meta Author"></meta>
              <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fchildren-love-323%2Fthumbnail.png?alt=media&token=dc99e3f0-bc95-4434-80bb-a146568ed75b"></meta>
              <meta property="og:type" content="website"></meta>
              <meta property="og:title" content="Your Website"></meta>
              <meta
                property="og:description"
                content="The description for your website"
              ></meta>
              <meta property="twitter:card" content="summary_large_image"></meta>
              <meta property="twitter:title" content="Your Website"></meta>
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
                <img src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fchildren-love-323%2Flogo.png?alt=media&token=5985477f-82e1-4470-9cd5-e5cfd2c23948" draggable="false" />
                <p>Quarries!</p>
              </a>
            </nav>
            ,,
            <section
              key="2"
              className="imgAndTxt reverseHorizontal"
            >
              <p>Example 1</p>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fchildren-love-323%2FcnEggvJNLfEOAo6N.png?alt=media&token=913de641-50f9-423e-ba63-0fac73904dc4"
                draggable="false"
                loading="eager"
              />
            </section>
            ,,,,,
            <section
              key="7"
              className="imgAndTxt reverseHorizontal"
            >
              <p>Example 2askdla</p>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fchildren-love-323%2F3gwGkuFJrBmk4Bio.png?alt=media&token=c429d0e1-298c-4b9f-bc13-40d9017a6df1"
                draggable="false"
                loading="lazy"
              />
            </section>
            ,
            <section
              key="8"
              className="imgAndTxt reverseHorizontal"
            >
              <p>This is your new ImgNTxt adassection.</p>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fchildren-love-323%2F0J25GB7VSJvILCsL.png?alt=media&token=7c1a9ca1-42f2-4bee-bb94-9229e9bc483c"
                draggable="false"
                loading="lazy"
              />
            </section>
            ,
            <section
              key="9"
              className="imgAndTxt reverseHorizontal"
            >
              <p>This is your new ImgNTxt section.</p>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fchildren-love-323%2F0rPlA478EdnArTjh.png?alt=media&token=065bec95-e887-448d-b53a-84121c818ab1"
                draggable="false"
                loading="lazy"
              />
            </section>
            ,
            <footer 
              className="footer"
              key="10"
            >
              <p id="watermark">
                <a href="https://inkmorphism.com" target="_blank">
                  Built with Inkmorphism 🖋️
                </a>
              </p>
              <p>Copyright by Quarries LTD</p>
            </footer>
            
            </main>
          );
      }