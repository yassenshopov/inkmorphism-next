
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
              className={"simple published"}
              style={{
                "--color1": "#ffffff",
                "--color2": "#e0e2ff",
                "--color3": "#79e16b",
                "--colorLight": "#fefefe",
                "--colorDark": "#121212",
                "--scrollbarThumb": "#ffffff",
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
                <p>Quarries</p>
              </a>
            </nav>
            ,
            <section
              key="1"
              className="imgOnly "
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fchildren-love-323%2F4A4gAMNhlEpny5Tv.png?alt=media&token=ec75b842-7b31-4fb9-94b2-1b27206f8370"
                draggable="false"
                loading="eager"
              />
            </section>
            ,
            <section
              key="2"
              className="imgAndTxt reverseHorizontal"
            >
              <p>This is your new ImgNTxt section.</p>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fchildren-love-323%2Fn8ifmkE2HZQngrHC.png?alt=media&token=19df1cb0-22ab-4097-9079-f2dd496b8a80"
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
            <section
              key="4"
              className="imgAndTxt reverseHorizontal"
            >
              <p>This is your new ImgNTxt section.</p>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fchildren-love-323%2FbiZCMblvQP80WFFc.png?alt=media&token=24719f09-d0e3-49bf-b796-0279d44fc0af"
                draggable="false"
                loading="lazy"
              />
            </section>
            ,
            <section
              key="5"
              className="imgAndTxt reverseHorizontal"
            >
              <p>This is your new ImgNTxt section.</p>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fchildren-love-323%2F8Z8dThIL2mWh7rY6.png?alt=media&token=296ecaa8-7f24-4750-9c4e-28ee87ea3420"
                draggable="false"
                loading="lazy"
              />
            </section>
            ,
            <section
              key="6"
              className="imgAndTxt directHorizontal"
            >
              <p>This is text some located minerals.</p>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fchildren-love-323%2FLIDyng1i4VdYd9gs.png?alt=media&token=610f43db-07f9-465e-b48e-006c5b856ee6"
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
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fchildren-love-323%2F99Si52uFA2193U22.png?alt=media&token=f03ddc9e-8899-4f11-be14-c3794b8ee584"
                draggable="false"
                loading="lazy"
              />
            </section>
            ,
            <section
              key="8"
              className="imgOnly "
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fchildren-love-323%2FfIH2FODhl51LI66L.png?alt=media&token=de28d874-9c88-4ae4-a520-dd227f613686"
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
            <section
              key="10"
              className="imgOnly "
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fchildren-love-323%2FfUfWOpeO74cMZCFc.png?alt=media&token=05affd40-30d8-47c9-817c-ce4b0a8a38d4"
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
              <p>Copyright by Quarries LTD</p>
            </footer>
            
            </main>
          );
      }