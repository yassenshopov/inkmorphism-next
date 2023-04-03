import app from "../firebase/clientApp";
import {
  getFirestore,
  getDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore/lite";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import {
  MdOpenInFull,
  MdOutlineCloseFullscreen,
  MdKeyboardArrowDown,
  MdKeyboardArrowLeft,
} from "react-icons/md";
import { RiSave3Fill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { BsCheckLg } from "react-icons/bs";
import { CgFormatText } from "react-icons/cg";
import { FaMobileAlt, FaDesktop, FaTrashAlt, FaPlus } from "react-icons/fa";
import Head from "next/head";
import logo from "../styles/images/logoWh.png";
import { useRouter } from "next/router";
import Loader from "./components/loader.js";
import HideContent from "./components/hideContent.js";
import { TfiLayoutMediaLeft } from "react-icons/tfi";
import { RxCross1 } from "react-icons/rx";

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
        logo: "https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fleaf-since-484%2FsrcFiles%2Flogo.png?alt=media&token=3a81fc14-b6cc-454f-9d1c-48e9b84ccbc3",
      },
    },
    {
      type: "imgAndTxt",
      content: {
        img: "https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-gTEFEshrDaeGrt9YUt9Uljt0jF43%2Fminerals-locate-276%2FsrcFiles%2FimgPlaceholder.png?alt=media&token=f3dbf650-3ac2-4644-9047-a207ab6f80f9",
        txt: "This is text about some located minerals. This is text about some located minerals. This is text about some located minerals. This is text about some located minerals.",
      },
      options: {
        direction: "directHorizontal",
      },
    },
  ]);
  const [sectionsData, setSectionsData] = useState(<section></section>);

  const [hideContent, setHideContent] = useState(false);

  // FIREBASE FIRESTORE DB CODE:

  let db = getFirestore(app);
  let col;

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
      setUser({
        displayName: props.auth.currentUser.displayName,
        photoURL: props.auth.currentUser.photoURL,
        email: props.auth.currentUser.email,
      });
    }, 3500);
    console.log(props);
  }, []);

  const storage = getStorage(app);

  const [userName, setUserName] = useState("fallback");

  const newSections = {
    txtOnly: {
      content: {
        txt: "Hello to your new section",
      },
      options: {
        direction: "reverseHorizontal",
      },
      type: "txtOnly",
    },

    imgAndTxt: {
      content: {
        txt: "This is your new ImgNTxt section.",
        img: "https://cdn.discordapp.com/ephemeral-attachments/1062880104792997970/1090657787555610735/midjourney_bread_2d_minimalism_anime_style_realism_afd91681-d51d-4612-8322-0a5b2bb6dd20.png",
      },
      options: {
        direction: "reverseHorizontal",
      },
      type: "imgAndTxt",
    },
  };

  function addSectionPopup(ind) {
    setPopupToggle(true);
    setSectionsSelection(
      sectionTypes.map((section, index) => {
        return (
          <section
            key={index}
            id={section.id}
            onClick={() => {
              addSection(section.id, ind);
            }}
          >
            {section.icon}
            <p>{section.name}</p>
          </section>
        );
      })
    );
  }

  function deleteSectionPopup(ind) {
    setEditPopupToggle(true);
    setDeleteBtn(
      <p
        onClick={() => {
          deleteSection(ind);
        }}
      >
        Delete this section
      </p>
    );
  }

  function deleteSection(index) {
    setPageData((pageData) => [
      ...pageData.slice(0, index),
      ...pageData.slice(index + 1),
    ]);
    setEditPopupToggle(false);
  }

  function addSection(type, index) {
    setPageData((pageData) => [
      ...pageData.slice(0, index),
      newSections[type],
      ...pageData.slice(index),
    ]);
    setPopupToggle(false);
  }
  const sectionTypes = [
    {
      id: "txtOnly",
      icon: <CgFormatText />,
      name: "Text Section",
    },
    {
      id: "imgAndTxt",
      icon: <TfiLayoutMediaLeft />,
      name: "Image and Text Section",
    },
  ];

  const [popupToggle, setPopupToggle] = useState(false);
  const [editPopupToggle, setEditPopupToggle] = useState(false);
  const [deleteBtn, setDeleteBtn] = useState();
  const [sectionSelection, setSectionsSelection] = useState();
  const openPopup = () => {
    setPopupToggle(true);
  };

  useEffect(() => {
    const sections = pageData.map((section, index) => {
      switch (section.type) {
        case "txtOnly":
          return (
            <section
              key={index}
              className={section.type + " " + section.options.direction}
            >
              <div
                onClick={() => {
                  addSectionPopup(index);
                }}
                className="addSection"
              >
                <p>
                  Add section <FaPlus />
                </p>
              </div>
              <p
                suppressContentEditableWarning={true}
                onInput={(e) => {
                  txtFieldChange(e, index);
                }}
                contentEditable={true}
              >
                {section.content.txt}
              </p>
              <p
                className="editBtn noSelect"
                onClick={() => {
                  deleteSectionPopup(index);
                }}
              >
                <BiEdit />
              </p>
              <div className="addSection">
                <p
                  onClick={() => {
                    addSectionPopup(index + 1);
                  }}
                >
                  Add section <FaPlus />
                </p>
              </div>
            </section>
          );
        case "imgAndTxt":
          return (
            <section
              key={index}
              className={section.type + " " + section.options.direction}
            >
              <div
                onClick={() => {
                  addSectionPopup(index);
                }}
                className="addSection"
              >
                <p>
                  Add section <FaPlus />
                </p>
              </div>
              <p
                suppressContentEditableWarning={true}
                onInput={(e) => {
                  txtFieldChange(e, index);
                }}
                contentEditable={true}
              >
                {section.content.txt}
              </p>
              <img src={section.content.img} draggable={false} />
              <p
                className="editBtn noSelect"
                onClick={() => {
                  deleteSectionPopup(index);
                }}
              >
                <BiEdit />
              </p>
              <div className="addSection">
                <p
                  onClick={() => {
                    addSectionPopup(index + 1);
                  }}
                >
                  Add section <FaPlus />
                </p>
              </div>
            </section>
          );
        case "nav":
          return (
            <nav className={section.type} key={index}>
              <div className="addSection">
                <p
                  onClick={() => {
                    addSectionPopup(index);
                  }}
                >
                  Add section <FaPlus />
                </p>
              </div>
              <a id="navLogo">
                <img src={section.content.logo} draggable={false} />
                <p>{defaults.name}</p>
              </a>
              <p
                className="editBtn noSelect"
                onClick={() => {
                  deleteSectionPopup(index);
                }}
              >
                <BiEdit />
              </p>
              <div className="addSection">
                <p
                  onClick={() => {
                    addSectionPopup(index + 1);
                  }}
                >
                  Add section <FaPlus />
                </p>
              </div>
            </nav>
          );
        default:
          break;
      }
    });
    setSectionsData(sections);
    console.log(pageData);
    setData({
      ...defaults,
      webContent: {
        ...defaults.webContent,
        pages: {
          ...defaults.webContent.pages,
          main: {
            ...defaults.webContent.pages.main,
            structure: pageData,
          },
        },
      },
    });
  }, [pageData]);

  useEffect(() => {
    async function asyncFunc() {
      if (userName !== "fallback") {
        console.log(userName, props.name);
        col = doc(db, "users", userName, "websites", props.name);
        const data = await getDoc(col)
          .then((doc) => {
            dataArr.push(doc.data());
            dataArr.forEach((item) => {
              if (item !== undefined) {
                try {
                  setData(item);
                  setPageData(item.webContent.pages.main.structure);
                } catch (err) {
                  console.log(err);
                }
              }
            });
          })
          .catch((err) => {
            console.log(err);
            setHideContent(true);
          });
      }
    }
    asyncFunc();
  }, [userName]);

  async function getData() {
    let propsName;
    let col;
    if (props["name"] === undefined) {
      propsName = "thedatachunk";
    } else {
      try {
        propsName = "user-" + props.auth.currentUser.uid + "/" + props.name;
        setUserName("user-" + props.auth.currentUser.uid);
      } catch (err) {
        propsName = "user-" + "fallback" + "/" + props["name"];
        setUserName("fallback2");
      }
    }
    try {
      const logoRef = ref(storage, propsName + "/logo.png");
      const logo = await getDownloadURL(logoRef);
      setFiles({
        logo: logo,
      });
    } catch (err) {
      setFiles({
        logo: logo.src,
      });
    }
    setLoadBool(false);
  }

  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  async function sendData(savedData) {
    let propsName;
    setIsSaved(true);
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
    await setDoc(
      doc(db, "users", userName, "websites", props["name"]),
      savedData
    );
    console.log(savedData);
    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  }

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
    console.log(defaults);
    sendData(defaults);
  }

  function txtFieldChange(e, index) {
    setData({
      ...defaults,
      webContent: {
        ...defaults.webContent,
        pages: {
          ...defaults.webContent.pages,
          main: {
            ...defaults.webContent.pages.main,
            structure: defaults.webContent.pages.main.structure.map(
              (el, arrIndex) => {
                if (arrIndex === parseInt(index)) {
                  let updatedTxtContent = {
                    ...el,
                    content: { ...el.content, txt: e.target.innerHTML },
                  };
                  return updatedTxtContent;
                } else {
                  return el;
                }
              }
            ),
          },
        },
      },
    });
    console.log(defaults);
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
  };

  const fieldChange = (e) => {
    console.log(e.target.innerHTML);
  };

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

  const [isStyleOpen, setIsStyleOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleStyle = () => {
    setIsStyleOpen(!isStyleOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

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

      {hideContent ? <HideContent /> : ""}

      {/* <dialog open>
        <p>You are refreshing the page</p>
        <button>Ok</button><button>Maybe</button><button>Cancel</button>
      </dialog> */}

      <main id="editor">
        <nav id="nav">
          <button onClick={saveNewData} className="noSelect">
            <RiSave3Fill style={{ display: isSaved ? "none" : "flex" }} />
            <BsCheckLg style={{ display: isSaved ? "flex" : "none" }} />
          </button>
          <button id="desktopMode" onClick={desktop} className="noSelect">
            <FaDesktop />
          </button>
          <button id="mobileMode" onClick={mobile} className="noSelect">
            <FaMobileAlt />
          </button>
          <button id="openFS" onClick={fullscreen} className="noSelect">
            <MdOpenInFull />
          </button>
          <button id="closeFS" onClick={normalscreen} className="noSelect">
            <MdOutlineCloseFullscreen />
          </button>
        </nav>

        <button id="fetch" onClick={getData}></button>

        <div
          style={{ display: popupToggle ? "flex" : "none" }}
          id="popupWrapper"
        >
          <form id="popup">
            <RxCross1
              id="customX"
              onClick={() => {
                setPopupToggle(false);
              }}
            />
            <p id="message">Choose the new section:</p>
            <div id="sectionSelection">{sectionSelection}</div>
          </form>
        </div>

        <div
          style={{ display: editPopupToggle ? "flex" : "none" }}
          id="popupWrapper"
        >
          <form id="popup">
            <RxCross1
              id="customX"
              className="noSelect"
              onClick={() => {
                setEditPopupToggle(false);
              }}
            />
            <p id="message">Edit Section</p>
            <div id="editSectionDeleteBtn">{deleteBtn}</div>
          </form>
        </div>

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

        <div id="dropDowns">
          <div id="styleMenu" className="noSelect">
            <div className="dropdown-content">
              <a onClick={toggleStyle}>
                Style{" "}
                <MdKeyboardArrowDown
                  style={{ display: isStyleOpen ? "none" : "flex" }}
                />{" "}
                <MdKeyboardArrowLeft
                  style={{ display: isStyleOpen ? "flex" : "none" }}
                />
              </a>
              <div className={`dropdown-items ${isStyleOpen ? "show" : ""}`}>
                <a>Colors</a>
                <ul id="colorList">
                  <li>
                    <input
                      name="color1"
                      id="color1"
                      type="color"
                      defaultValue={
                        defaults["webContent"]["meta"]["colorPalette"]["color1"]
                      }
                      onChange={colorChange}
                    />
                    <label htmlFor="color1">Main color 1</label>
                  </li>
                  <li>
                    <input
                      name="color2"
                      id="color2"
                      type="color"
                      defaultValue={
                        defaults["webContent"]["meta"]["colorPalette"]["color2"]
                      }
                      onChange={colorChange}
                    />
                    <label htmlFor="color2">Main color 2</label>
                  </li>
                  <li>
                    <input
                      name="color3"
                      id="color3"
                      type="color"
                      defaultValue={
                        defaults["webContent"]["meta"]["colorPalette"]["color3"]
                      }
                      onChange={colorChange}
                    />
                    <label htmlFor="color3">Accent Color</label>
                  </li>
                  <li>
                    <input
                      name="colorLight"
                      id="colorLight"
                      type="color"
                      defaultValue={
                        defaults["webContent"]["meta"]["colorPalette"][
                          "colorLight"
                        ]
                      }
                      onChange={colorChange}
                    />
                    <label htmlFor="colorLight">Color Light</label>
                  </li>
                  <li>
                    <input
                      name="colorDark"
                      id="colorDark"
                      type="color"
                      defaultValue={
                        defaults["webContent"]["meta"]["colorPalette"][
                          "colorDark"
                        ]
                      }
                      onChange={colorChange}
                    />
                    <label htmlFor="colorDark">Color Dark</label>
                  </li>
                </ul>
              </div>
              <a onClick={toggleProfile}>
                Profile{" "}
                <MdKeyboardArrowDown
                  style={{ display: isProfileOpen ? "none" : "flex" }}
                />{" "}
                <MdKeyboardArrowLeft
                  style={{ display: isProfileOpen ? "flex" : "none" }}
                />
              </a>
              <div className={`dropdown-items ${isProfileOpen ? "show" : ""}`}>
                <section id="profileSection">
                  <img src={user.photoURL} alt="Profile Pic" />
                  <div>
                    <p>{user.displayName}</p>
                    <p>{user.email}</p>
                  </div>
                  <div></div>
                </section>
              </div>
              <a onClick={toggleSettings}>
                Settings{" "}
                <MdKeyboardArrowDown
                  style={{ display: isSettingsOpen ? "none" : "flex" }}
                />{" "}
                <MdKeyboardArrowLeft
                  style={{ display: isSettingsOpen ? "flex" : "none" }}
                />
              </a>
              <div className={`dropdown-items ${isSettingsOpen ? "show" : ""}`}>
                <a className="noSelect" id="deleteSite" onClick={deleteSite}>
                  Delete this website <FaTrashAlt id="trashIcon" />
                </a>
              </div>
            </div>
          </div>
          <div id="shadowFilter"></div>
        </div>

        <a href="../../dashboard">Back to Dashboard</a>

        <button onClick={() => console.log(pageData)}>
          Press me for 'pageData'
        </button>
      </aside>
    </div>
  );
}

export default Editor;
