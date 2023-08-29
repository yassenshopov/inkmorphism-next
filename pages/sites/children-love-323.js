
    import Head from "next/head";
    import { useEffect } from "react";
  
    export default function Default() {

          useEffect(() => {
            const root = document.documentElement;
            root.style.setProperty("--scrollbarThumb", "#0b0a0a");
            root.style.setProperty("--scrollbarTrack", "#121212");

            try {
              let main = document.querySelector("main.published");
              for (let i = 0; i < main.children.length; i++) {
                main.children[i].style.color = getContrastYIQfromBG(
                  window.getComputedStyle(main.children[i])[
                    "background-color"
                  ]
                );
              }
            } catch (err) {
              console.log(err);
            }
          }, []);
          
          function getContrastYIQfromBG(rgbColor) {
            // Extracting the individual color components from the RGB format
            var rgbValues = rgbColor.substring(5, rgbColor.length - 1).split(",");
            var r = parseInt(rgbValues[0].trim());
            var g = parseInt(rgbValues[1].trim());
            var b = parseInt(rgbValues[2].trim());
        
            // Calculating YIQ value
            var yiq = (r * 299 + g * 587 + b * 114) / 1000;
            return yiq >= 128 ? "var(--colorDark)" : "var(--colorLight)";
          }

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
            
            <section
              key="2"
              className="imgAndTxt reverseHorizontal"
            >
              <div className="txtWrapper">
                <h2>undefined</h2>
                <p>Example 1</p>
              </div>
              <div className="imgWrapper">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fchildren-love-323%2FcnEggvJNLfEOAo6N.png?alt=media&token=913de641-50f9-423e-ba63-0fac73904dc4"
                  draggable="false"
                  loading="eager"
                />
              </div>
            </section>
            
              <section className="grid3 ">
                <h2
                >
                  undefined
                </h2>
                <div className="grid">
                  <article>
                    <div className="imgWrapper">
                      <img src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-default%2Fwebsite-default%2Fgrid3_img1.png?alt=media&token=73bdb872-b2dd-4413-845c-4f075cf38af6" draggable="false" loading="eager"/>
                    </div>
                    <p
                    >
                      This is your new Grid3 section.
                    </p>
                  </article>
                  <article>
                    <div className="imgWrapper">
                      <img src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-default%2Fwebsite-default%2Fgrid3_img2.png?alt=media&token=efa0ed56-6352-4415-858c-a4a861b7cb0a" draggable="false" loading="eager"/>
                    </div>
                    <p
                    >
                      This is your new Grid3 section.
                    </p>
                  </article>
                  <article>
                    <div className="imgWrapper">
                      <img src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-default%2Fwebsite-default%2Fgrid3_img3.png?alt=media&token=a6a99aef-0947-4847-8ed1-979fadc2f5b3" draggable="false" loading="eager"/>
                    </div>
                    <p
                    >
                      This is your new Grid3 section.
                    </p>
                  </article>
                </div>
              </section>
              
              <section className="grid3 ">
                <h2
                >
                  undefined
                </h2>
                <div className="grid">
                  <article>
                    <div className="imgWrapper">
                      <img src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fchildren-love-323%2Fm8Mg3Td2JBkMyi15.png?alt=media&token=ad0a5ea8-bc5f-43e9-91d1-0ed68483ea9c" draggable="false" loading="lazy"/>
                    </div>
                    <p
                    >
                      This is your new Grid3 section.klm;l
                    </p>
                  </article>
                  <article>
                    <div className="imgWrapper">
                      <img src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fchildren-love-323%2F7cQcDuz28Vazf1aq.png?alt=media&token=432e53d0-4cbd-4b9f-9541-ce0b87f4f074" draggable="false" loading="lazy"/>
                    </div>
                    <p
                    >
                      This is your new Grid3 section.555
                    </p>
                  </article>
                  <article>
                    <div className="imgWrapper">
                      <img src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fchildren-love-323%2FqfdTEmQa3SphrKhs.png?alt=media&token=d4cba67b-76e0-4130-88c8-7d4bf4c1e162" draggable="false" loading="lazy"/>
                    </div>
                    <p
                    >
                      Thi75s is youdsfdsfdsfdsfsr new Grid3 section.
                    </p>
                  </article>
                </div>
              </section>
              
              <section className="grid3 ">
                <h2
                >
                  undefined
                </h2>
                <div className="grid">
                  <article>
                    <div className="imgWrapper">
                      <img src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-default%2Fwebsite-default%2FimgOnly.png?alt=media&token=ec1b1d09-f378-4223-8f47-13e6469d5ebb" draggable="false" loading="lazy"/>
                    </div>
                    <p
                    >
                      This is your new Grid3 section.
                    </p>
                  </article>
                  <article>
                    <div className="imgWrapper">
                      <img src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fchildren-love-323%2FJCbM7BuQHs4uiIUZ.png?alt=media&token=07f823df-df8b-49f2-a61b-73217a24244f" draggable="false" loading="lazy"/>
                    </div>
                    <p
                    >
                      This is your new Grid3 section.
                    </p>
                  </article>
                  <article>
                    <div className="imgWrapper">
                      <img src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-default%2Fwebsite-default%2FimgOnly.png?alt=media&token=ec1b1d09-f378-4223-8f47-13e6469d5ebb" draggable="false" loading="lazy"/>
                    </div>
                    <p
                    >
                      This is your new Grid3 section.
                    </p>
                  </article>
                </div>
              </section>
              
            <section
              key="7"
              className="imgAndTxt reverseHorizontal"
            >
              <div className="txtWrapper">
                <h2>undefined</h2>
                <p>Example 2askdla</p>
              </div>
              <div className="imgWrapper">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fchildren-love-323%2F3gwGkuFJrBmk4Bio.png?alt=media&token=c429d0e1-298c-4b9f-bc13-40d9017a6df1"
                  draggable="false"
                  loading="lazy"
                />
              </div>
            </section>
            
            <section
              key="8"
              className="imgAndTxt reverseHorizontal"
            >
              <div className="txtWrapper">
                <h2>undefined</h2>
                <p>This is your new ImgNTxt adassection.</p>
              </div>
              <div className="imgWrapper">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fchildren-love-323%2F0J25GB7VSJvILCsL.png?alt=media&token=7c1a9ca1-42f2-4bee-bb94-9229e9bc483c"
                  draggable="false"
                  loading="lazy"
                />
              </div>
            </section>
            
            <section
              key="9"
              className="imgAndTxt reverseHorizontal"
            >
              <div className="txtWrapper">
                <h2>undefined</h2>
                <p>This is your new ImgNTxt section.</p>
              </div>
              <div className="imgWrapper">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fchildren-love-323%2F0rPlA478EdnArTjh.png?alt=media&token=065bec95-e887-448d-b53a-84121c818ab1"
                  draggable="false"
                  loading="lazy"
                />
              </div>
            </section>
            
            <footer 
              className="footer"
              key="10"
            >
              <p id="watermark">
                <a href="https://inkmorphism.com" target="_blank">
                  Built with Inkmorphism <img src="../logoWh.webp" />
                </a>
              </p>
              <p>Copyright by Quarries LTD</p>
            </footer>
            
            </main>
          );
      }