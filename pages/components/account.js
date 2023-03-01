import { useEffect, useState } from "react"
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth } from "firebase/auth";
import app from "../../firebase/clientApp";
import { BiLoaderAlt } from 'react-icons/bi'

export default function Account(props) {

    const [profilePic, setProfilePic] = useState("")

    const storage = getStorage();
    const auth = getAuth(app);
    let uid;
    try {
        uid = "user-" + auth.currentUser.uid; 
    } catch(err) {
        uid = "_"  
    }

    function uploadFile() {
        try {
            uid = "user-" + auth.currentUser.uid + "/profilePic.png"; 
        } catch(err) {
            uid = "_"  
        }
        let photoRef = ref(storage, uid)
        let metadata = {contentType: "image/png"}
        uploadBytes(photoRef, fileToUpload, metadata).then((snapshot) => {
            window.location.reload(false)
        })
    }

    const [file, setFile] = useState();
    const [fileToUpload, setFileToUpload] = useState()
    function showPreview(e) {
        setFile(URL.createObjectURL(e.target.files[0]))
        setFileToUpload((e.target.files[0]))
    }

    const [popupToggle, setPopupToggle] = useState(false)
    const openPopup = () => {
        setPopupToggle(!popupToggle)
    }

    const profileSec = 
        // return (
        <main id="accountSection">
            <div id="profilePicWrapper">
                <img src={props.profilePic} id="profilePic"/>
                <div className="hiddenMenu" onClick={openPopup}>
                    <p>Change picture</p>
                </div>
            </div>
            <p id="displayName">{props.displayName}</p>
        </main>
        // )    

    return (
        <div id="accountWrapper">
            {(props.profilePic === "") ? <BiLoaderAlt id='loaderSites'/> : profileSec}

            <div style={{ display: ((popupToggle) ? 'flex' : 'none') }} id="popupWrapper">
                <form id="popup">
                    <p id="message">Upload new profile picture</p>
                    <input type="file" placeholder="Upload new picture" accept="image/png, image/gif, image/jpeg" onChange={showPreview}/>
                    <img id="previewPicUpload" src={file} />
                    <div id="buttons">
                        <p onClick={openPopup} className="noSelect">Cancel</p>
                        <p onClick={uploadFile} className="noSelect green">Upload</p>
                    </div>
                </form>
            </div>
        </div>
    )
}