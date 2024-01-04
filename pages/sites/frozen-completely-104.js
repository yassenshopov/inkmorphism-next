
    import Head from "next/head";
    import { useEffect } from "react";
  
    export default function Default() {

          useEffect(() => {
            const root = document.documentElement;
            root.style.setProperty("--scrollbarThumb", "#1a1919");
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
                "--color1": "#1a1919",
                "--color2": "#f7f7f7",
                "--color3": "#1c01e9",
                "--colorLight": "#ebebeb",
                "--colorDark": "#454545",
                "--scrollbarThumb": "#1a1919",
                "--scrollbarTrack": "#121212",
              }}
            >
            <Head>
              <title>Order Coffee & Brunch at Our Hip House - The Hero Clock Café</title>
              <meta name="description" content="Iron Brewery: Your Brunch Oasis! Enjoy Heroic Coffee & More. Order Now for Clockwork Perfection. Elevate Your Day with Us!"></meta>
              <link rel="icon" href="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Ffrozen-completely-104%2Flogo.png?alt=media&token=3c761fb3-d741-44e2-9857-aa59391fb68c" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta name="author" content="Meta Author"></meta>
              <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Ffrozen-completely-104%2Fthumbnail.png?alt=media&token=f495929d-e215-4d54-966c-cc9ab65a855a"></meta>
              <meta property="og:type" content="website"></meta>
              <meta property="og:title" content="Order Coffee & Brunch at Our Hip House - The Hero Clock Café"></meta>
              <meta
                property="og:description"
                content="Iron Brewery: Your Brunch Oasis! Enjoy Heroic Coffee & More. Order Now for Clockwork Perfection. Elevate Your Day with Us!"
              ></meta>
              <meta property="twitter:card" content="summary_large_image"></meta>
              <meta property="twitter:title" content="Order Coffee & Brunch at Our Hip House - The Hero Clock Café"></meta>
              <meta
                property="twitter:description"
                content="Iron Brewery: Your Brunch Oasis! Enjoy Heroic Coffee & More. Order Now for Clockwork Perfection. Elevate Your Day with Us!"
              ></meta>
            </Head>    
              
            <nav 
              className="nav" 
              key="0"
            >
              <a href="" id="navLogo" className="noSelect">
                <img src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Ffrozen-completely-104%2Flogo.png?alt=media&token=3c761fb3-d741-44e2-9857-aa59391fb68c" draggable="false" />
                <p>Iron Brew</p>
              </a>
            </nav>
            
            <section
              key="1"
              className="hero"
            >
              <div className="txtWrapper">
                <h2>The coffee place for coffee people</h2>
                <p>"Iron Brew" - the café that takes industrial design and brings it to you in the form of a flavourful cup of coffee</p>
                <p className="cta"
                  onClick={() => {
                    window.scrollTo({
                      top: window.innerHeight / 0.75,
                      behavior: "smooth",
                    });
                  }}
                >Explore</p>
              </div>
              <div className="imgWrapper">
                <img src='https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-default%2Fwebsite-default%2Fhero_img.png?alt=media&token=cd992c4a-c6c3-4a68-bed7-e0efdeba8df5'
                draggable="false"
                loading="eager"
                />
              </div>
            </section>
        
            <section
              key="2"
              className="txtOnly reverseHorizontal"
            >
              <p>Hello to your new section</p>
            </section>
            
            <section
              key="3"
              className="imgAndTxt reverseHorizontal"
            >
              <div className="txtWrapper">
                <h2>Heading</h2>
                <p>This is your new ImgNTxt section.</p>
              </div>
              <div className="imgWrapper">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-default%2Fwebsite-default%2FimgAndTxt.png?alt=media&token=754fc70d-7640-4975-9077-6d46b953d15b"
                  draggable="false"
                  loading="eager"
                />
              </div>
            </section>
            
              <section className="grid2 ">
                <h2
                >
                  undefined
                </h2>
                <div className="grid">
                  <article>
                    <div className="imgWrapper">
                      <img src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Ffrozen-completely-104%2FZ53gqTDDsaBIelxl.png?alt=media&token=b4478150-1e09-45e0-8251-63d9a7008b22" draggable="false" loading="lazy"/>
                    </div>
                    <p
                    >
                      This is your new Grid2 section.
                    </p>
                  </article>
                  <article>
                    <div className="imgWrapper">
                      <img src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-default%2Fwebsite-default%2Fgrid3_img2.png?alt=media&token=efa0ed56-6352-4415-858c-a4a861b7cb0a" draggable="false" loading="lazy"/>
                    </div>
                    <p
                    >
                      This is your new Grid2 section.
                    </p>
                  </article>
                </div>
              </section>
              
            <section
              key="5"
              className="imgOnly "
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Ffrozen-completely-104%2FI0WLE7oRF8KNRvAa.png?alt=media&token=f713a2b0-cbd4-4c7c-b434-660b5f186960"
                draggable="false"
                loading="lazy"
              />
            </section>
            
            <section
              key="6"
              className="imgAndTxt reverseHorizontal"
            >
              <div className="txtWrapper">
                <h2>About us</h2>
                <p>At The Iron Brew, our story began with a shared passion for quality, creativity, and a genuine love for the art of food and beverages. We embarked on a journey to blend these elements into an unforgettable dining experience that captures the essence of urban charm and culinary excellence.</p>
              </div>
              <div className="imgWrapper">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Ffrozen-completely-104%2FTuAfhalO3nhBJuGM.png?alt=media&token=a4c50096-5c0a-42b7-aebb-bc2bc4d1d36f"
                  draggable="false"
                  loading="lazy"
                />
              </div>
            </section>
            
              <section className="grid3 ">
                <h2
                >
                  What we offer:
                </h2>
                <div className="grid">
                  <article>
                    <div className="imgWrapper">
                      <img src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Ffrozen-completely-104%2F5HKEWtgyJV81CePK.png?alt=media&token=cc76ec04-2ede-495d-b51c-93abf874ddc3" draggable="false" loading="lazy"/>
                    </div>
                    <p
                    >
                      Try a cup of coffee from our rich roster - choose between Robusta, Cambodia, Ethiopia, Brazil, Peru.
                    </p>
                  </article>
                  <article>
                    <div className="imgWrapper">
                      <img src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Ffrozen-completely-104%2FRE9JpILOdEa1dj3N.png?alt=media&token=8134303e-b890-4ea4-8f82-f8ef1a162a89" draggable="false" loading="lazy"/>
                    </div>
                    <p
                    >
                      Check out our tasty Veg'n'Egg brunch sandwich!
                    </p>
                  </article>
                  <article>
                    <div className="imgWrapper">
                      <img src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Ffrozen-completely-104%2FSSNE7QiSIGjMiWBu.png?alt=media&token=c72e24d5-e910-4fc6-9f75-6f2a0840903a" draggable="false" loading="lazy"/>
                    </div>
                    <p
                    >
                      If you happen to prefer TEA over COFFEE - we got you covered as well!
                    </p>
                  </article>
                </div>
              </section>
              
            <section
              key="8"
              className="imgAndTxt directHorizontal"
            >
              <div className="txtWrapper">
                <h2>Our story</h2>
                <p>We take pride in being a place where friends gather, families bond, and individuals find solace in the company of good food and great company. Our journey is marked by the smiles of our satisfied customers, the laughter shared during lively conversations, and the moments that transform a meal into a cherished memory. The Iron Brew isn't just a cafe; it's a haven for those who seek authenticity, flavor, and a slice of the urban experience. Come, be a part of our story, and let us create lasting memories together.



















</p>
              </div>
              <div className="imgWrapper">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Ffrozen-completely-104%2Fpy676w1gcUuHkQ8q.png?alt=media&token=0bbbe8f2-c17c-469b-8c7b-bf0f4be525b2"
                  draggable="false"
                  loading="lazy"
                />
              </div>
            </section>
            
          <section className="maps">
            <h2>Visit us @ our London location:</h2>
            <div className="mapsWrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2481.926688116498!2d0.06028477670855494!3d51.53290447181915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a71ee354f153%3A0x671ad86d6a68536b!2sIron%20brew!5e0!3m2!1sbg!2sbg!4v1693293570490!5m2!1sbg!2sbg"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
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
              <p>Copyright by Iron Brews ©</p>
            </footer>
            
            </main>
          );
      }