export default function Default() {
        return (
          <main
            className={"simple published"}
            style={{
              "--color1": "#ffffff",
              "--color2": "#fafaff",
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
                <img src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-ALNvFdJ75LPwHkSuRsxig6ujMrs1%2Fexperience-figure-152%2Flogo.png?alt=media&token=b458d59e-5f31-4192-9bbb-2238c1454ac2" draggable="false" />
                <p>Fuzzy Beats</p>
              </a>
            </nav>
            ,
            <section
              key="1"
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
            <section
              key="2"
              className="imgAndTxt reverseHorizontal"
            >
              <p>Fuzzy Beats: the cutest rock band on the scene, bringing high-energy performances and infectious tunes to audiences everywhere</p>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-ALNvFdJ75LPwHkSuRsxig6ujMrs1%2Fexperience-figure-152%2FdkIB086W0E4oY9Qq.png?alt=media&token=924b519c-2c50-42dc-9761-85eec1e02670"
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