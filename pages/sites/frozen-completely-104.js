
    import Head from "next/head";
    import { useEffect } from "react";
  
    export default function Default() {

          useEffect(() => {
            const root = document.documentElement;
            root.style.setProperty("--scrollbarThumb", "#f5f5f5");
            root.style.setProperty("--scrollbarTrack", "#121212");
          }, []);

          return (
            <main
              className={"industrial published"}
              style={{
                "--color1": "#f5f5f5",
                "--color2": "#171717",
                "--color3": "#79e16b",
                "--colorLight": "#ebebeb",
                "--colorDark": "#0e111a",
                "--scrollbarThumb": "#f5f5f5",
                "--scrollbarTrack": "#121212",
              }}
            >
            <Head>
              <title>Iron Brew - Crafting Urban Flavors, Forging Lasting Memories</title>
              <meta name="description" content="The description for your website"></meta>
              <link rel="icon" href="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Ffrozen-completely-104%2Flogo.png?alt=media&token=3c761fb3-d741-44e2-9857-aa59391fb68c" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta name="author" content="Meta Author"></meta>
              <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Ffrozen-completely-104%2Fthumbnail.png?alt=media&token=f495929d-e215-4d54-966c-cc9ab65a855a"></meta>
              <meta property="og:type" content="website"></meta>
              <meta property="og:title" content="Iron Brew - Crafting Urban Flavors, Forging Lasting Memories"></meta>
              <meta
                property="og:description"
                content="The description for your website"
              ></meta>
              <meta property="twitter:card" content="summary_large_image"></meta>
              <meta property="twitter:title" content="Iron Brew - Crafting Urban Flavors, Forging Lasting Memories"></meta>
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
                <img src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Ffrozen-completely-104%2Flogo.png?alt=media&token=3c761fb3-d741-44e2-9857-aa59391fb68c" draggable="false" />
                <p>Iron Brew</p>
              </a>
            </nav>
            ,,,
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
            ,,
            <section
              key="5"
              className="imgAndTxt reverseHorizontal"
            >
              <p>At The Iron Brew, our story began with a shared passion for quality, creativity, and a genuine love for the art of food and beverages. We embarked on a journey to blend these elements into an unforgettable dining experience that captures the essence of urban charm and culinary excellence.</p>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Ffrozen-completely-104%2F5ibYCtM9TrCesrPP.png?alt=media&token=4bc34f33-c935-4cf7-aa57-f724c7ab5a49"
                draggable="false"
                loading="lazy"
              />
            </section>
            ,
            <section
              key="6"
              className="imgAndTxt directHorizontal"
            >
              <p>At The Iron Brew, our story began with a shared passion for quality, creativity, and a genuine love for the art of food and beverages. We embarked on a journey to blend these elements into an unforgettable dining experience that captures the essence of urban charm and culinary excellence.</p>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Ffrozen-completely-104%2FVdKUhrKdNuAiXsI2.png?alt=media&token=ae3891e7-0698-49a1-9c1a-b175536d644c"
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
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Ffrozen-completely-104%2FPs0yzuSpA5Nj7vZE.png?alt=media&token=f9832d0a-91aa-46e7-a670-b9f9d8a977e3"
                draggable="false"
                loading="lazy"
              />
            </section>
            ,
            <footer 
              className="footer"
              key="8"
            >
              <p id="watermark">
                <a href="https://inkmorphism.com" target="_blank">
                  Built with Inkmorphism 🖋️
                </a>
              </p>
              <p>Copyright by Iron Brews ©</p>
            </footer>
            
            </main>
          );
      }