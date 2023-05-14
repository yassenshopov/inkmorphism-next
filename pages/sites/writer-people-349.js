export default function Default() {
        return (
          <main
            className={"simple published"}
            style={{
              "--color1": "#ffe5e5",
              "--color2": "#ffa8a8",
              "--color3": "#158406",
              "--colorLight": "#ffe5e5",
              "--colorDark": "#140000"              
            }}
          >            
            
            <nav 
              className="nav" 
              key="0"
            >
              <a href="" id="navLogo" className="noSelect">
                <img src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-ALNvFdJ75LPwHkSuRsxig6ujMrs1%2Fwriter-people-349%2Flogo.png?alt=media&token=6b4c84f3-a4a8-4363-a8f1-1aab478bb47a" draggable="false" />
                <p>The Tangled Stories</p>
              </a>
            </nav>
            ,
            <section
              key="1"
              className="imgOnly "
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-ALNvFdJ75LPwHkSuRsxig6ujMrs1%2Fwriter-people-349%2Fu6mgkkvyA8uMphuL.png?alt=media&token=7abbaa88-7638-4e41-bf8b-006e0995922d"
                draggable="false"
                loading="eager"
              />
            </section>
            ,
            <section
              key="2"
              className="imgAndTxt directHorizontal"
            >
              <p>This is text about some located minerals.</p>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-ALNvFdJ75LPwHkSuRsxig6ujMrs1%2Fwriter-people-349%2FFpt3q7occtSsT7ZZ.png?alt=media&token=0c7105f2-7b61-42eb-9315-b521be513534"
                draggable="false"
                loading="eager"
              />
            </section>
            ,
            <section
              key="3"
              className="imgOnly "
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-ALNvFdJ75LPwHkSuRsxig6ujMrs1%2Fwriter-people-349%2FZlX7Efand0d7cUHA.png?alt=media&token=e8af3c9b-d5e6-4369-b179-8597921d7eab"
                draggable="false"
                loading="eager"
              />
            </section>
            ,
            <section
              key="4"
              className="imgOnly "
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-ALNvFdJ75LPwHkSuRsxig6ujMrs1%2Fwriter-people-349%2FHx3DoCV25tujx9vs.png?alt=media&token=a5d0940a-3136-472f-8702-683dfbcdc2ba"
                draggable="false"
                loading="lazy"
              />
            </section>
            ,
            <section
              key="5"
              className="imgOnly "
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-ALNvFdJ75LPwHkSuRsxig6ujMrs1%2Fwriter-people-349%2FFSAB1x0gzSdAKK1h.png?alt=media&token=801d8452-b679-4949-9d17-0bf61ba59699"
                draggable="false"
                loading="lazy"
              />
            </section>
            ,
            <section
              key="6"
              className="imgOnly "
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-ALNvFdJ75LPwHkSuRsxig6ujMrs1%2Fwriter-people-349%2FfBt8NznZvWNmtsWz.png?alt=media&token=8b28a5da-debe-4582-a358-a30b621693f2"
                draggable="false"
                loading="lazy"
              />
            </section>
            ,
            <footer 
              className="footer"
              key="7"
            >
              <p id="watermark">
                <a href="https://inkmorphism.com" target="_blank">
                  Built with Inkmorphism 🖋️
                </a>
              </p>
              <p>Copyright by The Tangled Stories</p>
            </footer>
            
          </main>
        );
    }