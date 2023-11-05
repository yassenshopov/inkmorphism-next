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
import { BiCopy } from "react-icons/bi";

let publicSites = [];

export default function CPanel() {
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
      console.log(data.data());
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

  const [theData, setData] = useState("");
  // let publicSitesRendered = [];

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
      const reference = doc(db, "publicSites", item.domainSlug);
      await updateDoc(reference, {
        isSynced: true,
      });
    });

    setTimeout(() => {
      setIsOperationDone(true);
    }, 1000);
  };

  async function updateRepo(site) {
    const response = await fetch("http://localhost:3000/api/updateRepos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ site }),
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
        setGetDataBtn(false);

        const publicSitesRendered = publicSites.map((site, index) => {
          try {
            return (
              <div
                key={site.domain}
                // href={"../config/" + site.domainSlug}
                className="noSelect site"
                style={{
                  background: site.isSynced
                    ? "rgb(211 217 255 / 20%)"
                    : "rgb(235 223 85)",
                  color: site.isSynced ? "white" : "black",
                }}
              >
                <div className="thumbnailWrapper">
                  <img
                    src={
                      site.thumbnail === "" ? placeholder.src : site.thumbnail
                    }
                    loading="lazy"
                  />
                </div>
                <div className="logoWrapper">
                  <img src={site.webContent.meta.metaFavicon} loading="lazy" />
                </div>
                <h2>{site.name}</h2>
                <p>{site.style}</p>
                <div>
                  {/* <a href={"https://" + site.domain} target="_blank">
                {site.domain}
              </a> */}
                  <p
                    // href={"https://inkmorphism.com/sites/" + site.domainSlug}
                    // target="_blank"
                    className="domainSlug"
                    style={{
                      color: site.isSynced ? "white" : "black",
                    }}
                    onClick={() => {
                      navigator.clipboard.writeText(
                        site.domainSlug
                      );
                    }}
                  >
                    {site.domainSlug} <BiCopy />
                  </p>
                  <p
                    className="updateRepoBtn"
                    onClick={() => {
                      updateRepo(site);
                    }}
                  >
                    Update Repo
                  </p>
                </div>
                <p>
                  {site.isSynced
                    ? "Static file is up-to-date"
                    : "Update available"}
                </p>
              </div>
            );
          } catch (err) {
            console.log(err);
          }
        });
        setData(publicSitesRendered);
      });
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
        <meta
          name="description"
          content="Control Panel for Inkmorphism. Create, edit, and delete websites."
        />
        <link rel="icon" href="/logoWh.png" />
      </Head>

      <button id="fetch" onClick={getData}></button>

      {isAdmin ? (
        <div
          id="getDataBtn"
          className="noSelect"
          style={{
            backgroundColor: isOperationDone ? "white" : "var(--mainColor2)",
            color: isOperationDone ? "green" : "white",
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
          <p
            onClick={() => {
              window.location.href = "../../login";
            }}
          >
            You are not an admin. <br></br>Log in as an admin to access this
          </p>
        </div>
      )}

      <div id="publicSites">{theData}</div>
    </div>
  );
}
