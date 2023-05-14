
    import Head from "next/head";
  
    export default function Default() {
          return (
            <main
              className={"simple published"}
              style={{
                "--color1": "#ffffff",
                "--color2": "#ffffeb",
                "--color3": "#79e16b",
                "--colorLight": "#fefefe",
                "--colorDark": "#121212"              
              }}
            >
            <Head>
              <title>Fuzzy Beats</title>
              <meta name="description" content="The description for your website"></meta>
              <link rel="icon" href="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-PTP01LUe7wQiQrvtPccCjdLnRY33%2Fprevious-sport-186%2Flogo.png?alt=media&token=b92cd4c1-2eb4-4d13-8105-6acb7e96ece4" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta name="author" content="Meta Author"></meta>
              <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-PTP01LUe7wQiQrvtPccCjdLnRY33%2Fprevious-sport-186%2Fthumbnail.png?alt=media&token=f5bd859b-d40e-4b53-8812-7456ced3de17"></meta>
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
                <img src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-PTP01LUe7wQiQrvtPccCjdLnRY33%2Fprevious-sport-186%2Flogo.png?alt=media&token=b92cd4c1-2eb4-4d13-8105-6acb7e96ece4" draggable="false" />
                <p>Babba Dabba</p>
              </a>
            </nav>
            ,
            <section
              key="1"
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
              key="2"
              className="imgAndTxt directHorizontal"
            >
              <p>Get ready to hop along with Fuzzy Beats at their high-energy bunny bash!</p>
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
              <p>Copyright by Fuzzy Beats ©</p>
            </footer>
            
            </main>
          );
      }