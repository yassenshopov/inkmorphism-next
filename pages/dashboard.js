import Head from "next/head";
import Dashnav from "./components/dashnav.js";
import Dashfooter from "./components/dashfooter.js";
import Dash from "./components/dash.js";
import { getAuth } from "firebase/auth";
import app from "../firebase/clientApp";
import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore/lite";
import placeholder from "../styles/images/placeholder.png";
import defaultProfilePic from "../styles/images/defaultProfilePic.png";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

export default function Dashboard() {
  // const [folderName, setFolderName] = useState('default');
  // const [pageTitle, setPageTitle] = useState('default');

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch('/api/create-page', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ folderName, pageTitle })
  //     });

  //     const data = await response.json();
  //     console.log(data.message);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  const [userDataDB, setUserDB] = useState({
    photoURL: "",
  });
  const auth = getAuth(app);

  const [userData, setUserData] = useState({
    profile_pic: defaultProfilePic.src,
    displayName: "Default",
  });

  useEffect(() => {
    const el = document.getElementById("fetch");
    setTimeout(() => {
      el.click();
    }, 1500);
  }, []);

  const [theData, setData] = useState("");
  const [sitesTotal, setSitesTotal] = useState(0);
  let profile_pic;

  async function getData() {
    try {
      let db = getFirestore(app);
      const auth = getAuth(app);
      let uid;
      try {
        uid = "user-" + auth.currentUser.uid;
      } catch (err) {
        uid = "_";
      }
      const col = collection(db, `users/` + uid + `/websites`);
      let data = await getDocs(col);
      let dbRenderedData = [];
      for (let entry in data._docs) {
        dbRenderedData.push(data._docs[entry].data());
      }
      const websitesArray = dbRenderedData.reduce(
        (obj, site) => {
          site.deleted ? obj.deleted.push(site) : obj.existing.push(site);
          return obj;
        },
        { deleted: [], existing: [] }
      );
      const websites = websitesArray.existing.map((site) => (
        <a
          key={site.domain}
          href={"../config/" + site.domainSlug}
          className="noSelect"
        >
          {/* < FaCircle /> */}
          <img
            src={site.thumbnail === "" ? placeholder.src : site.thumbnail}
            loading="lazy"
          />
          <h2>{site.name}</h2>
          <p>{site.style}</p>
          <p target="_blank">{site.domain}</p>
          {site.published ? (
            <div className="publishedCheck">
              <p>
                Published <AiOutlineCheck />
              </p>
            </div>
          ) : (
            <div className="publishedCheck">
            <p>
              Not published <AiOutlineClose />
            </p>
          </div>
          )}
          {/* <p>{site.initDate}</p> */}
        </a>
      ));
      setSitesTotal(websitesArray.existing.length);
      setData(websites);
      const storage = getStorage();
      const storageRef = ref(storage, uid + "/profilePic.png");
      getDownloadURL(storageRef)
        .then((metadata) => {
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
          } catch (err) {}
          // Metadata now contains the metadata for 'images/forest.jpg'
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
          try {
            console.log(userDataDB);
            // profile_pic = auth.currentUser.photoURL;
            setUserData({
              profile_pic: auth.currentUser.photoURL,
              // profile_pic: auth.currentUser.photoURL,
              displayName: auth.currentUser.displayName,
            });
          } catch (err) {}
        });
    } catch (err) {
      window.location.href = "../login";
    }
  }

  // console.log(auth)
  // if (auth.currentUser === null) {
  //   window.location.href = "../login";
  // }

  return (
    <div className={"Dashboard"}>
      <Head>
        <link rel="icon" href="/faviconWh.ico" />
        <title>Inkmorphism - Your Dashboard</title>
      </Head>

      <button id="fetch" onClick={getData}></button>

      <Dashnav profile_pic={userData.profile_pic} auth={auth} />
      <Dash sitesTotal={sitesTotal} theData={theData} />
      <Dashfooter />
    </div>
  );
}
