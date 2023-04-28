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
  const [deletedWebsites, setDeletedWebsites] = useState([]);
  const [deletedSitesLen, setDeletedSitesLen] = useState(0);
  const [sitesTotal, setSitesTotal] = useState(0);
  let profile_pic;

  function daysTillDeletion(obj) {
    try {
      const now = new Date();
      const deletionDate = new Date(
        obj.seconds * 1000 + obj.nanoseconds / 1000000
      );
      const daysPassed = Math.floor(
        (now - deletionDate) / (1000 * 60 * 60 * 24)
      );
      const daysLeft = 29 - daysPassed;
      return daysLeft;
    } catch (err) {
      return 0;
    }
  }

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
      websitesArray.existing.sort((a, b) => {
        // First, sort by the 'published' property
        if (a.published && !b.published) {
          return -1;
        } else if (!a.published && b.published) {
          return 1;
        } else {
          // If both have the same 'published' property value, sort alphabetically by the 'domainSlug' property
          return a.domainSlug.localeCompare(b.domainSlug);
        }
      });
      const websites = websitesArray.existing.map((site) => (
        <a
          key={site.domain}
          href={"../config/" + site.domainSlug}
          className="noSelect"
          style={{
            backgroundColor: site.published ? "#ffffff10" : "#00000020",
          }}
        >
          <div className="imgWrapper">
            <img
              src={site.thumbnail === "" ? placeholder.src : site.thumbnail}
              loading="lazy"
            />
          </div>
          <h2>{site.name}</h2>
          <p>{site.style}</p>
          <div>
            {/* <a href={"https://" + site.domain} target="_blank">
              {site.domain}
            </a> */}
            <a
              href={"https://inkmorphism.com/sites/" + site.domainSlug}
              target="_blank"
            >
              {"inkmorphism.com/sites/" + site.domainSlug}
            </a>
          </div>
          {site.published ? (
            <div className="publishedCheck">
              <p>
                Published <AiOutlineCheck />
              </p>
            </div>
          ) : (
            <div
              className={
                "publishedCheck " +
                (site.published ? "published" : "notPublished")
              }
            >
              <p>
                Not published <AiOutlineClose />
              </p>
            </div>
          )}
          {/* <p>{site.initDate}</p> */}
        </a>
      ));
      const deletedSites = websitesArray.deleted.map((site) => {
        if (daysTillDeletion(site.delTime) < 1) {
          return null
        } else {
          return (
            <a
              key={site.domain}
              href={"../config/" + site.domainSlug}
              className="noSelect deletedWebsites"
              style={{
                backgroundColor: site.published ? "#ffffff10" : "#00000020",
                display: daysTillDeletion(site.delTime) < 1 ? "none" : "grid",
              }}
            >
              <h2>{site.name}</h2>
              <div>
                {/* <a href={"https://" + site.domain} target="_blank">
                {site.domain}
              </a> */}
                <a
                  href={"https://inkmorphism.com/sites/" + site.domainSlug}
                  target="_blank"
                >
                  {"inkmorphism.com/sites/" + site.domainSlug}
                </a>
              </div>
              <p>
                {daysTillDeletion(site.delTime).toString() +
                  " days till full deletion"}
              </p>
              <div className="imgWrapper">
                <img
                  src={site.thumbnail === "" ? placeholder.src : site.thumbnail}
                  loading="lazy"
                />
              </div>
            </a>
          );
        }
      }).filter((site) => site !== null);
      console.log(deletedSites);
      setDeletedSitesLen(deletedSites.length);
      setSitesTotal(websitesArray.existing.length);
      setData(websites);
      setDeletedWebsites(deletedSites);
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
      <Dash
        sitesTotal={sitesTotal}
        theData={theData}
        deletedSites={deletedWebsites}
        deletedSitesLen={deletedSitesLen}
      />
      <Dashfooter />
    </div>
  );
}
