import app from "../firebase/clientApp";
import {
  getFirestore,
  collection,
  getDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore/lite";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import Nav from "./components/nav.js";
import Footer from "./components/footer.js";
import Hero from "./components/hero.js";
import { MdOpenInFull, MdOutlineCloseFullscreen } from "react-icons/md";
import { RiSave3Fill } from "react-icons/ri";
import { FaMobileAlt, FaDesktop, FaTrashAlt } from "react-icons/fa";
import Head from "next/head";
import { getAuth } from "firebase/auth";
import logo from "../styles/images/logoWh.png";
import Blog from "./components/blog";
import { useRouter } from "next/router";
import Loader from "./components/loader.js";

const dataArr = [];

function Editor(props) {
  
  const [loadBool, setLoadBool] = useState(true);
  const [defaults, setData] = useState({
    webContent: {
      meta: {
        metaAuthor: "Meta Author",
        metaStyle: "web3",
        metaDescription: "The description for your website",
        colorPalette: {
          color1: "#5C8BB5",
          color2: "#457596",
          color3: "#E05276",
          colorDark: "#121212",
          colorLight: "#fefefe",
        },
        metaTitle: "Inkmorphism - Your Website",
        metaThumbnail:
          "https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fmusic-point-595%2Fthumbnail.png?alt=media&token=667a1542-8de7-45b2-ae39-520667a9af22",
        metaFavicon:
          "https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fmusic-point-595%2Flogo.png?alt=media&token=b601d1f8-8708-4c89-b8f5-8d75f2f1c164",
      },
      pages: {
        main: {
          structure: [1, 2, 3],
        },
      },
    },
    initDate: "",
    style: "Web3",
    name: "Website Defaults",
    thumbnail:
      "https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fmusic-point-595%2Fthumbnail.png?alt=media&token=667a1542-8de7-45b2-ae39-520667a9af22",
    domainSlug: "default",
    domain: "default.inkmorphism.com",
    deleted: false,
  });
  const [pageData, setPageData] = useState([
    {
      type: "nav",
      options: {},
      content: {
        logo: "https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fleaf-since-484%2FsrcFiles%2Flogo.png?alt=media&token=3a81fc14-b6cc-454f-9d1c-48e9b84ccbc3"
      }
    },
    {
      type: "imgAndTxt",
      content: {
        img: "https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fminerals-locate-276%2FsrcFiles%2FimgPlaceholder.png?alt=media&token=f3dbf650-3ac2-4644-9047-a207ab6f80f9",
        txt: "This is text about some located minerals. This is text about some located minerals. This is text about some located minerals. This is text about some located minerals.",
      },
      options: {
        direction: "directHorizontal"
      }
    },
  ]);
  const [sectionsData, setSectionsData] = useState(
    <section></section>
  );

  // FIREBASE FIRESTORE DB CODE:

  let db = getFirestore(app);

  const [defaultFiles, setFiles] = useState({
    logo: "",
  });
  const [user, setUser] = useState({
    displayName: "Display Name",
    photoURL: "",
    email: "me@something.com",
  });

  // This is a smart roundabout => On the initial render, the button is clicked programmatically,
  // and thus the data that's been fetched is displayed on the page.
  useEffect(() => {
    const el = document.getElementById("fetch");
    setLoadBool(true);
    setTimeout(() => {
      el.click();
    }, 2500);
  }, []);

  const storage = getStorage(app);

  const [userName, setUserName] = useState("fallback");

  useEffect(() => {
    const sections = pageData.map((section) => {
      switch (section.type) {
        case "imgAndTxt":
          return (
            <section className={section.type + " " + section.options.direction}>
              <p suppressContentEditableWarning={true} onInput={fieldChange} contentEditable={true}>{section.content.txt}</p>
              <img src={section.content.img} draggable={false}/>
            </section>
          )     
        case "nav":
            return (
              <nav className={section.type}>
                <a href="." id="navLogo">
                  <img src={section.content.logo} draggable={false}/>
                  <p>{defaults.name}</p>
                </a>
              </nav>
            )
        default:
          // return("")
          break
      }
    }) 
    setSectionsData(sections) 
  }, [pageData])

  async function getData() {
    let propsName;
    let col;
    if (props["name"] === undefined) {
      propsName = "thedatachunk";
    } else {
      try {
        propsName = "user-" + props.auth.currentUser.uid + "/" + props.name;
        setUserName("user-" + props.auth.currentUser.uid);
        col = doc(db, "users", userName, "websites", props.name);
        const data = await getDoc(col).then((doc) => {
          dataArr.push(doc.data());
          dataArr.forEach((item) => {
            if (item !== undefined) {
              setData(item);
              setPageData(item.webContent.pages.main.structure)
            }
          });
        });
      } catch (err) {
        propsName = "user-" + "fallback" + "/" + props["name"];
        setUserName("fallback");
      }
    }
    try {
      const logoRef = ref(storage, propsName + "/logo.png");
      // const data = await getDoc(col);
      // console.log(data.data());
      const logo = await getDownloadURL(logoRef);
      setFiles({
        logo: logo,
      });
    } catch (err) {
      setFiles({
        logo: logo.src,
      });
    }
    // let temp_user = getAuth(app).currentUser;
    // try {
    //   temp_user.displayName;
    //   setUser(temp_user);
    // } catch {}
    setLoadBool(false);
  }

  async function sendData(savedData) {
    let propsName;
    if (props["name"] === undefined) {
      propsName = "thedatachunk";
    } else {
      try {
        propsName = "user-" + props.auth.currentUser.uid + "/" + props["name"];
        setUserName("user-" + props.auth.currentUser.uid);
      } catch {
        propsName = "user-" + "fallback" + "/" + props["name"];
        setUserName("fallback");
      }
    }
    console.log(props["name"]);
    await setDoc(
      doc(db, "users", userName, "websites", props["name"]),
      savedData
    );
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

  function saveNewData() {
    sendData(defaults);
  }

  const colorChange = (e) => {
    let id = e.target.id;
    let value = e.target.value;
    setData({
      ...defaults,
      webContent: {
        ...defaults.webContent,
        meta: {
          ...defaults.webContent.meta,
          colorPalette: {
            ...defaults.webContent.meta.colorPalette,
            [e.target.id]: value,
          },
        },
      },
    });
    // savedData["webContent"]["meta"]["colorPalette"][e.target.id] =
    //   e.target.value;
  };

  const fieldChange = (e) => {
    console.log(e.target.innerHTML)
  }

  const [fsClass, setFsClass] = useState("");
  const [modeClass, setModeClass] = useState(" desktop");

  function fullscreen() {
    setFsClass(" fs");
  }

  function normalscreen() {
    setFsClass("");
  }

  function mobile() {
    setModeClass(" mobile");
  }

  function desktop() {
    setModeClass(" desktop");
  }

  let router = useRouter();

  async function deleteSite() {
    await updateDoc(doc(db, "users", userName, "websites", props["name"]), {
      deleted: true,
    }).then(() => {
      router.push("/dashboard");
    });
  }

  return (
    <div className={"Editor" + fsClass + modeClass}>
      <Head>
        <link rel="icon" href={defaults["webContent"]["meta"]["metaFavicon"]} />
        <title>{defaults["webContent"]["meta"]["metaTitle"]}</title>
        <meta
          name="description"
          content={defaults["webContent"]["meta"]["metaDescription"]}
        ></meta>
      </Head>

      {loadBool ? <Loader /> : ""}

      {/* <dialog open>
        <p>You are refreshing the page</p>
        <button>Ok</button><button>Maybe</button><button>Cancel</button>
      </dialog> */}

      <main id="editor">
        <nav id="nav">
          <button onClick={saveNewData}>
            <RiSave3Fill />
          </button>
          <button id="desktopMode" onClick={desktop}>
            <FaDesktop />
          </button>
          <button id="mobileMode" onClick={mobile}>
            <FaMobileAlt />
          </button>
          <button id="openFS" onClick={fullscreen}>
            <MdOpenInFull />
          </button>
          <button id="closeFS" onClick={normalscreen}>
            <MdOutlineCloseFullscreen />
          </button>
        </nav>

        <button id="fetch" onClick={getData}></button>

        <main
          className={defaults["webContent"]["meta"]["metaStyle"]}
          style={{
            "--color1":
              defaults["webContent"]["meta"]["colorPalette"]["color1"],
            "--color2":
              defaults["webContent"]["meta"]["colorPalette"]["color2"],
            "--color3":
              defaults["webContent"]["meta"]["colorPalette"]["color3"],
            "--colorLight":
              defaults["webContent"]["meta"]["colorPalette"]["colorLight"],
            "--colorDark":
              defaults["webContent"]["meta"]["colorPalette"]["colorDark"],
          }}
        >
          {sectionsData}
        </main>
      </main>

      <aside>
        <img id="mainLogo" src={logo.src} />
        <h1>Hello, {user.displayName}.</h1>

        <ul>
          <li>
            Color1
            <input
              id="color1"
              type="color"
              defaultValue={
                defaults["webContent"]["meta"]["colorPalette"]["color1"]
              }
              onChange={colorChange}
            />
          </li>
          <li>
            Color2
            <input
              id="color2"
              type="color"
              defaultValue={
                defaults["webContent"]["meta"]["colorPalette"]["color2"]
              }
              onChange={colorChange}
            />
          </li>
          <li>
            Color3
            <input
              id="color3"
              type="color"
              defaultValue={
                defaults["webContent"]["meta"]["colorPalette"]["color3"]
              }
              onChange={colorChange}
            />
          </li>
          <li>
            Color Light
            <input
              id="colorLight"
              type="color"
              defaultValue={
                defaults["webContent"]["meta"]["colorPalette"]["colorLight"]
              }
              onChange={colorChange}
            />
          </li>
          <li>
            Color Dark
            <input
              id="colorDark"
              type="color"
              defaultValue={
                defaults["webContent"]["meta"]["colorPalette"]["colorDark"]
              }
              onChange={colorChange}
            />
          </li>
        </ul>

        <a href="../../dashboard">Back to Dashboard</a>

        <h2>Danger zone</h2>
        <FaTrashAlt id="trashIcon" className="noSelect" onClick={deleteSite} />

        <section id="profileSection">
          <img src={user.photoURL} alt="Profile Pic" />
          <div>
            <p>{user.displayName}</p>
            <p>{user.email}</p>
          </div>
          <div></div>
        </section>
      </aside>
    </div>
  );
}

export default Editor;
