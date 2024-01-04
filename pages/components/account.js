import { useEffect, useState } from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import app from "../../firebase/clientApp";
import { BiLoaderAlt } from "react-icons/bi";
import { useRouter } from "next/router";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowLeft,
  MdModeEdit,
} from "react-icons/md";
import { IoCodeSlash } from "react-icons/io5";

export default function Account(props) {
  console.log(props);
  let router = useRouter();

  const storage = getStorage();
  const auth = getAuth(app);
  let uid;
  try {
    uid = "user-" + auth.currentUser.uid;
  } catch (err) {
    uid = "_";
  }

  function uploadFile() {
    try {
      uid = "user-" + auth.currentUser.uid + "/profilePic.png";
    } catch (err) {
      uid = "_";
    }
    let photoRef = ref(storage, uid);
    let metadata = { contentType: "image/png" };
    uploadBytes(photoRef, fileToUpload, metadata).then((snapshot) => {
      window.location.reload(false);
    });
  }

  const [file, setFile] = useState();
  const [fileToUpload, setFileToUpload] = useState();
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

  const [popupToggle, setPopupToggle] = useState(false);
  const openPopup = () => {
    setPopupToggle(!popupToggle);
  };

  function sendReset() {
    setIsResetPassBtnClicked(true);
    sendPasswordResetEmail(auth, auth.currentUser.email)
      .then(() => {
        // Password reset email sent!
        // ..
        auth.signOut();
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  const [isResetPassBtnClicked, setIsResetPassBtnClicked] = useState(false);
  const [isDevMode, setIsDevMode] = useState(true);
  const [openMenu, setOpenMenu] = useState([true, false, false]);

  const profileSec = (
    <main id="accountSection">
      <section id="personalDetailsSection">
        <h2
          onClick={() => {
            setOpenMenu([!openMenu[0], false, false]);
          }}
          className="noSelect"
        >
          Personal details{" "}
          <span>
            <MdKeyboardArrowDown />
          </span>
        </h2>
        <div className={"dropdownContent " + (openMenu[0] ? "clicked" : "")}>
          <h3>Change your profile picture</h3>
          <div id="profilePicWrapper">
            <img src={props.profilePic} id="profilePic" />
            <MdModeEdit className="editIcon" />
            <div className="hiddenMenu noSelect" onClick={openPopup}>
              <p>Change picture</p>
            </div>
          </div>
          {/* <p id="displayName">{props.userInfo.name || props.displayName}</p> */}
        </div>
      </section>
      <section id="privacySection">
        <h2
          onClick={() => {
            setOpenMenu([false, !openMenu[1], false]);
          }}
          className="noSelect"
        >
          {" "}
          Privacy{" "}
          <span>
            <MdKeyboardArrowDown />
          </span>
        </h2>
        <div className={"dropdownContent " + (openMenu[1] ? "clicked" : "")}>
          {isResetPassBtnClicked ? (
            <p>You will receive an email by us shortly</p>
          ) : (
            <p id="resetPassBtn" onClick={sendReset}>
              Reset your password
            </p>
          )}
        </div>
      </section>
      <section id="openAIAPISection">
        <h2
          onClick={() => {
            setOpenMenu([false, false, !openMenu[2]]);
          }}
          className="noSelect"
        >
          {isDevMode ? (
            <div className="devModeIcon">
              <IoCodeSlash />
            </div>
          ) : (
            ""
          )}
          OpenAI API
          <span>
            <MdKeyboardArrowDown />
          </span>
        </h2>
        <div className={"dropdownContent " + (openMenu[2] ? "clicked" : "")}>
          {props.userInfo.openAIAPIKey && props.userInfo.openAIAPIKeySecret ? (
            <>
              <h3>Connected to OpenAI API</h3>
              <p>
                API key:
                <input
                  type="text"
                  placeholder="**************"
                  className="keysInput"
                  disabled
                ></input>
              </p>
              <p>
                API secret:
                <input
                  type="text"
                  placeholder="**************"
                  className="keysInput"
                  disabled
                ></input>
              </p>
            </>
          ) : (
            <>
              <h3>You haven't connected your OpenAI API key yet.</h3>
              <p>
                API key:
                <input
                  type="text"
                  placeholder="API key..."
                  className="keysInput"
                ></input>
              </p>
              <p>
                API secret:
                <input
                  type="text"
                  placeholder="API secret..."
                  className="keysInput"
                ></input>
              </p>
              <p>
                <a
                  href="https://beta.openai.com/account/api-keys"
                  target="_blank"
                >
                  Get your API key here
                </a>
              </p>
            </>
          )}
        </div>
      </section>
    </main>
  );

  console.log(props);

  return (
    <div id="accountWrapper">
      {props.profilePic === "" ? <BiLoaderAlt id="loaderSites" /> : profileSec}

      <div style={{ display: popupToggle ? "flex" : "none" }} id="popupWrapper">
        <form id="popup">
          <p id="message">Upload new profile picture</p>
          <input
            type="file"
            placeholder="Upload new picture"
            accept="image/png, image/gif, image/jpeg"
            onChange={showPreview}
          />
          <img id="previewPicUpload" src={file} />
          <div id="buttons">
            <p onClick={openPopup} className="noSelect">
              Cancel
            </p>
            <p onClick={uploadFile} className="noSelect green">
              Upload
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
