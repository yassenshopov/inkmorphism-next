
    import Head from "next/head";
    import { useEffect } from "react";
  
    export default function Default() {

          useEffect(() => {
            const root = document.documentElement;
            root.style.setProperty("--scrollbarThumb", "#ffe5e5");
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
                "--color1": "#ffe5e5",
                "--color2": "#ffa8a8",
                "--color3": "#158406",
                "--colorLight": "#ffe5e5",
                "--colorDark": "#140000",
                "--scrollbarThumb": "#ffe5e5",
                "--scrollbarTrack": "#121212",
              }}
            >
            <Head>
              <title>Your Website</title>
              <meta name="description" content="The description for your website"></meta>
              <link rel="icon" href="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-ALNvFdJ75LPwHkSuRsxig6ujMrs1%2Fwriter-people-349%2Flogo.png?alt=media&token=6b4c84f3-a4a8-4363-a8f1-1aab478bb47a" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta name="author" content="Meta Author"></meta>
              <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-ALNvFdJ75LPwHkSuRsxig6ujMrs1%2Fwriter-people-349%2Fthumbnail.png?alt=media&token=a1d2b47c-1a51-4408-80db-fa85d3768a67"></meta>
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
                <img src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-ALNvFdJ75LPwHkSuRsxig6ujMrs1%2Fwriter-people-349%2Flogo.png?alt=media&token=6b4c84f3-a4a8-4363-a8f1-1aab478bb47a" draggable="false" />
                <p>The Tangled Stories</p>
              </a>
            </nav>
            
            <section
              key="1"
              className="imgOnly "
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-ALNvFdJ75LPwHkSuRsxig6ujMrs1%2Fwriter-people-349%2Fu6mgkkvyA8uMphuL.png?alt=media&token=7abbaa88-7638-4e41-bf8b-006e0995922d"
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
                <p>This is text about some located minerals.</p>
              </div>
              <div className="imgWrapper">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-ALNvFdJ75LPwHkSuRsxig6ujMrs1%2Fwriter-people-349%2FFpt3q7occtSsT7ZZ.png?alt=media&token=0c7105f2-7b61-42eb-9315-b521be513534"
                  draggable="false"
                  loading="eager"
                />
              </div>
            </section>
            
            <section
              key="3"
              className="imgOnly "
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-ALNvFdJ75LPwHkSuRsxig6ujMrs1%2Fwriter-people-349%2FZlX7Efand0d7cUHA.png?alt=media&token=e8af3c9b-d5e6-4369-b179-8597921d7eab"
                draggable="false"
                loading="eager"
              />
            </section>
            
            <section
              key="4"
              className="imgOnly "
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-ALNvFdJ75LPwHkSuRsxig6ujMrs1%2Fwriter-people-349%2FHx3DoCV25tujx9vs.png?alt=media&token=a5d0940a-3136-472f-8702-683dfbcdc2ba"
                draggable="false"
                loading="lazy"
              />
            </section>
            
            <section
              key="5"
              className="imgOnly "
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-ALNvFdJ75LPwHkSuRsxig6ujMrs1%2Fwriter-people-349%2FFSAB1x0gzSdAKK1h.png?alt=media&token=801d8452-b679-4949-9d17-0bf61ba59699"
                draggable="false"
                loading="lazy"
              />
            </section>
            
            <section
              key="6"
              className="imgOnly "
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-ALNvFdJ75LPwHkSuRsxig6ujMrs1%2Fwriter-people-349%2FfBt8NznZvWNmtsWz.png?alt=media&token=8b28a5da-debe-4582-a358-a30b621693f2"
                draggable="false"
                loading="lazy"
              />
            </section>
            
            <footer 
              className="footer"
              key="7"
            >
              <p id="watermark">
                <a href="https://inkmorphism.com" target="_blank">
                  Built with Inkmorphism <img src="../logoWh.webp" />
                </a>
              </p>
              <p>Copyright by The Tangled Stories</p>
            </footer>
            
            </main>
          );
      }