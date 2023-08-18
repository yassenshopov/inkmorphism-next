import Head from "next/head";
import Dashnav from "./components/dashnav.js";
import Dashfooter from "./components/dashfooter.js";
import Account from "./components/account.js";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
import app from "../firebase/clientApp";
import { useEffect, useState } from "react";
import defaultProfilePic from "../styles/images/defaultProfilePic.png";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore/lite";
import MainFooter from "./components/MainFooter.js";

let userInfoRendered = {
  name: "Default",
};

export default function Templates() {
  const [userDataDB, setUserDB] = useState({
    photoURL: "",
  });

  useEffect(() => {
    const el = document.getElementById("fetch");
    setTimeout(() => {
      el.click();
    }, 1500);
  }, []);

  const auth = getAuth(app);

  const [userData, setUserData] = useState({
    profile_pic: defaultProfilePic.src,
    displayName: "Default",
  });

  async function getData() {
    let db = getFirestore(app);
    const auth = getAuth(app);
    let uid;
    try {
      uid = "user-" + auth.currentUser.uid;
    } catch (err) {
      uid = "_";
    }

    const userInfoRef = doc(db, "users", uid);
    const userInfo = await getDoc(
      doc(db, "users", "user-" + auth.currentUser.uid)
    ).then((info) => {
      userInfoRendered = info.data();
    });
    const storage = getStorage();
    const storageRef = ref(storage, uid + "/profilePic.png");
    getDownloadURL(storageRef)
      .then(async (metadata) => {
        setUserDB({
          photoURL: metadata,
        });
        try {
          // profile_pic = auth.currentUser.photoURL;
          setUserData({
            profile_pic: metadata,
            // profile_pic: auth.currentUser.photoURL,
            displayName: auth.currentUser.displayName,
          });
        } catch (err) {
          console.log(err);
        }
        // Metadata now contains the metadata for 'images/forest.jpg'
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
        try {
          setUserDB({
            photoURL:
              "https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-default%2FprofilePic2.png?alt=media&token=64d91b16-4f83-42a9-b297-94f2c5126a06",
          });
          setUserData({
            profile_pic: "https://firebasestorage.googleapis.com/v0/b/inkmorphism.appspot.com/o/user-default%2FprofilePic2.png?alt=media&token=64d91b16-4f83-42a9-b297-94f2c5126a06",
            displayName: auth.currentUser.displayName,
          });
        } catch (err) {
          console.log(err);
        }
      });
  }

  return (
    <div className={"Account"}>
      <Head>
        {/* <link rel="icon" href={defaultFiles['logo']} /> */}
        <link rel="icon" href="/faviconWh.ico" />
        <title>Inkmorphism - My account</title>
      </Head>

      <button id="fetch" onClick={getData}></button>

      <Dashnav profile_pic={userData.profile_pic} auth={auth} />

      <Account
        profilePic={userDataDB.photoURL}
        displayName={userData.displayName}
        userInfo={userInfoRendered}
      />

      <MainFooter />
    </div>
  );
}
