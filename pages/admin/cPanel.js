import Head from "next/head";
import { useEffect, useState } from "react";
import app from "../../firebase/clientApp";
import {
  getFirestore,
  getDoc,
  doc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";

let publicSites = [];

export default function CPanel() {
  const [folderName, setFolderName] = useState("default");
  const [pageTitle, setPageTitle] = useState("default");

  let uid;
  const auth = getAuth(app);
  let db = getFirestore(app);

  async function getData() {
    try {
      try {
        uid = "user-" + auth.currentUser.uid;
      } catch (err) {
        uid = "_";
      }
      const userInfo = doc(db, `users/` + uid);
      let data = await getDoc(userInfo);
      setIsAdmin(data.data().isAdmin);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const el = document.getElementById("fetch");
    setTimeout(() => {
      el.click();
    }, 1500);
  }, []);

  const create = async () => {
    publicSites.forEach(async (item, index) => {
      const response = await fetch(
        "http://localhost:3000/api/create-static-page",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ item }),
        }
      );
    });
    setTimeout(() => {
      setIsOperationDone(true);
    }, 1000);
  };

  async function getPublicSitesData() {
    const ref = collection(db, "publicSites");
    console.log(ref);
    try {
      const data = await getDocs(ref).then((doc) => {
        // console.log(doc._docs)
        doc._docs.forEach((item, index) => {
          publicSites.push(item.data());
          console.log(publicSites);
        });
        setGetDataBtn(false);
      });
      // dataArr.push(doc.data());
      // dataArr.forEach((item, index) => {
      //   if (item !== undefined) {
      //     try {
      //       setPageData(item.webContent.pages.main.structure);
      //       setMetaData(item.webContent.meta);
      //       setFullData(item)
      //     } catch (err) {
      //       console.log(err);
      //     }
      //   }
      // });
    } catch (err) {
      console.log(err);
    }
  }

  const [getDataBtn, setGetDataBtn] = useState(true);
  const [isOperationDone, setIsOperationDone] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div id="cPanel">
      <Head>
        <title>Control Panel - Inkmorphism</title>
      </Head>
      {/* <form onSubmit={handleSubmit}>
        <label>
          Folder name:
          <input
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Page title:
          <input
            type="text"
            value={pageTitle}
            onChange={(e) => setPageTitle(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Create page</button>
      </form> */}

      <button id="fetch" onClick={getData}></button>

      {isAdmin ? (
        <div
          id="getDataBtn"
          className="noSelect"
          style={{
            backgroundColor: isOperationDone ? "green" : "var(--mainColor2)",
            cursor: isOperationDone ? "default" : "pointer",
          }}
        >
          {getDataBtn ? (
            <p
              onClick={() => {
                getPublicSitesData();
              }}
            >
              Get Public Sites Data?
            </p>
          ) : isOperationDone ? (
            <p>Done 👍</p>
          ) : (
            <p onClick={create}>
              Data loaded. <br></br>Click to generate static pages 👍
            </p>
          )}
        </div>
      ) : (
        <div id="getDataBtn">
          <p onClick={() => {
            window.location.href = "../../login"
          }}>
            You are not an admin. <br></br>Log in as an admin to access this
          </p>
        </div>
      )}
    </div>
  );
}
