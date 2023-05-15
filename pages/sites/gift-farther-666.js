
    import Head from "next/head";
    import { useEffect } from "react";
  
    export default function Default() {

          useEffect(() => {
            const root = document.documentElement;
            root.style.setProperty("--scrollbarThumb", "#ffffff");
            root.style.setProperty("--scrollbarTrack", "#121212");
          }, []);

          return (
            <main
              className={"skeletal published"}
              style={{
                "--color1": "#ffffff",
                "--color2": "#ffffff",
                "--color3": "#79e16b",
                "--colorLight": "#fefefe",
                "--colorDark": "#121212",
                "--scrollbarThumb": "#ffffff",
                "--scrollbarTrack": "#121212",
              }}
            >
            <Head>
              <title>Roll Your Way</title>
              <meta name="description" content="The description for your website"></meta>
              <link rel="icon" href="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fgift-farther-666%2Flogo.png?alt=media&token=e08244a9-02cb-4c61-8360-94c869a1ee94" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta name="author" content="Meta Author"></meta>
              <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-default%2Fwebsite-default%2Fthumbnail.png?alt=media&token=bf24a392-9096-4d28-a9b0-f9d7941f8e85"></meta>
              <meta property="og:type" content="website"></meta>
              <meta property="og:title" content="Roll Your Way"></meta>
              <meta
                property="og:description"
                content="The description for your website"
              ></meta>
              <meta property="twitter:card" content="summary_large_image"></meta>
              <meta property="twitter:title" content="Roll Your Way"></meta>
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
                <img src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fgift-farther-666%2Flogo.png?alt=media&token=e08244a9-02cb-4c61-8360-94c869a1ee94" draggable="false" />
                <p>Roll Your Ways</p>
              </a>
            </nav>
            ,
            <section
              key="1"
              className="txtOnly reverseHorizontal"
            >
              <p>Hello to your new section</p>
            </section>
            ,
            <section
              key="2"
              className="imgAndTxt reverseHorizontal"
            >
              <p>This is your new ImgNTxt section.</p>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-default%2Fwebsite-default%2FimgAndTxt.png?alt=media&token=754fc70d-7640-4975-9077-6d46b953d15b"
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
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-default%2Fwebsite-default%2FimgOnly.png?alt=media&token=ec1b1d09-f378-4223-8f47-13e6469d5ebb"
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
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fgift-farther-666%2FKi7AgJjkwprQpvNc.png?alt=media&token=7d726d19-b261-424a-84b6-7d0c79076293"
                draggable="false"
                loading="lazy"
              />
            </section>
            ,
            <section
              key="5"
              className="txtOnly reverseHorizontal"
            >
              <p>Hello to your new section! Here you can type whatever!</p>
            </section>
            ,
            <section
              key="6"
              className="imgOnly "
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-default%2Fwebsite-default%2FimgOnly.png?alt=media&token=ec1b1d09-f378-4223-8f47-13e6469d5ebb"
                draggable="false"
                loading="lazy"
              />
            </section>
            ,
            <section
              key="7"
              className="imgAndTxt reverseHorizontal"
            >
              <p>This is your new ImgNTxt section.</p>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fgift-farther-666%2FEV68ABNAI3hY2Ngh.png?alt=media&token=e668b7ae-03aa-48f2-9592-9d09d53aa9d2"
                draggable="false"
                loading="lazy"
              />
            </section>
            ,
            <section
              key="8"
              className="imgAndTxt reverseHorizontal"
            >
              <p>This is your new ImgNTxt section.</p>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fgift-farther-666%2FkfoYJMKNOIeJraOc.png?alt=media&token=afee015e-b1b3-4094-b775-b120407aaa7b"
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
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-default%2Fwebsite-default%2FimgAndTxt.png?alt=media&token=754fc70d-7640-4975-9077-6d46b953d15b"
                draggable="false"
                loading="lazy"
              />
            </section>
            ,
            <section
              key="10"
              className="imgOnly "
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fgift-farther-666%2F8GhZr7YaV0NpK7cU.png?alt=media&token=41016bbe-de4c-4ceb-85df-e00233991cef"
                draggable="false"
                loading="lazy"
              />
            </section>
            ,
            <footer 
              className="footer"
              key="11"
            >
              <p id="watermark">
                <a href="https://inkmorphism.com" target="_blank">
                  Built with Inkmorphism 🖋️
                </a>
              </p>
              <p>Copyright by Rollers Inc.</p>
            </footer>
            
            </main>
          );
      }