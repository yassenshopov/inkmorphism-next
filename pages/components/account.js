import { useEffect, useState } from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import app from "../../firebase/clientApp";
import { BiLoaderAlt } from "react-icons/bi";
import { useRouter } from "next/router";
import { MdKeyboardArrowDown, MdKeyboardArrowLeft } from "react-icons/md";

export default function Account(props) {
  console.log(props);
  const [profilePic, setProfilePic] = useState("");
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
  const [isPersonalDetailsMenuOpen, setIsPersonalDetailsMenuOpen] =
    useState(true);
  const [isPrivacyMenuOpen, setIsPrivacyMenuOpen] = useState(true);

  const profileSec = (
    <main id="accountSection">
      <section id="personalDetailsSection">
        <h2
          onClick={() => {
            setIsPersonalDetailsMenuOpen(!isPersonalDetailsMenuOpen);
          }}
          className="noSelect"
        >
          Personal details{" "}
          <span>
            <MdKeyboardArrowDown />
          </span>
        </h2>
        <div
          className={"dropdownContent " + (isPersonalDetailsMenuOpen ? "clicked" : "") }
        >
          <div id="profilePicWrapper">
            <img src={props.profilePic} id="profilePic" />
            <div className="hiddenMenu noSelect" onClick={openPopup}>
              <p>Change picture</p>
            </div>
          </div>
          {/* <p id="displayName">{props.userInfo.name || props.displayName}</p> */}
        </div>
      </section>
      <section id="openAIAPISection">
        <h2
          onClick={() => {
            // router.push("/openAIAPI");
          }}
          className="noSelect"
        >
          OpenAI API
        </h2>
        <div className="dropdownContent clicked">
          <p>API key: {props.userInfo.openAIAPIKey || "None"}</p>
          <p>API secret: {props.userInfo.openAIAPIKeySecret || "None"}</p>
        </div>
      </section>
      <section id="privacySection">
        <h2
          onClick={() => {
            setIsPrivacyMenuOpen(!isPrivacyMenuOpen);
          }}
          className="noSelect"
        >
          {" "}
          Privacy{" "}
          <span>
            <MdKeyboardArrowDown />
          </span>
        </h2>
        <div
          className={"dropdownContent " + (isPrivacyMenuOpen ? "clicked" : "") }
        >
          {isResetPassBtnClicked ? (
            <p>You will receive an email by us shortly</p>
          ) : (
            <p id="resetPassBtn" onClick={sendReset}>
              Reset your password
            </p>
          )}
        </div>
      </section>
    </main>
  );

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
