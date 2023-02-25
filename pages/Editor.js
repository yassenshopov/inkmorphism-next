import app from '../firebase/clientApp';
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore/lite';
import { getDownloadURL, getMetadata, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from 'react';
import Nav from "./components/nav.js"
import Footer from "./components/footer.js"
import Hero from "./components/hero.js"
import { Button, createTheme, ThemeProvider } from '@mui/material';
import { Container } from '@mui/system';
import '@fontsource/roboto/500.css';
import { MdOpenInFull, MdOutlineCloseFullscreen } from 'react-icons/md'
import { RiSave3Fill } from 'react-icons/ri'
import { FaMobileAlt, FaDesktop } from 'react-icons/fa'
import Head from 'next/head';
// import '../styles/fonts/Oswald-VariableFont_wgth.ttf'
import { getAuth } from 'firebase/auth'
import logo from '../styles/images/logo.png';
import Blog from './components/blog';
import Loader from './components/loader.js'

function Editor(props) {

  const [loadBool, setLoadBool] = useState(false);

  // VARIABLES:
  let callbackDefaults = { 
    // Meta data:
    meta_description     : "Build the perfect website with Aixolotl, the AI website builder. With intuitive drag-and-drop features and customizable templates, creating a professional website has never been easier.",
    meta_author          : "Default Author",

    // Style data:
    style_main           : "futurism",
    palette              : {
      color1: "#e6f181",
      color2: "#aa0000",
      color1Transparent: "#e6f18120",
      color2Transparent: "#aa000020",
    },

    //
    structure            : {
      nav: {
        exists: false
      },
      hero: {
        exists: false
      },
      blog: {
        exists: false
      },
      footer: {
        exists: false
      }
    },

    footer_txt           : "Footer Text",
    title                : "Meta title",
    heading              : "Default heading",
    subheading           : "Default subheading",
    image                : "",
    NL_email_placeholder : "Default email placeholder",
    nav_CTA              : "CTA",
    form_submit          : "Form submit",
    link_past_issues_txt : "Link to past issues"

  };

  // FIREBASE FIRESTORE DB CODE:

  let db = getFirestore(app);
  const col = collection(db, "websites");

  const [defaults, setData] = useState(callbackDefaults);
  const [defaultFiles, setFiles] = useState({
    logo: ''
  });
  const [user, setUser] = useState({
    displayName: 'Display Name',
    photoURL: '',
    email: 'me@something.com',
  })

  // This is a smart roundabout => On the initial render, the button is clicked programmatically,
  // and thus the data that's been fetched is displayed on the page.
  useEffect(() => {
    const el = document.getElementById("fetch")
    setLoadBool(true)
    setTimeout(() => {
      el.click();
      document.getElementById("loader").style.display = "none";
      setLoadBool(false)
    }, 1500)
  }, [])

  const storage = getStorage(app);
  const logoRef = ref(storage, (props['name'] + '/logo.png'));

  async function getData() {
    const data = await getDocs(col);
    for (let entry in data._docs) {
      if (data._docs[entry].id == props['name']) {
        let dbRenderedData = data._docs[entry].data();
        console.log(dbRenderedData)
        setData(dbRenderedData)
      }
    }
    const logo = await getDownloadURL(logoRef)
    console.log(logo)
    setFiles({
      logo: logo,
    })
    let temp_user = getAuth(app).currentUser;
    try {
      temp_user.displayName
      setUser(temp_user)
    } catch {

    }
    console.log(temp_user)
  
  }

  async function sendData(savedData) {
    await setDoc(doc(col, props['name']), savedData)
  }

  // END OF DB CODE

  // onkeydown = function(e) {
  //   if (e.ctrlKey && e.keyCode === 'R'.charCodeAt(0)) {
  //     // alert("You are attempting a restart")
  //     e.preventDefault();
  //     // return false;
  //     let dialog = this.document.querySelector("dialog");
  //     dialog.style.display = "block"
  //   }
  // };

    // STYLE VARIABLES AND THEME:

    let color1 = 'rgba(230, 181, 22)';
    let color2 = 'rgba(23, 115, 235)';
    let color1Transparent = 'rgba(230, 181, 22, 0.4)';
    let color2Transparent = 'rgba(23, 115, 235, 0.4)';
    let mainLight = '#fafafa';
    let mainDark = '#252525';
  
    let glassmorphism = {
      palette: {
        primary: {
          main: color1,
          light: mainLight,
          dark: mainDark,
        },
        secondary: {
          main: color2,
        },
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: `
          @font-face {
            font-family: 'Oswald';
            src: url('../fonts/Oswald-VariableFont_wght.ttf') format('truetype');
          }
          `,
        },
        MuiContainer: {
          defaultProps: {
            direction: "column",
            alignItems: "center",
            justifyContent: "center",
            sx: {
              background: `linear-gradient(45deg,`+ color2Transparent + `, ` + color2 + `)`,
              p: 1,
              position: 'relative',
            },
          }
        },
        MuiAppBar: {
          defaultProps: {
            sx: {
              background: 'none',
              width: '100%',
              borderRadius: '1rem',
              backdropFilter: 'brightness(1.1) blur(10px) saturate(2)',
              zIndex: '2',
              my: 5,
              py: 2,
              color: mainLight,
              fontSize: '2rem',
              boxShadow: '0 0 20px rgb(256 256 256 / 50%)',
            },
          }
        },
        MuiToolbar: {
          defaultProps: {
            sx: {
              display: 'flex',
              flexDirection: 'row',
              justifyContent: "space-evenly",
              alignContent: "center",
            }
          }
        },
        MuiButton: {
          defaultProps: {
            sx: {
              backgroundColor: defaults['palette']['color1'],
              color: mainLight,
              textTransform: 'capitalize',
              boxShadow: '0.5vw 0.5vw 20px ' + defaults['palette']['color1Transparent'],
            }
          }
        },
        MuiBottomNavigation: {
          defaultProps: {
            sx: {
              boxSizing: 'border-box',
              background: 'none',
              // background: `linear-gradient(45deg,`+ mainLight + `, ` + color2 + `)`,
              width: '100%',
              borderRadius: '1rem',
              backdropFilter: 'brightness(1.1) blur(10px) saturate(2)',
              boxShadow: 3,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              color: mainDark,
              my: 2,
              py: 5,
              boxShadow: '0 0 20px rgb(256 256 256 / 50%)',
            },
          }
        }, 
        MuiLink: {
          defaultProps: {
            sx: {
              color: mainDark,
              textDecorationColor: mainDark
            }
          }
        },
        MuiTypography: {
          defaultProps: {
            sx: {
              fontFamily: 'Oswald'
            }
          }
        }
      }
    }
  
  const theme = createTheme(glassmorphism)

  let savedData = JSON.parse(JSON.stringify(defaults));

  for (const key in defaults) {
    try {
      let element = document.getElementsByClassName(key)[0];
      element.contentEditable = true;
      element.spellcheck = false;
    } catch(err) {
      // console.log(err)
    }
  }

  function saveNewData() {
    for (const key in defaults) {
      console.log(key)
      try {
        if (key=='palette') {
          let color1 = document.getElementById('color1');
          savedData[key]['color1'] = color1.value
          let color2 = document.getElementById('color2');
          savedData[key]['color2'] = color2.value
        }
        let element = document.getElementsByClassName(key)[0];
        savedData[key] = element.innerHTML;
      } catch(err) {
        // console.log(err)
      }
    }
    console.log(savedData)
    sendData(savedData)
  };

  // function changeSavedData() {
  //   (event) => {
  //     console.log(event)
  //   }
  // }

  const [fsClass, setFsClass] = useState('')
  const [modeClass, setModeClass] = useState(' desktop')

  function fullscreen() {
    setFsClass(' fs')
  }

  function normalscreen() {
    setFsClass('')
  }

  function mobile() {
    setModeClass(' mobile')
  }

  function desktop() {
    setModeClass(' desktop')
    // let i = 0;
    // let el = document.getElementById("editor")
    // while (i<1000) {
    //   setTimeout(() => {
    //     // el.style.width = (30 + ((i*70)/1000)).toString() + "vw"
    //     i++;
    //   },10)
    // }
  }

  return (
    <div className={"Editor" + fsClass + modeClass}>

      <Head>
        <link rel="icon" href={defaultFiles['logo']} />
        <title>{defaults['title']}</title>
      </Head>

      {/* <dialog open>
        <p>You are refreshing the page</p>
        <button>Ok</button><button>Maybe</button><button>Cancel</button>
      </dialog> */}

      <main id='editor'>

        <nav id='nav'>
          <button onClick={saveNewData}><RiSave3Fill/></button>
          <button id='desktopMode' onClick={desktop}><FaDesktop/></button>
          <button id='mobileMode' onClick={mobile}><FaMobileAlt/></button>
          <button id="openFS" onClick={fullscreen}><MdOpenInFull/></button>
          <button id="closeFS" onClick={normalscreen}><MdOutlineCloseFullscreen/></button>
        </nav>
        
        <p id='loader'>Loading...</p>
        <button id="fetch" onClick={getData}></button>

        <ThemeProvider theme={theme}>
          <Container
            sx={{
              background: `linear-gradient(45deg,`+ defaults['palette']['color2Transparent'] + `, ` + defaults['palette']['color2'] + `)`,
              p: 1,
              position: 'relative',
            }}
            className="editorPane"
          >
            <Nav
                nav={defaults['structure']['nav']}
            />
            <Hero
                hero={defaults['structure']['hero']}
            />
            <Blog
              blog={defaults['structure']['blog']}
            />
            <main>
              {/* <button id='saveBtn' onClick={saveNewData}>Save</button> */}
              <header>
                <form>
                    <h1 className='heading'>{defaults['heading']}</h1>
                    <h2 className='subheading'>{defaults['subheading']}</h2>
                    <div class="form_input">
                        <input className="disabled" type="email" placeholder={defaults['NL_email_placeholder']}></input>
                        <input className="disabled" type="submit" value={defaults["form_submit"]}></input>
                    </div>
                    <a href="#"><p className='link_past_issues_txt'>{defaults['link_past_issues_txt']}</p></a>
                </form>
              </header>
            </main>
            <Footer
                footer={defaults['structure']['footer']}
            />
          </Container>
        </ThemeProvider>

        {/* <footer>
          <p>Created with <a href="https://inkmorphism.com">Inkmorphism</a></p>
          <div>
              <p className='footer_txt'>{defaults["footer_txt"]}</p>
          </div>
        </footer> */}
      </main>

      <aside>
        <img id="mainLogo" src={logo.src}/>
        <h1>Hello, {user.displayName}.</h1>

        <ul>
          <li>
            Color1
            <input id="color1" type="color" defaultValue={defaults['palette']['color1']}/>
          </li>
          <li>
            Color2
            <input id="color2" type="color" defaultValue={defaults['palette']['color2']}/>
          </li>
        </ul>

        <section id='profileSection'>
          <img src={user.photoURL} alt="Profile Pic" />
          <div>
            <p>{user.displayName}</p>
            <p>{user.email}</p>
          </div>
          <div></div>
        </section>
      </aside>
      {loadBool ? <Loader/> : ""}
    </div>
  );
}

export default Editor;
