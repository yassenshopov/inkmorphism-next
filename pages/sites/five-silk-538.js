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
            
            <nav 
              className="nav" 
              key="0"
            >
              <a href="" id="navLogo" className="noSelect">
                <img src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Ffive-silk-538%2Flogo.png?alt=media&token=d0a10bac-343f-4681-b949-c1dca8b49b18" draggable="false" />
                <p>Fuzzy Beats</p>
              </a>
            </nav>
            ,
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
              <p>Copyright by Fuzzy Beats ©</p>
            </footer>
            
          </main>
        );
    }