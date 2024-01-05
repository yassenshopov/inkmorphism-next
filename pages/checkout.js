import MainFooter from "./components/MainFooter";
import MainNav from "./components/MainNav";
import { useEffect, useState } from "react";
import app from "../firebase/clientApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { FaCheck } from "react-icons/fa";
import { BiLoaderAlt } from "react-icons/bi";
import Head from "next/head";

// Meta data:
let title = "Inkmorphism Pricing | Affordable Plans for Every Need";
let img = "https://inkmorphism.com/pricing/og.webp";
let description =
  "Choose from our range of affordable pricing plans for our AI-powered website builder and create stunning websites effortlessly.";
let author = "Yassen Shopov";

export default function Checkout() {
  const [userSites, setUserSites] = useState([]);
  const [sitesArray, setSitesArray] = useState([]);
  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const websitesRef = collection(
          db,
          "users",
          "user-" + user.uid,
          "websites"
        );
        getDocs(websitesRef)
          .then((snap) => {
            setUserSites(snap.docs.map((doc) => doc.data()));
            setSitesArray(snap.docs.map(() => false));
          })
          .catch((error) => {
            console.error("Error getting document:", error);
          });
      }
    });
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <meta name="author" content={author}></meta>
        <meta name="description" content={description} />
        <link rel="icon" href="/faviconWh.ico" />
        <meta property="og:image" content={img}></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:title" content={title}></meta>
        <meta property="og:description" content={description}></meta>
        <meta property="twitter:card" content="summary_large_image"></meta>
        <meta property="twitter:title" content={title}></meta>
        <meta property="twitter:description" content={description}></meta>
      </Head>

      <MainNav />
      <main className="checkout">
        <h1>Checkout page</h1>
        <p>
          Choose the website that you want to publish via one of our paid plans:
        </p>
        <div className="userSites">
          {userSites.length === 0 ? (
            <>
              <div></div>
              <BiLoaderAlt id="loaderSites" />
            </>
          ) : (
            userSites.map((site, index) => {
              return (
                <div
                  className={
                    "site noSelect" +
                    (sitesArray[index] ? " active" : "") +
                    (site.published ? " published" : "")
                  }
                  key={index}
                  onClick={() => {
                    setSitesArray((prev) => {
                      const newArray = [...prev];
                      newArray[index] = !newArray[index];
                      for (let i = 0; i < newArray.length; i++) {
                        if (i !== index) {
                          newArray[i] = false;
                        }
                      }
                      return newArray;
                    });
                  }}
                >
                  <img src={site.thumbnail} />
                  <div className="siteInfo">
                    <h2>{site.name}</h2>
                    <p>inkmorphism.com/{site.domainSlug}</p>
                  </div>
                  <div
                    className={
                      "checkPoint" + (sitesArray[index] ? " checked" : "")
                    }
                  >
                    <FaCheck />
                  </div>
                  <p
                    className={
                      "selected" + (sitesArray[index] ? " active" : "")
                    }
                  >
                    {site.published
                      ? <>Already published <FaCheck /></> 
                      : sitesArray[index]
                      ? "Selected!"
                      : "Select"}
                  </p>
                </div>
              );
            })
          )}
        </div>
        <div className="plans">
          <div className="plan">
            <h2>Free</h2>
            <p>Free forever</p>
          </div>
          <div className="plan">
            <h2>Pro</h2>
            <p>Coming soon</p>
          </div>
          <div className="plan">
            <h2>Business</h2>
            <p>Coming soon</p>
          </div>
        </div>
      </main>
      <MainFooter />
    </>
  );
}
