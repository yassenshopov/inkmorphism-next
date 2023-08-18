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
import {
  FaMobileAlt,
  FaDesktop,
  FaTrashAlt,
  FaPlus,
  FaPalette,
  FaUserAlt,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import Head from "next/head";
import logo from "../styles/images/logoWh.webp";
import { useRouter } from "next/router";
import Loader from "./components/loader.js";
import HideContent from "./components/hideContent.js";
import {
  TfiLayoutMediaLeft,
  TfiImage,
  TfiLayoutColumn3,
  TfiLayoutColumn2,
  TfiWidget,
} from "react-icons/tfi";
import { RxCross1 } from "react-icons/rx";
import { AiFillSetting, AiOutlineUser } from "react-icons/ai";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import { TouchBackend } from "react-dnd-touch-backend";

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

  // This is a smart roundabout => On the initial render, the button is clicked programmatically,
  // and thus the data that's been fetched is displayed on the page.
  useEffect(() => {
    const el = document.getElementById("fetch");
    setLoadBool(true);
    setTimeout(() => {
      el.click();
    }, 3500);
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
        heading: "Heading",
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
    grid2: {
      content: {
        img1: "https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-default%2Fwebsite-default%2Fgrid3_img1.png?alt=media&token=73bdb872-b2dd-4413-845c-4f075cf38af6",
        img2: "https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-default%2Fwebsite-default%2Fgrid3_img2.png?alt=media&token=efa0ed56-6352-4415-858c-a4a861b7cb0a",
        txt1: "This is your new Grid2 section.",
        txt2: "This is your new Grid2 section.",
      },
      options: {
        direction: "",
      },
      type: "grid2",
    },
    grid3: {
      content: {
        img1: "https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-default%2Fwebsite-default%2Fgrid3_img1.png?alt=media&token=73bdb872-b2dd-4413-845c-4f075cf38af6",
        img2: "https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-default%2Fwebsite-default%2Fgrid3_img2.png?alt=media&token=efa0ed56-6352-4415-858c-a4a861b7cb0a",
        img3: "https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-default%2Fwebsite-default%2Fgrid3_img3.png?alt=media&token=a6a99aef-0947-4847-8ed1-979fadc2f5b3",
        txt1: "This is your new Grid3 section.",
        txt2: "This is your new Grid3 section.",
        txt3: "This is your new Grid3 section.",
      },
      options: {
        direction: "",
      },
      type: "grid3",
    },
    hero: {
      content: {
        heading: "This is your new Hero section.",
        txt: "This is your new Hero section.",
        img: "https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-default%2Fwebsite-default%2Fhero_img.png?alt=media&token=cd992c4a-c6c3-4a68-bed7-e0efdeba8df5",
      },
      options: {
        direction: "",
      },
      type: "hero",
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

  function deleteSectionPopup(ind, type) {
    setEditPopupToggle(true);
    setDeleteBtn(
      <>
        <h2>
          <span style={{ fontWeight: 400 }}>Type:</span> {type}
        </h2>
        <p
          onClick={() => {
            deleteSection(ind);
          }}
        >
          Delete this section
        </p>
      </>
    );
  }

  function deleteSection(index) {
    setPageData((pageData) => [
      ...pageData.slice(0, index),
      ...pageData.slice(index + 1),
    ]);
    setBoxes((boxes) => [...boxes.slice(0, index), ...boxes.slice(index + 1)]);
    setEditPopupToggle(false);
    setIsUnsavedChanges(true);
  }

  function addSection(type, index) {
    setPageData((pageData) => [
      ...pageData.slice(0, index),
      newSections[type],
      ...pageData.slice(index),
    ]);
    setBoxes((boxes) => [
      ...boxes.slice(0, index),
      newSections[type],
      ...boxes.slice(index),
    ]);
    setPopupToggle(false);
    setIsUnsavedChanges(true);
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
    {
      id: "grid3",
      icon: <TfiLayoutColumn3 />,
      name: "3-Column Grid",
    },
    {
      id: "grid2",
      icon: <TfiLayoutColumn2 />,
      name: "2-Column Grid",
    },
    {
      id: "hero",
      icon: <TfiWidget />,
      name: "Hero Section",
    },
  ];

  const [popupToggle, setPopupToggle] = useState(false);
  const [editPopupToggle, setEditPopupToggle] = useState(false);
  const [deleteBtn, setDeleteBtn] = useState();
  const [sectionSelection, setSectionsSelection] = useState();

  const Box = ({ id, index, moveBox, content }) => {
    const [{ isDragging }, drag] = useDrag({
      type: "box",
      item: { id, index, type: "box" },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const [{ canDrop, isOver }, drop] = useDrop({
      accept: "box",
      hover(item, monitor) {
        if (!ref.current) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;

        if (dragIndex === hoverIndex) {
          return;
        }

        const hoverBoundingRect = ref.current.getBoundingClientRect();
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }

        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }

        console.log(dragIndex, hoverIndex);

        moveBox(dragIndex, hoverIndex);
        item.index = hoverIndex;
      },
      drop: () => ({ index }),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    });

    const dragRef = useRef(null);
    drag(drop(dragRef));

    return <div ref={dragRef}>{content}</div>;
  };

  useEffect(() => {
    try {
      let main = document.querySelector("main.editor");
      for (let i = 0; i < main.children.length; i++) {
        if (main.children[i].id !== "emptySection") {
          main.children[i].children[0].style.color = getContrastYIQfromBG(
            window.getComputedStyle(main.children[i].children[0])[
              "background-color"
            ]
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, [sectionsData, defaults]);
  function getContrastYIQfromBG(rgbColor) {
    // Extracting the individual color components from the RGB format
    var rgbValues = rgbColor.substring(5, rgbColor.length - 1).split(",");
    var r = parseInt(rgbValues[0].trim());
    var g = parseInt(rgbValues[1].trim());
    var b = parseInt(rgbValues[2].trim());

    // Calculating YIQ value
    var yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? "var(--colorDark)" : "var(--colorLight)";
  }

  let ogTxt = "";

  function turnIntoSection(section, index) {
    try {
      switch (section.type) {
        case "txtOnly":
          return (
            <section
              key={index}
              className={section.type + " " + section.options.direction}
              // style={{ color: getContrastYIQfromBG(index) }}
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
                onFocus={(e) => {
                  ogTxt = e.target.innerText;
                }}
                contentEditable={true}
              >
                {section.content.txt}
              </p>
              <p
                className="editBtn noSelect"
                onClick={() => {
                  deleteSectionPopup(index, "Text Section");
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
            <section className={section.type + " " + section.options.direction}>
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
              <div className="txtWrapper">
                {section.content.h1 !== "" ? (
                  <h2
                    suppressContentEditableWarning={true}
                    onBlur={(e) => {
                      txtFieldChange2(e, index, "heading");
                    }}
                    onFocus={(e) => {
                      ogTxt = e.target.innerText;
                    }}
                    contentEditable={true}
                  >
                    {section.content.heading}
                  </h2>
                ) : null}
                <p
                  suppressContentEditableWarning={true}
                  onBlur={(e) => {
                    txtFieldChange2(e, index, "txt");
                  }}
                  onFocus={(e) => {
                    ogTxt = e.target.innerText;
                  }}
                  contentEditable={true}
                >
                  {section.content.txt}
                </p>
              </div>
              <div className="imgWrapper">
                <img src={section.content.img} draggable={false} />
                <div
                  className="changeImg noSelect"
                  onClick={() => {
                    setIndexOfNewPic(index);
                    setPropNameOfNewPic("img");
                    uploadNewImg();
                  }}
                >
                  Click to change image
                </div>
              </div>
              <p
                className="editBtn noSelect"
                onClick={() => {
                  deleteSectionPopup(index, "Image and Text Section");
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
        case "grid3":
          return (
            <section className={section.type + " " + section.options.direction}>
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
              <article>
                <div className="imgWrapper">
                  <img src={section.content.img1} draggable={false} />
                  <div
                    className="changeImg noSelect"
                    onClick={() => {
                      setIndexOfNewPic(index);
                      setPropNameOfNewPic("img1");
                      uploadNewImg();
                    }}
                  >
                    Click to change image
                  </div>
                </div>
                <p
                  suppressContentEditableWarning={true}
                  onBlur={(e) => {
                    txtFieldChange2(e, index, "txt1");
                  }}
                  onFocus={(e) => {
                    ogTxt = e.target.innerText;
                  }}
                  contentEditable={true}
                >
                  {section.content.txt1}
                </p>
              </article>
              <article>
                <div className="imgWrapper">
                  <img src={section.content.img2} draggable={false} />
                  <div
                    className="changeImg noSelect"
                    onClick={() => {
                      setIndexOfNewPic(index);
                      setPropNameOfNewPic("img2");
                      uploadNewImg();
                    }}
                  >
                    Click to change image
                  </div>
                </div>
                <p
                  suppressContentEditableWarning={true}
                  onBlur={(e) => {
                    txtFieldChange2(e, index, "txt2");
                  }}
                  onFocus={(e) => {
                    ogTxt = e.target.innerText;
                  }}
                  contentEditable={true}
                >
                  {section.content.txt2}
                </p>
              </article>
              <article>
                <div className="imgWrapper">
                  <img src={section.content.img3} draggable={false} />
                  <div
                    className="changeImg noSelect"
                    onClick={() => {
                      setIndexOfNewPic(index);
                      setPropNameOfNewPic("img3");
                      uploadNewImg();
                    }}
                  >
                    Click to change image
                  </div>
                </div>
                <p
                  suppressContentEditableWarning={true}
                  onBlur={(e) => {
                    txtFieldChange2(e, index, "txt3");
                  }}
                  onFocus={(e) => {
                    ogTxt = e.target.innerText;
                  }}
                  contentEditable={true}
                >
                  {section.content.txt3}
                </p>
              </article>
              <p
                className="editBtn noSelect"
                onClick={() => {
                  deleteSectionPopup(index, "3 Column Section");
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
        case "grid2":
          return (
            <section className={section.type + " " + section.options.direction}>
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
              <article>
                <div className="imgWrapper">
                  <img src={section.content.img1} draggable={false} />
                  <div
                    className="changeImg noSelect"
                    onClick={() => {
                      setIndexOfNewPic(index);
                      setPropNameOfNewPic("img1");
                      uploadNewImg();
                    }}
                  >
                    Click to change image
                  </div>
                </div>
                <p
                  suppressContentEditableWarning={true}
                  onBlur={(e) => {
                    txtFieldChange2(e, index, "txt1");
                  }}
                  onFocus={(e) => {
                    ogTxt = e.target.innerText;
                  }}
                  contentEditable={true}
                >
                  {section.content.txt1}
                </p>
              </article>
              <article>
                <div className="imgWrapper">
                  <img src={section.content.img2} draggable={false} />
                  <div
                    className="changeImg noSelect"
                    onClick={() => {
                      setIndexOfNewPic(index);
                      setPropNameOfNewPic("img2");
                      uploadNewImg();
                    }}
                  >
                    Click to change image
                  </div>
                </div>
                <p
                  suppressContentEditableWarning={true}
                  onBlur={(e) => {
                    txtFieldChange2(e, index, "txt2");
                  }}
                  onFocus={(e) => {
                    ogTxt = e.target.innerText;
                  }}
                  contentEditable={true}
                >
                  {section.content.txt2}
                </p>
              </article>
              <p
                className="editBtn noSelect"
                onClick={() => {
                  deleteSectionPopup(index, "2 Column Section");
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
        case "hero":
          return (
            <section className={section.type}>
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
              <div className="txtWrapper">
                {section.content.h1 !== "" ? (
                  <h2
                    suppressContentEditableWarning={true}
                    onBlur={(e) => {
                      txtFieldChange2(e, index, "heading");
                    }}
                    onFocus={(e) => {
                      ogTxt = e.target.innerText;
                    }}
                    contentEditable={true}
                  >
                    {section.content.heading}
                  </h2>
                ) : null}
                <p
                  suppressContentEditableWarning={true}
                  onBlur={(e) => {
                    txtFieldChange2(e, index, "txt");
                  }}
                  onFocus={(e) => {
                    ogTxt = e.target.innerText;
                  }}
                  contentEditable={true}
                >
                  {section.content.txt}
                </p>
              </div>
              <div className="imgWrapper">
                <img src={section.content.img} draggable={false} />
                <div
                  className="changeImg noSelect"
                  onClick={() => {
                    setIndexOfNewPic(index);
                    setPropNameOfNewPic("img");
                    uploadNewImg();
                  }}
                >
                  Click to change image
                </div>
              </div>
              <p
                className="editBtn noSelect"
                onClick={() => {
                  deleteSectionPopup(index, "Image and Text Section");
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
            <nav className={section.type}>
              <a id="navLogo">
                <img
                  // src={defaults.webContent.meta.metaFavicon}
                  src={logoFile}
                  draggable={false}
                  loading="lazy"
                  id="navLogoImg"
                />
                <p>{defaults.name}</p>
              </a>
              {/* <p
                    className="editBtn noSelect"
                    onClick={() => {
                      deleteSectionPopup(index);
                    }}
                  >
                    <BiEdit />
                  </p> */}
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
            <footer className={section.type}>
              <div className="addSection">
                <p
                  onClick={() => {
                    addSectionPopup(index);
                  }}
                >
                  Add section <FaPlus />
                </p>
              </div>
              <p id="watermark">
                Built with Inkmorphism <img src="../logoWh.webp" />
              </p>
              <p
                suppressContentEditableWarning={true}
                onBlur={(e) => {
                  txtFieldChange(e, index);
                }}
                onFocus={(e) => {
                  ogTxt = e.target.innerText;
                }}
                contentEditable={true}
              >
                {section.content.txt}
              </p>
              <p
                className="editBtn noSelect"
                onClick={() => {
                  deleteSectionPopup(index, "Footer");
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
            <section className={section.type + " " + section.options.direction}>
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
                    setPropNameOfNewPic("img");
                    uploadNewImg();
                  }}
                >
                  Click to change image
                </div>
              </div>
              <p
                className="editBtn noSelect"
                onClick={() => {
                  deleteSectionPopup(index, "Image Section");
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
    } catch (err) {
      console.log(err);
    }
  }

  const [boxes, setBoxes] = useState([]);

  const moveBox = (dragIndex, hoverIndex) => {
    const draggedBox = boxes[dragIndex];
    console.log(draggedBox);
    alert("dragIndex: ", dragIndex, " hoverIndex: ", hoverIndex);
    setBoxes(
      update(boxes, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, draggedBox],
        ],
      })
    );
  };

  useEffect(() => {
    if (pageData.length === 0) {
      const emptySection = [
        <section
          key="0"
          id="emptySection"
          className="noSelect"
          onClick={() => addSectionPopup(0)}
        >
          <h2>Your website is a bit empty. Add a section!</h2>
          <img src="../emptyEditor.png" />
        </section>,
      ];
      setSectionsData(emptySection);
    } else {
      const sections = boxes.map((section, index) => {
        return (
          <Box
            id={index}
            index={index}
            key={index}
            moveBox={moveBox}
            content={turnIntoSection(section, index)}
          />
        );
      });
      setSectionsData(sections);
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
      setPublishToggle(defaults.published);
    }
  }, [pageData]);

  useEffect(() => {
    async function asyncFunc() {
      const realUserData = getDoc(doc(db, "users", userName)).then((doc) => {
        try {
          setDarkModeOn(
            doc._document.data.value.mapValue.fields.darkMode.booleanValue
          );
        } catch {
          setDarkModeOn(false);
        }
      });
      if (userName !== "fallback") {
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
                  setBoxes(item.webContent.pages.main.structure);
                  setLogoFile(item.webContent.meta.metaFavicon);
                  setThumbnailFile(item.webContent.meta.metaThumbnail);
                  let gallery = [];
                  try {
                    item.gallery.forEach((doc) => {
                      gallery.push(doc);
                    });
                    setSiteGallery(
                      gallery.map((item, index) => {
                        return (
                          <div key={index} className="galleryItem noSelect">
                            <img src={item.url} />
                          </div>
                        );
                      })
                    );
                  } catch (err) {
                    console.log(err);
                  }
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
        setDarkModeOn(props.darkMode);
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
      uid = "user-" + props.auth.currentUser.uid;
    } catch (err) {
      console.log(err);
      uid = "_";
    }
    const profilePicRef = ref(storage, uid + "/profilePic.png");
      getDownloadURL(profilePicRef).then((metadata) => {
        setUser({
          displayName: props.auth.currentUser.displayName,
          photoURL: metadata,
          email: props.auth.currentUser.email,
        });
      }).catch((err) => {
        console.log(err);
        setUser({
          displayName: props.auth.currentUser.displayName,
          photoURL: "https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-default%2FprofilePic2.png?alt=media&token=64d91b16-4f83-42a9-b297-94f2c5126a06",
          email: props.auth.currentUser.email,
        });        
      });
    setLoadBool(false);
  }

  const [isSaved, setIsSaved] = useState(false);

  async function setDarkModePreference(mode) {
    const user = doc(db, "users", userName);
    await updateDoc(user, {
      darkMode: mode,
    });
  }

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
    try {
      await updateDoc(doc(db, "publicSites", props["name"]), {
        isSynced: false,
      });
    } catch (err) {
      console.log(err);
    }
    setIsSaved(false);
    setIsUnsavedChanges(false);
    setTimeout(() => {
      setIsUnsavedChanges(null);
    }, 4000);
    // setTrigger(!trigger);
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
    sendData(defaults);
  }

  function txtFieldChange2(e, index, property) {
    setPageData((pageData) => [
      ...pageData.slice(0, index),
      {
        ...pageData[index],
        content: {
          ...pageData[index].content,
          [property]: e.target.innerText,
        },
      },
      ...pageData.slice(index + 1),
    ]);
    setBoxes((boxes) => [
      ...boxes.slice(0, index),
      {
        ...boxes[index],
        content: {
          ...boxes[index].content,
          [property]: e.target.innerText,
        },
      },
      ...boxes.slice(index + 1),
    ]);
    if (e.target.innerText !== ogTxt) {
      setIsUnsavedChanges(true);
    }
  }

  function txtFieldChange(e, index) {
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
    setBoxes((boxes) => [
      ...boxes.slice(0, index),
      {
        ...boxes[index],
        content: {
          ...boxes.content,
          txt: e.target.innerText,
          img:
            boxes[index].content.img !== undefined
              ? boxes[index].content.img
              : "",
        },
      },
      ...boxes.slice(index + 1),
    ]);
    if (e.target.innerText !== ogTxt) {
      setIsUnsavedChanges(true);
    }
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
    setIsUnsavedChanges(true);
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

  function delTime() {
    const now = new Date();
    const seconds = Math.round(now.getTime() / 1000);
    const nanoseconds =
      now.getTime() * 1000000 + now.getMilliseconds() * 1000000;
    return { seconds: seconds, nanoseconds: nanoseconds };
  }

  async function deleteSite() {
    await updateDoc(doc(db, "users", userName, "websites", props["name"]), {
      deleted: true,
      delTime: delTime(),
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
  }

  const fileInputRef = useRef(null);
  function replicateFileInputClick() {
    fileInputRef.current.click();
  }

  const [file, setFile] = useState();
  const [fileToUpload, setFileToUpload] = useState("123");
  const [uploadNewImgToggle, setUploadNewImgToggle] = useState(false);
  function showPreview(e) {
    try {
      if (e.target.files[0].size > 4187152) {
        alert("File is bigger than 4 MB. Use a smaller file.");
        e.val = "";
      } else {
        setFile(URL.createObjectURL(e.target.files[0]));
        setFileToUpload(e.target.files[0]);
      }
    } catch (err) {
      console.log(err);
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
    if (logoFileToUpload !== "123") {
      try {
        uid =
          "user-" + props.auth.currentUser.uid + "/" + props.name + "/logo.png";
      } catch (err) {
        uid = "_";
      }
      let logoFileRef = ref(storage, uid);
      let metadata = { contentType: "image/png" };
      // actualUpload(photoRef, metadata);
      // document.getElementById("navLogoImg").src = URL.createObjectURL(logoFileToUpload);
      setPageData((pageData) => [
        ...pageData.slice(0, 0),
        {
          ...pageData[0],
          content: {
            ...pageData.content,
            logo: pageData[0].content.logo,
          },
        },
        ...pageData.slice(1),
      ]);
      setBoxes((boxes) => [
        ...boxes.slice(0, 0),
        {
          ...boxes[0],
          content: {
            ...boxes.content,
            logo: boxes[0].content.logo,
          },
        },
        ...boxes.slice(1),
      ]);
      uploadBytes(logoFileRef, logoFileToUpload, metadata).then((snapshot) => {
        const pngURL = getDownloadURL(logoFileRef).then((url) => {});
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
          const pngURL = getDownloadURL(thumbnailFileRef).then((url) => {
            // setTrigger(!trigger);
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

  function actualUpload(photoRef, metadata, index, property) {
    uploadBytes(photoRef, fileToUpload, metadata).then((snapshot) => {
      const pngURL = getDownloadURL(photoRef).then((url) => {
        setUploadNewImgToggle(false);
        setTimeout(() => {
          setPageData((pageData) => [
            ...pageData.slice(0, index),
            {
              ...pageData[index],
              content: {
                ...pageData[index].content,
                [property]: url,
              },
            },
            ...pageData.slice(index + 1),
          ]);
          setBoxes((boxes) => [
            ...boxes.slice(0, index),
            {
              ...boxes[index],
              content: {
                ...boxes[index].content,
                [property]: url,
              },
            },
            ...boxes.slice(index + 1),
          ]);
          setLoadBool(false);
          setIsUnsavedChanges(true);
          // clearFileInput();
        }, 2000);
      });
    });
  }

  useEffect(() => {
    setActualFileToUpload(fileToUpload);
  }, [fileToUpload]);

  const [actualFileToUpload, setActualFileToUpload] = useState();
  const [indexOfNewPic, setIndexOfNewPic] = useState(1);
  const [propNameOfNewPic, setPropNameOfNewPic] = useState("img1");

  let uid;

  async function uploadFile() {
    setLoadBool(true);
    let randomString = generateRandomString(16);
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
    actualUpload(photoRef, metadata, indexOfNewPic, propNameOfNewPic);
  }

  function clearFileInput() {
    setActualFileToUpload("");
    setFileToUpload("");
    setFile("");
  }

  const [isPublishToggleOn, setPublishToggle] = useState(false);
  const [publishWebsiteToggle, setPublishWebsiteToggle] = useState(false);

  const handlePublishToggle = () => {
    if (!isPublishToggleOn) {
      setPublishWebsiteToggle(!publishWebsiteToggle);
      setPublishToggle(!isPublishToggleOn);
      setData({
        ...defaults,
        published: !isPublishToggleOn,
      });
      // setIsUnsavedChanges(true);
      // saveNewData();
    }
  };

  const [isUnsavedChanges, setIsUnsavedChanges] = useState(null);

  const [isDarkModeOn, setDarkModeOn] = useState(false);

  function toggleDarkMode() {
    setDarkModePreference(!isDarkModeOn);
    setDarkModeOn(!isDarkModeOn);
  }

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkModeOn) {
      root.style.setProperty("--mainLight", "#111519");
      root.style.setProperty("--mainDark", "#fefefe");
    } else {
      root.style.setProperty("--mainLight", "#fefefe");
      root.style.setProperty("--mainDark", "#111519");
    }
  }, [isDarkModeOn]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  const [siteGallery, setSiteGallery] = useState([]);

  return (
    <div className={"Editor" + fsClass + modeClass}>
      <Head>
        <link rel="icon" href={logoFile} />
        <title>{defaults["webContent"]["meta"]["metaTitle"]}</title>
        <meta
          name="description"
          content={defaults["webContent"]["meta"]["metaDescription"]}
        ></meta>
      </Head>

      {loadBool ? <Loader /> : ""}

      {hideContent ? <HideContent /> : ""}

      {/* <dialog open style={{display: "none"}}>
        <p>You are refreshing the page</p>
        <button>Ok</button><button>Maybe</button><button>Cancel</button>
      </dialog> */}

      <main id="editor">
        <nav id="nav">
          {isUnsavedChanges ? (
            <p
              style={{
                backgroundColor: "var(--mainColor2)",
                color: "var(--mainLight)",
                padding: "12px 1vw",
                borderRadius: "12px",
              }}
            >
              You have some unsaved changes ⚠️
            </p>
          ) : isUnsavedChanges === false ? (
            <p style={{ padding: "12px 1vw", borderRadius: "12px" }}>
              All changes saved ✓
            </p>
          ) : (
            <p style={{ padding: "12px 1vw", borderRadius: "12px" }}></p>
          )}
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

        <div id="lowerMenu">
          <div
            id="bgShadow"
            className={
              isStyleOpen || isProfileOpen || isSettingsOpen ? "active" : ""
            }
            onClick={() => {
              setIsStyleOpen(false);
              setIsProfileOpen(false);
              setIsSettingsOpen(false);
            }}
          ></div>
          <div id="actualLowerMenu">
            <div
              id="styleMenu"
              style={{
                display: isStyleOpen ? "flex" : "none",
                flexDirection: "column",
              }}
              // className={`dropdown-items ${isStyleOpen ? "show" : ""}`}
            >
              <h2>Colors</h2>
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
            <div
              id="profileMenu"
              style={{
                display: isProfileOpen ? "flex" : "none",
                flexDirection: "column",
              }}
            >
              <section id="profileSection">
                <div>
                  <img
                    src={user.photoURL}
                    alt="Profile Pic"
                  />
                  <p>{user.displayName}</p>
                  <p>{user.email}</p>
                </div>
                <div></div>
              </section>
            </div>
            <div
              style={{
                display: isSettingsOpen ? "flex" : "none",
                flexDirection: "column",
              }}
              id="settingsMenu"
            >
              <h2>Website Settings</h2>
              <form id="websiteSettings" onSubmit={handleSubmit}>
                <div id="websiteNameWrapper">
                  <label htmlFor="websiteName">Website title:</label>
                  <input
                    id="websiteName"
                    name="websiteName"
                    type="text"
                    defaultValue={defaults.name}
                    placeholder="Enter website name..."
                    onChange={nameChange}
                  />
                  <span onClick={saveNewData} className="noSelect">
                    <RiSave3Fill
                      style={{ display: isSaved ? "none" : "flex" }}
                    />
                    <BsCheckLg style={{ display: isSaved ? "flex" : "none" }} />
                  </span>
                </div>
                <div>
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
                </div>
                <div>
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
                </div>
                <div id="dangerZoneWrapper">
                  <p id="dangerZone">Danger zone</p>
                  <h2>Publish website:</h2>
                  <div
                    className={`noSelect publishToggle ${
                      isPublishToggleOn ? "on" : ""
                    }`}
                    onClick={handlePublishToggle}
                  >
                    <div className="switch"></div>
                    <p>Published</p>
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
              </form>
            </div>
          </div>
          <div id="lowerMenuBtns">
            <p
              onClick={() => {
                setIsStyleOpen((prevstate) => !prevstate);
                setIsProfileOpen(false);
                setIsSettingsOpen(false);
              }}
            >
              <FaPalette />
            </p>
            <p
              onClick={() => {
                setIsProfileOpen((prevstate) => !prevstate);
                setIsStyleOpen(false);
                setIsSettingsOpen(false);
              }}
            >
              <FaUserAlt />
            </p>
            <p
              onClick={() => {
                setIsSettingsOpen((prevstate) => !prevstate);
                setIsStyleOpen(false);
                setIsProfileOpen(false);
              }}
            >
              <AiFillSetting />
            </p>
          </div>
        </div>

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
            <div id="imgUpload">
              <div id="newImgUpload" style={{ flexDirection: "column" }}>
                <p id="message">Upload new image</p>
                <label htmlFor="fileInput" className="fileInputLabel noSelect">
                  Choose your file
                </label>
                <input
                  id="fileInput"
                  className="fileInput"
                  ref={fileInputRef}
                  type="file"
                  placeholder="Upload new picture"
                  accept="image/png, image/gif, image/jpeg"
                  onChange={showPreview}
                />
                <img
                  id="previewPicUpload"
                  src={file}
                  onClick={replicateFileInputClick}
                  className="noSelect"
                />
              </div>
              <div
                style={{
                  flexDirection: "column",
                  display: siteGallery.length !== 0 ? "flex" : "none",
                }}
              >
                <p className="noSelect">Choose from gallery:</p>
                <div id="siteGallery">{siteGallery}</div>
              </div>
            </div>
            <div id="buttons">
              <p
                onClick={() => {
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

        <div
          style={{ display: publishWebsiteToggle ? "flex" : "none" }}
          id="popupWrapper"
        >
          <form id="popup">
            <div id="publishWebsite">
              <p id="message">
                This website is currently on the Free plan. Upgrade to the
                Creator plan to publish your website and gain access to all
                available features.
              </p>
            </div>
            <div id="buttons">
              <p
                onClick={() => {
                  setPublishWebsiteToggle(false);
                }}
                className="noSelect"
              >
                Cancel
              </p>
              <p
                onClick={() => {
                  window.location.href = `/pricing?site=${props["name"]}`;
                }}
                className="noSelect green"
              >
                Upgrade
              </p>
            </div>
          </form>
        </div>

        <div id="mainEditorWrapper">
          <main
            className={defaults["webContent"]["meta"]["metaStyle"] + " editor"}
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
            <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
              {sectionsData}
            </DndProvider>
          </main>
        </div>
      </main>

      <aside>
        <a href="../../dashboard">
          <img id="mainLogo" src={logo.src} />
        </a>
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
        <div id="darkModeToggleWrapper">
          <p>Editor is in: {isDarkModeOn ? "Dark" : "Light"} Mode</p>
          <div
            className={`noSelect darkModeToggle ${
              isDarkModeOn ? "dark" : "light"
            }`}
            onClick={toggleDarkMode}
          >
            <div className="switch"></div>
            <FaSun />
            <FaMoon />
          </div>
          <p>
            (This applies just to the Editor, and not the website project
            itself)
          </p>
        </div>
      </aside>
    </div>
  );
}

export default Editor;
