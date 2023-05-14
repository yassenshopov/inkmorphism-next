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
                <img src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Faloud-steam-688%2Flogo.png?alt=media&token=3908895f-07fd-4b9d-9609-41f78114a5b1" draggable="false" />
                <p>New Site v7</p>
              </a>
            </nav>
            ,
            <section
              key="1"
              className="imgAndTxt directHorizontal"
            >
              <p>This is text about some located minerals.</p>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fcreature-division-525%2Fva2CtGkNvHmREF2h.png?alt=media&token=d63dbe1f-60ba-4544-a9e5-55410cad045a"
                draggable="false"
                loading="eager"
              />
            </section>
            ,
            <section
              key="2"
              className="imgAndTxt reverseHorizontal"
            >
              <p>This is your new ImgNTxt section.</p>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fcreature-division-525%2FTJZN7mgArCUiaBqM.png?alt=media&token=651cbe99-bc2e-4391-946f-80948a9a7d6c"
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