import Head from "next/head";
import { useState } from "react";
import app from "../../firebase/clientApp";
import {
  getFirestore,
  getDoc,
  doc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore/lite";
import { async } from "@firebase/util";

let publicSites = [];

export default function CPanel() {
  const [folderName, setFolderName] = useState("default");
  const [pageTitle, setPageTitle] = useState("default");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/create-page", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ folderName, pageTitle }),
      });

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  let db = getFirestore(app);

  const create = async () => { 
    publicSites.forEach(async (item, index) => {
        const response = await fetch(
            "http://localhost:3000/api/create-static-page",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({item}),
            }
          );
    });
  }

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

  return (
    <div className="cPanel">
      <Head>
        <title>Control Panel - Inkmorphism</title>
      </Head>
      <form onSubmit={handleSubmit}>
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
      </form>

      <button
        onClick={() => {
          getPublicSitesData();
        }}
      >
        Get Public Sites Data
      </button>

      <p onClick={create}>PRESS WHEN READY</p>
    </div>
  );
}
