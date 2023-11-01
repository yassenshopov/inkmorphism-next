
    import Head from "next/head";
    import { useEffect } from "react";
  
    export default function Default() {

          useEffect(() => {
            const root = document.documentElement;
            root.style.setProperty("--scrollbarThumb", "#01020e");
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
              className={"industrial published"}
              style={{
                "--color1": "#01020e",
                "--color2": "#f0f5f4",
                "--color3": "#667599",
                "--colorLight": "#fefefe",
                "--colorDark": "#121212",
                "--scrollbarThumb": "#01020e",
                "--scrollbarTrack": "#121212",
              }}
            >
            <Head>
              <title>Test website</title>
              <meta name="description" content="Explore our comprehensive test website, designed for conducting various tests. Test with ease and precision. Start testing today! 🌟"></meta>
              <link rel="icon" href="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-OFr6W9XKn6ZJAWnCySLWXuzZbZu1%2Flips-happy-982%2Flogo.png?alt=media&token=645d34e4-96b6-465e-949d-777c5e1342ea" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta name="author" content="Meta Author"></meta>
              <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-OFr6W9XKn6ZJAWnCySLWXuzZbZu1%2Flips-happy-982%2Fthumbnail.png?alt=media&token=dfffb45b-166f-4def-81bf-5999dbf8e1cb"></meta>
              <meta property="og:type" content="website"></meta>
              <meta property="og:title" content="Test website"></meta>
              <meta
                property="og:description"
                content="Explore our comprehensive test website, designed for conducting various tests. Test with ease and precision. Start testing today! 🌟"
              ></meta>
              <meta property="twitter:card" content="summary_large_image"></meta>
              <meta property="twitter:title" content="Test website"></meta>
              <meta
                property="twitter:description"
                content="Explore our comprehensive test website, designed for conducting various tests. Test with ease and precision. Start testing today! 🌟"
              ></meta>
            </Head>    
              
            <nav 
              className="nav" 
              key="0"
            >
              <a href="" id="navLogo" className="noSelect">
                <img src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-OFr6W9XKn6ZJAWnCySLWXuzZbZu1%2Flips-happy-982%2Flogo.png?alt=media&token=645d34e4-96b6-465e-949d-777c5e1342ea" draggable="false" />
                <p>Test Website</p>
              </a>
            </nav>
            
            <section
              key="1"
              className="imgAndTxt directHorizontal"
            >
              <div className="txtWrapper">
                <h2>Test section</h2>
                <p>A test section</p>
              </div>
              <div className="imgWrapper">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-OFr6W9XKn6ZJAWnCySLWXuzZbZu1%2Flips-happy-982%2FfG9KQidlX8pLYu8P.png?alt=media&token=e67e813f-5eed-419f-874c-69fa7f9a977b"
                  draggable="false"
                  loading="eager"
                />
              </div>
            </section>
            
              <section className="grid3 ">
                <h2
                >
                  Pokemon Palette
                </h2>
                <div className="grid">
                  <article>
                    <div className="imgWrapper">
                      <img src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-OFr6W9XKn6ZJAWnCySLWXuzZbZu1%2Flips-happy-982%2FY6Xmoh1RBz8Id56w.png?alt=media&token=75b6bb64-8cd0-40dd-8ead-395ee3a4a41f" draggable="false" loading="eager"/>
                    </div>
                    <p
                    >
                      Metagross
                    </p>
                  </article>
                  <article>
                    <div className="imgWrapper">
                      <img src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-OFr6W9XKn6ZJAWnCySLWXuzZbZu1%2Flips-happy-982%2FkqY1PTgMLhjgYPlw.png?alt=media&token=647c6c98-5db5-4fdf-82b7-2702733a6171" draggable="false" loading="eager"/>
                    </div>
                    <p
                    >
                      Zekrom
                    </p>
                  </article>
                  <article>
                    <div className="imgWrapper">
                      <img src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-OFr6W9XKn6ZJAWnCySLWXuzZbZu1%2Flips-happy-982%2FuzzxdjUeeO0MbZUM.png?alt=media&token=98fc302e-6744-4098-9e23-39c3cc640796" draggable="false" loading="eager"/>
                    </div>
                    <p
                    >
                      Iron-Thorns
                    </p>
                  </article>
                </div>
              </section>
              
            <footer 
              className="footer"
              key="3"
            >
              <p id="watermark">
                <a href="https://inkmorphism.com" target="_blank">
                  Built with Inkmorphism <img src="../logoWh.webp" />
                </a>
              </p>
              <p>Copyright by Test Website ©</p>
            </footer>
            
            </main>
          );
      }