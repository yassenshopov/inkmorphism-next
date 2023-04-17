import app from "../firebase/clientApp";
import {
  getFirestore,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore/lite";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
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
import { TfiLayoutMediaLeft, TfiImage } from "react-icons/tfi";
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
  const [pageData, setPageData] = useState([]);
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

  // function getUserData() {
  //   const storageRef = ref(storage, uid + "/profilePic.png");

  //   const user = doc(db, "users", userName, "websites", props.name);
  //   const data = await getDoc(col)
  //     .then((doc) => {
  //       dataArr.push(doc.data());
  //       dataArr.forEach((item) => {
  //         if (item !== undefined) {
  //           try {
  //             setData(item);
  //             setPageData(item.webContent.pages.main.structure);
  //             setLogoFile(item.webContent.meta.metaFavicon);
  //             setThumbnailFile(item.webContent.meta.metaThumbnail);
  //           } catch (err) {
  //             console.log(err);
  //           }
  //         }
  //       });
  //     })
  //   setUser()
  // }

  // This is a smart roundabout => On the initial render, the button is clicked programmatically,
  // and thus the data that's been fetched is displayed on the page.
  useEffect(() => {
    const el = document.getElementById("fetch");
    setLoadBool(true);
    setTimeout(() => {
      el.click();
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
        img: "https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-default%2Fwebsite-default%2FimgAndTxt.png?alt=media&token=754fc70d-7640-4975-9077-6d46b953d15b",
      },
      options: {
        direction: "reverseHorizontal",
      },
      type: "imgAndTxt",
    },
    imgOnly: {
      content: {
        img: "https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-default%2Fwebsite-default%2FimgOnly.png?alt=media&token=ec1b1d09-f378-4223-8f47-13e6469d5ebb",
      },
      options: {
        direction: "",
      },
      type: "imgOnly",
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
            className="noSelect"
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
    {
      id: "imgOnly",
      icon: <TfiImage />,
      name: "Image Section",
    },
  ];
  const [trigger, setTrigger] = useState(false);
  const [popupToggle, setPopupToggle] = useState(false);
  const [editPopupToggle, setEditPopupToggle] = useState(false);
  const [deleteBtn, setDeleteBtn] = useState();
  const [sectionSelection, setSectionsSelection] = useState();

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
                onBlur={(e) => {
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
                onBlur={(e) => {
                  txtFieldChange(e, index);
                }}
                contentEditable={true}
              >
                {section.content.txt}
              </p>
              <div className="imgWrapper">
                <img src={section.content.img} draggable={false} />
                <div
                  className="changeImg noSelect"
                  onClick={() => {
                    setIndexOfNewPic(index);
                    uploadNewImg();
                  }}
                >
                  Click to change image
                </div>
              </div>
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
              <a id="navLogo">
                <img
                  src={defaults.webContent.meta.metaFavicon}
                  draggable={false}
                  loading="lazy"
                />
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
        case "footer":
          return (
            <footer className={section.type} key={index}>
              <div className="addSection">
                <p
                  onClick={() => {
                    addSectionPopup(index);
                  }}
                >
                  Add section <FaPlus />
                </p>
              </div>
              <p
                suppressContentEditableWarning={true}
                onBlur={(e) => {
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
              {/* <div className="addSection">
                  <p
                    onClick={() => {
                      addSectionPopup(index + 1);
                    }}
                  >
                    Add section <FaPlus />
                  </p>
                </div> */}
            </footer>
          );
        case "imgOnly":
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
              <div className="imgWrapper">
                <img
                  src={section.content.img}
                  draggable={false}
                  loading="lazy"
                />
                <div
                  style={{ borderRadius: 0 }}
                  className="changeImg noSelect"
                  onClick={() => {
                    setIndexOfNewPic(index);
                    uploadNewImg();
                  }}
                >
                  Click to change image
                </div>
              </div>
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
    setPublishToggle(defaults.published)
  }, [pageData, trigger]);

  useEffect(() => {
    async function asyncFunc() {
      if (userName !== "fallback") {
        console.log(userName, props.name);
        const col2 = collection(db, "users", userName, "websites");
        const data2 = await getDocs(col2).then((snapshot) => {
          let checkPrivacy = false;
          snapshot.forEach((doc) => {
            if (doc.data().domainSlug === props.name) {
              checkPrivacy = true;
            }
          });
          if (checkPrivacy === false) {
            setHideContent(true);
          }
        });
        col = doc(db, "users", userName, "websites", props.name);
        const data = await getDoc(col)
          .then((doc) => {
            dataArr.push(doc.data());
            dataArr.forEach((item) => {
              if (item !== undefined) {
                try {
                  setData(item);
                  setPageData(item.webContent.pages.main.structure);
                  setLogoFile(item.webContent.meta.metaFavicon);
                  setThumbnailFile(item.webContent.meta.metaThumbnail);
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
    try {
      uid =
        "user-" +
        props.auth.currentUser.uid
    } catch (err) {
      console.log(err)
      uid = "_";
    }
    const profilePicRef = ref(storage, uid + "/profilePic.png");
    try {
      // const profilePic = getDoc(profilePicRef);
      getDownloadURL(profilePicRef).then((metadata) => {
        console.log(metadata);
        setUser({
          displayName: props.auth.currentUser.displayName,
          photoURL: metadata,
          email: props.auth.currentUser.email,
        });
      });
    } catch (err) {
      console.log(err);
    }
    // console.log(profilePic);
    setLoadBool(false);
  }

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
    if (savedData.published) {
      await setDoc(doc(db, "publicSites", props["name"]), savedData);
    }
    console.log(savedData);
    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
    setTrigger(!trigger);
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
    console.log(e, index);
    console.log(pageData);
    setPageData((pageData) => [
      ...pageData.slice(0, index),
      {
        ...pageData[index],
        content: {
          ...pageData.content,
          txt: e.target.innerText,
          img:
            pageData[index].content.img !== undefined
              ? pageData[index].content.img
              : "",
        },
      },
      ...pageData.slice(index + 1),
    ]);
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

  const nameChange = (e) => {
    let value = e.target.value;
    setData({
      ...defaults,
      name: value,
    });
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

  function handleSubmit(event) {
    event.preventDefault();
  }

  function uploadNewImg(index) {
    setUploadNewImgToggle(true);
    console.log(index);
  }

  const [file, setFile] = useState();
  const [fileToUpload, setFileToUpload] = useState("123");
  const [uploadNewImgToggle, setUploadNewImgToggle] = useState(false);
  function showPreview(e) {
    if (e.target.files[0].size > 4187152) {
      alert("File is bigger than 4 MB. Use a smaller file.");
      e.val = "";
    } else {
      setFile(URL.createObjectURL(e.target.files[0]));
      setFileToUpload(e.target.files[0]);
    }
  }

  const [logoFile, setLogoFile] = useState();
  const [logoFileToUpload, setLogoFileToUpload] = useState("123");

  function showLogoPreview(e) {
    try {
      if (e.target.files[0].size > 4187152) {
        alert("File is bigger than 4 MB. Use a smaller file.");
        e.val = "";
      } else {
        setLogoFile(URL.createObjectURL(e.target.files[0]));
        setLogoFileToUpload(e.target.files[0]);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    console.log(logoFileToUpload);
    if (logoFileToUpload !== "123" && 1) {
      try {
        uid =
          "user-" + props.auth.currentUser.uid + "/" + props.name + "/logo.png";
      } catch (err) {
        uid = "_";
      }
      let logoFileRef = ref(storage, uid);
      let metadata = { contentType: "image/png" };
      // actualUpload(photoRef, metadata);
      uploadBytes(logoFileRef, logoFileToUpload, metadata).then((snapshot) => {
        console.log(snapshot);
        const pngURL = getDownloadURL(logoFileRef).then((url) => {
          console.log(url);
          setTrigger(!trigger);
        });
      });
    }
  }, [logoFileToUpload]);

  const [thumbnailFile, setThumbnailFile] = useState();
  const [thumbnailFileToUpload, setThumbnailFileToUpload] = useState("123");

  function showThumbnailPreview(e) {
    try {
      if (e.target.files[0].size > 4187152) {
        alert("File is bigger than 4 MB. Use a smaller file.");
        e.val = "";
      } else {
        setThumbnailFile(URL.createObjectURL(e.target.files[0]));
        setThumbnailFileToUpload(e.target.files[0]);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    console.log(thumbnailFileToUpload);
    if (thumbnailFileToUpload !== "123" && 1) {
      try {
        uid =
          "user-" +
          props.auth.currentUser.uid +
          "/" +
          props.name +
          "/thumbnail.png";
      } catch (err) {
        uid = "_";
      }
      let thumbnailFileRef = ref(storage, uid);
      let metadata = { contentType: "image/png" };
      uploadBytes(thumbnailFileRef, thumbnailFileToUpload, metadata).then(
        (snapshot) => {
          console.log(snapshot);
          const pngURL = getDownloadURL(thumbnailFileRef).then((url) => {
            console.log(url);
            setTrigger(!trigger);
          });
        }
      );
    }
  }, [thumbnailFileToUpload]);

  function generateRandomString(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function actualUpload(photoRef, metadata, index) {
    uploadBytes(photoRef, fileToUpload, metadata).then((snapshot) => {
      console.log("Uploaded a file:", snapshot.metadata.name);
      console.log(snapshot);
      const pngURL = getDownloadURL(photoRef).then((url) => {
        console.log(url);
        setUploadNewImgToggle(false);
        setTimeout(() => {
          setPageData((pageData) => [
            ...pageData.slice(0, index),
            {
              ...pageData[index],
              content: {
                ...pageData.content,
                txt:
                  pageData[index].content.txt !== undefined
                    ? pageData[index].content.txt
                    : "",
                img: url,
              },
            },
            ...pageData.slice(index + 1),
          ]);
          // clearFileInput();
        }, 2000);
      });
    });
  }

  useEffect(() => {
    console.log(fileToUpload);
    setActualFileToUpload(fileToUpload);
  }, [fileToUpload]);

  const [actualFileToUpload, setActualFileToUpload] = useState();
  const [indexOfNewPic, setIndexOfNewPic] = useState(1);

  let uid;

  async function uploadFile() {
    let randomString = generateRandomString(16);
    console.log(props);
    try {
      uid =
        "user-" +
        props.auth.currentUser.uid +
        "/" +
        props.name +
        "/" +
        randomString +
        ".png";
    } catch (err) {
      uid = "_";
    }

    let photoRef = ref(storage, uid);
    let metadata = { contentType: "image/png" };
    actualUpload(photoRef, metadata, indexOfNewPic);
  }

  function clearFileInput() {
    setActualFileToUpload("");
    setFileToUpload("");
    setFile("");
  }

  const [isPublishToggleOn, setPublishToggle] = useState(false);

  const handlePublishToggle = () => {
    setPublishToggle(!isPublishToggleOn);
    setData({
      ...defaults,
      published: !isPublishToggleOn,
    });
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
              className="noSelect"
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

        <div
          style={{ display: uploadNewImgToggle ? "flex" : "none" }}
          id="popupWrapper"
        >
          <form id="popup">
            {/* <p onClick={() => uploadFile()}>Click for upload</p> */}
            <p id="message">Upload new image</p>
            <input
              type="file"
              placeholder="Upload new picture"
              accept="image/png, image/gif, image/jpeg"
              onChange={showPreview}
            />
            <img id="previewPicUpload" src={file} />
            <div id="buttons">
              <p
                onClick={() => {
                  console.log(uploadNewImgToggle);
                  setUploadNewImgToggle(false);
                }}
                className="noSelect"
              >
                Cancel
              </p>
              <p onClick={() => uploadFile()} className="noSelect green">
                Upload
              </p>
            </div>
          </form>
        </div>
        <div id="mainEditorWrapper">
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
        </div>
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
                {/* This is a TODO section */}
                {/* <div id="websiteStyle">
                  <label for="websiteStyle" class="label">
                    Website Style:
                  </label>
                  <select name="websiteStyle" class="dropdown">
                    <option value="neobrutalism" selected>
                      Simple
                    </option>
                    <option value="neobrutalism">Neobrutalism</option>
                    <option value="glassmorphism">Glassmorphism</option>
                    <option value="minimalism">Minimalism</option>
                  </select>
                </div> */}
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
                  <div>
                    <img src={user.photoURL} alt="Profile Pic" />
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
                <form id="websiteSettings" onSubmit={handleSubmit}>
                  <div id="websiteNameWrapper">
                    <label htmlFor="websiteName">Website Title</label>
                    <input
                      id="websiteName"
                      name="websiteName"
                      type="text"
                      defaultValue={defaults.name}
                      placeholder="Enter website name..."
                      onChange={nameChange}
                    />
                    <span onClick={saveNewData}>
                      <RiSave3Fill
                        style={{ display: isSaved ? "none" : "flex" }}
                      />
                      <BsCheckLg
                        style={{ display: isSaved ? "flex" : "none" }}
                      />
                    </span>
                  </div>
                  <label id="message" htmlFor="changeLogo">
                    Change logo:
                  </label>
                  <input
                    type="file"
                    placeholder="Upload new picture"
                    name="changeLogo"
                    id="changeLogo"
                    accept="image/png, image/gif, image/jpeg"
                    onChange={showLogoPreview}
                  />
                  <img id="logoPreview" src={logoFile} />
                  <label id="message" htmlFor="changeThumbnail">
                    Change thumbnail:
                  </label>
                  <input
                    type="file"
                    placeholder="Upload new picture"
                    name="changeThumbnail"
                    id="changeThumbnail"
                    accept="image/png, image/gif, image/jpeg"
                    onChange={showThumbnailPreview}
                  />
                  <img id="thumbnailPreview" src={thumbnailFile} />
                </form>
                <a>Danger zone</a>
                <div id="publishWebsite">
                  <p>Publish website:</p>
                  <div
                    className={`publishToggle ${isPublishToggleOn ? "on" : ""}`}
                    onClick={handlePublishToggle}
                  >
                    <div className="switch"></div>
                    <p>Published</p>
                  </div>
                </div>
                <a
                  className="noSelect"
                  id="deleteSite"
                  onClick={deleteSite}
                  style={{ fontSize: "1.2rem" }}
                >
                  Delete this website <FaTrashAlt id="trashIcon" />
                </a>
              </div>
            </div>
          </div>
          <div id="shadowFilter"></div>
        </div>

        <div id="backBtnWrapper">
          <a href="../../dashboard" id="backBtn" className="noSelect">
            ← Back to Dashboard
          </a>
        </div>

        {/* <button onClick={() => console.log(pageData)}>
          Press me for 'pageData'
        </button> */}
      </aside>
    </div>
  );
}

export default Editor;
