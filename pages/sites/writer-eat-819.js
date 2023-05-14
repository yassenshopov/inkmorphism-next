
    import Head from "next/head";
  
    export default function Default() {
          return (
            <main
              className={"simple published"}
              style={{
                "--color1": "#ffffff",
                "--color2": "#f9f9f0",
                "--color3": "#79e16b",
                "--colorLight": "#fefefe",
                "--colorDark": "#130b0b"              
              }}
            >
            <Head>
              <title>Your Website</title>
              <meta name="description" content="The description for your website"></meta>
              <link rel="icon" href="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fwriter-eat-819%2Flogo.png?alt=media&token=9478d91b-0a45-4659-8c7a-0dd69eacadc3" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta name="author" content="Meta Author"></meta>
              <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fwriter-eat-819%2Fthumbnail.png?alt=media&token=1b70126e-68fc-472d-96db-ee4b12c36095"></meta>
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
                <img src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fwriter-eat-819%2Flogo.png?alt=media&token=9478d91b-0a45-4659-8c7a-0dd69eacadc3" draggable="false" />
                <p>Food for Writers!</p>
              </a>
            </nav>
            ,
            <section
              key="1"
              className="imgAndTxt directHorizontal"
            >
              <p>Welcome to the world of your imagination!</p>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fwriter-eat-819%2FmMmpWECVpmzr5SEH.png?alt=media&token=c9c4288d-bc84-4b9b-9876-ff4e64beb700"
                draggable="false"
                loading="eager"
              />
            </section>
            ,
            <section
              key="2"
              className="imgOnly "
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fwriter-eat-819%2FAx35KZthqwPPkjaa.png?alt=media&token=db5b9077-4f2e-40b7-abcd-179440951d09"
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
              <p>Copyright by Restaurant for Writers</p>
            </footer>
            
            </main>
          );
      }