
    import Head from "next/head";
    import { useEffect } from "react";
  
    export default function Default() {

          useEffect(() => {
            const root = document.documentElement;
            root.style.setProperty("--scrollbarThumb", "#ffffff");
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
                "--color1": "#ffffff",
                "--color2": "#ffffeb",
                "--color3": "#79e16b",
                "--colorLight": "#fefefe",
                "--colorDark": "#121212",
                "--scrollbarThumb": "#ffffff",
                "--scrollbarTrack": "#121212",
              }}
            >
            <Head>
              <title>Fuzzy Beats</title>
              <meta name="description" content="The description for your website"></meta>
              <link rel="icon" href="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Ffive-silk-538%2Flogo.png?alt=media&token=d0a10bac-343f-4681-b949-c1dca8b49b18" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta name="author" content="Meta Author"></meta>
              <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Ffive-silk-538%2Fthumbnail.png?alt=media&token=3045756c-6565-4b29-af11-34ff508c4e87"></meta>
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
                <img src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Ffive-silk-538%2Flogo.png?alt=media&token=d0a10bac-343f-4681-b949-c1dca8b49b18" draggable="false" />
                <p>Fuzzy Beats</p>
              </a>
            </nav>
            
            <section
              key="1"
              className="imgOnly "
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Ffive-silk-538%2FKSZE1kU2Hftu3zWy.png?alt=media&token=63835566-2954-4973-8cd1-f8be01d9e2af"
                draggable="false"
                loading="eager"
              />
            </section>
            
            <section
              key="2"
              className="imgAndTxt directHorizontal"
            >
              <div className="txtWrapper">
                <h2>undefined</h2>
                <p>Get ready to hop along with Fuzzy Beats at their high-energy bunny bash!</p>
              </div>
              <div className="imgWrapper">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fminerals-locate-276%2FsrcFiles%2FimgPlaceholder.png?alt=media&token=f3dbf650-3ac2-4644-9047-a207ab6f80f9"
                  draggable="false"
                  loading="eager"
                />
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
              <p>Copyright by Fuzzy Beats ©</p>
            </footer>
            
            </main>
          );
      }