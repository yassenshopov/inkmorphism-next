
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
              className={"skeletal published"}
              style={{
                "--color1": "#ffffff",
                "--color2": "#ffffff",
                "--color3": "#1eff00",
                "--colorLight": "#ffffff",
                "--colorDark": "#000000",
                "--scrollbarThumb": "#ffffff",
                "--scrollbarTrack": "#121212",
              }}
            >
            <Head>
              <title>Dragon's Den</title>
              <meta name="description" content="The description for your website"></meta>
              <link rel="icon" href="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fshall-bark-474%2Flogo.png?alt=media&token=ab62a6c5-6114-441b-81d2-d632694356e6" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta name="author" content="Meta Author"></meta>
              <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fshall-bark-474%2Fthumbnail.png?alt=media&token=81f9fb8a-dd2d-45e2-989c-9ed9be12b1c4"></meta>
              <meta property="og:type" content="website"></meta>
              <meta property="og:title" content="Dragon's Den"></meta>
              <meta
                property="og:description"
                content="The description for your website"
              ></meta>
              <meta property="twitter:card" content="summary_large_image"></meta>
              <meta property="twitter:title" content="Dragon's Den"></meta>
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
                <img src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fshall-bark-474%2Flogo.png?alt=media&token=ab62a6c5-6114-441b-81d2-d632694356e6" draggable="false" />
                <p>Dragon's Cave</p>
              </a>
            </nav>
            
            <section
              key="1"
              className="imgAndTxt reverseHorizontal"
            >
              <div className="txtWrapper">
                <h2>undefined</h2>
                <p>This is your new ImgNTxt section.</p>
              </div>
              <div className="imgWrapper">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fshall-bark-474%2FEv16tHJ1oDuDFWkI.png?alt=media&token=da942497-6f8d-4871-a5b3-611b79ba83cf"
                  draggable="false"
                  loading="eager"
                />
              </div>
            </section>
            
            <section
              key="2"
              className="imgAndTxt directHorizontal"
            >
              <div className="txtWrapper">
                <h2>undefined</h2>
                <p>This is your new ImgNTxt section.</p>
              </div>
              <div className="imgWrapper">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fshall-bark-474%2F0ztYFCHinR1Fr8P3.png?alt=media&token=11eed2f3-dbe0-4224-9947-64487a99979f"
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
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fshall-bark-474%2F1EhtVjciiqlFqisK.png?alt=media&token=878d26bc-5bed-4883-93e1-043bc2df5a2f"
                draggable="false"
                loading="eager"
              />
            </section>
            
            <section
              key="4"
              className="imgOnly "
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fshall-bark-474%2FerhtpH41sdJBpgnw.png?alt=media&token=62d4f033-a57c-42b2-b84d-6b08d2f05cd5"
                draggable="false"
                loading="lazy"
              />
            </section>
            
            <section
              key="5"
              className="imgOnly "
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fshall-bark-474%2FGZb4I7juvRCWjv6a.png?alt=media&token=cfc22125-2696-4613-b617-c63f2740ce40"
                draggable="false"
                loading="lazy"
              />
            </section>
            
            <section
              key="6"
              className="imgOnly "
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fshall-bark-474%2FI9C6RyF7IccdwsGu.png?alt=media&token=f6b9c11d-bb86-4de1-a37a-fd7e2d761907"
                draggable="false"
                loading="lazy"
              />
            </section>
            
            <section
              key="7"
              className="imgAndTxt reverseHorizontal"
            >
              <div className="txtWrapper">
                <h2>undefined</h2>
                <p>This is your new ImgNTxt section.</p>
              </div>
              <div className="imgWrapper">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fshall-bark-474%2FlEQiZmO3x85X5dKb.png?alt=media&token=cf5b3b7b-b217-4e0b-93ba-ecdea6372460"
                  draggable="false"
                  loading="lazy"
                />
              </div>
            </section>
            
            <section
              key="8"
              className="imgAndTxt directHorizontal"
            >
              <div className="txtWrapper">
                <h2>undefined</h2>
                <p>Age of Drakes</p>
              </div>
              <div className="imgWrapper">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fshall-bark-474%2F5i4fGxZt0IdF372U.png?alt=media&token=48d4be46-7c38-41d8-adc8-9d4a83a71ce2"
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
                <p>This is your new ImgNTxt sections.</p>
              </div>
              <div className="imgWrapper">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fshall-bark-474%2FDuxVkppDDHScYBUP.png?alt=media&token=627ebee0-9ad3-4454-a8e4-6482a9674401"
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
                  Built with Inkmorphism 🖋️
                </a>
              </p>
              <p>Copyright by DnD 2023</p>
            </footer>
            
            </main>
          );
      }