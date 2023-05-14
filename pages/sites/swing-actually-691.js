
    import Head from "next/head";
  
    export default function Default() {
          return (
            <main
              className={"skeletal published"}
              style={{
                "--color1": "#0f61e6",
                "--color2": "#ffffff",
                "--color3": "#79e16b",
                "--colorLight": "#fefefe",
                "--colorDark": "#121212"              
              }}
            >
            <Head>
              <title>Your Website</title>
              <meta name="description" content="The description for your website"></meta>
              <link rel="icon" href="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-default%2Fwebsite-default%2Flogo.png?alt=media&token=ba50553d-4f67-4d24-b909-e98e6585dad9" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta name="author" content="Meta Author"></meta>
              <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-default%2Fwebsite-default%2Fthumbnail.png?alt=media&token=bf24a392-9096-4d28-a9b0-f9d7941f8e85"></meta>
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
                <img src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-default%2Fwebsite-default%2Flogo.png?alt=media&token=ba50553d-4f67-4d24-b909-e98e6585dad9" draggable="false" />
                <p>Portfolio</p>
              </a>
            </nav>
            ,
            <section
              key="1"
              className="imgAndTxt reverseHorizontal"
            >
              <p>Magic</p>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fswing-actually-691%2FhWv2UsQyr1YdvxIW.png?alt=media&token=ce3671dc-dbe9-44e5-b116-dff040e29849"
                draggable="false"
                loading="eager"
              />
            </section>
            ,
            <section
              key="2"
              className="imgAndTxt directHorizontal"
            >
              <p>This is text about some located minerals. This is text about some located minerals. This is text about some located minerals. This is text about some located minerals.</p>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fminerals-locate-276%2FsrcFiles%2FimgPlaceholder.png?alt=media&token=f3dbf650-3ac2-4644-9047-a207ab6f80f9"
                draggable="false"
                loading="eager"
              />
            </section>
            ,
            <footer 
              className="footer"
              key="3"
            >
              <p id="watermark">
                <a href="https://inkmorphism.com" target="_blank">
                  Built with Inkmorphism 🖋️
                </a>
              </p>
              <p>Copyright by XYZ</p>
            </footer>
            
            </main>
          );
      }