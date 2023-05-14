export default function Default() {
        return (
          <main
            className={"skeletal published"}
            style={{
              "--color1": "#4f7a28",
              "--color2": "#e4ef65",
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
                <img src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-x3tIpaOWjwXF47Ccgx60vqe1c6i1%2Fextra-lift-801%2Flogo.png?alt=media&token=1b32ad7c-8e13-4723-8091-e9389c1cffd6" draggable="false" />
                <p>The Test Chunk</p>
              </a>
            </nav>
            ,
            <section
              key="1"
              className="txtOnly reverseHorizontal"
            >
              <p>Test stuff</p>
            </section>
            ,
            <section
              key="2"
              className="imgOnly "
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-x3tIpaOWjwXF47Ccgx60vqe1c6i1%2Fextra-lift-801%2FR2FSvye5iesCIGxp.png?alt=media&token=1cf46fe9-6e61-44f7-aeff-7625798c249f"
                draggable="false"
                loading="eager"
              />
            </section>
            ,
            <section
              key="3"
              className="txtOnly reverseHorizontal"
            >
              <p>Hello to your new section</p>
            </section>
            ,
            <footer 
              className="footer"
              key="4"
            >
              <p id="watermark">
                <a href="https://inkmorphism.com" target="_blank">
                  Built with Inkmorphism 🖋️
                </a>
              </p>
              <p>Copyright by B0b0 D</p>
            </footer>
            
          </main>
        );
    }