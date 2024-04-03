import React, { useEffect, useState } from "react";
import Dashnav from "../components/dashnav";
import app from "../../firebase/clientApp";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore/lite";
import { getAuth } from "@firebase/auth";
import { ref, getDownloadURL, getStorage } from "@firebase/storage";

export default function UsersDash() {
  const [users, setUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const db = getFirestore(app);
  //getAuth
  const auth = getAuth(app);
  //storage
  const storage = getStorage(app);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const col = collection(db, `users`);
        const querySnapshot = await getDocs(col);
        const dbRenderedData = querySnapshot.docs
          .map((doc) => doc.data())
          //remove those without uid
          .filter((user) => user.uid)
          //sort by createdAt - in reverse
          .sort((a, b) => b.createdAt - a.createdAt);
        dbRenderedData.forEach(async (user) => {
          //get users/uid-xyz/websites

          const websitesRef = collection(
            db,
            `users`,
            `user-${user.uid}`,
            `websites`
          );
          const websitesRefQuerySnapshot = await getDocs(websitesRef);
          console.log(websitesRefQuerySnapshot.docs);
          const websites = websitesRefQuerySnapshot.docs.map((doc) =>
            doc.data()
          );
          user.websites = websites;
          try {
            // getProfilePicFromStorage(user.uid);
          } catch (err) {
            console.error(err);
          }
          //check if there is users/user.uid, for example if there is a user abc123 for every user-abc123
          try {
            const userRef = doc(db, `users`, `${user.uid}`);
            const userRefQuerySnapshot = await getDoc(userRef);
            if (userRefQuerySnapshot.exists()) {
              user.pokemon = userRefQuerySnapshot.data().pokemon;
            }
          } catch (err) {
            console.error(err);
          }
        });

        setUsers(dbRenderedData);
        setDisplayedUsers(dbRenderedData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  function formatDate(unixTimestamp) {
    unixTimestamp = unixTimestamp.toString().slice(0, -3);
    const date = new Date(unixTimestamp * 1000);
    const dayOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ][date.getDay()];
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    // Define a function to add leading zeros
    function addLeadingZero(number) {
      return number < 10 ? `0${number}` : number;
    }

    const formattedDate = `${dayOfWeek}, ${monthNames[month]} ${addLeadingZero(
      day
    )}, ${year}, ${addLeadingZero(hour)}:${addLeadingZero(
      minute
    )}:${addLeadingZero(second)} ${hour >= 12 ? "PM" : "AM"}`;

    return formattedDate;
  }

  const [profilePics, setProfilePics] = useState({}); // Store profile pics in an object

  function getProfilePicFromStorage(uid) {
    try {
      const storageRef = ref(storage, `user-${uid}/profilePic.png`);
      getDownloadURL(storageRef)
        .then((metadata) => {
          // Store the profile pic URL in the object using the user's UID as the key
          setProfilePics((prevProfilePics) => ({
            ...prevProfilePics,
            [uid]: metadata,
          }));
        })
        .catch((error) => {
          // Handle errors as needed
          console.error(error);
          setProfilePics((prevProfilePics) => ({
            ...prevProfilePics,
            [uid]:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png",
          }));
        });
    } catch (err) {
      console.error(err);
    }
  }

  const [whichBtnIsSelected, setWhichBtnIsSelected] = useState("all");
  const [whichSortBtnIsSelected, setWhichSortBtnIsSelected] =
    useState("newest");

  const [popupWebsiteData, setPopupWebsiteData] = useState({});

  return (
    <div className="UsersDash">
      <Dashnav />
      <div
        className={
          "popupWebsite" + (popupWebsiteData.deleted ? " deleted" : "")
        }
        style={{
          display: Object.keys(popupWebsiteData).length > 0 ? "flex" : "none",
        }}
      >
        <h1>{popupWebsiteData.name}</h1>
        <img className="thumbnail" src={popupWebsiteData.thumbnail} />
        <p>Style: {popupWebsiteData.style}</p>
        {popupWebsiteData.deleted ? (
          <p className="deleted">This website has been deleted.</p>
        ) : (
          ""
        )}
        <div id="closePopup" onClick={() => setPopupWebsiteData({})}>
          X
        </div>
        <div className="colorPalette">
          <h2>Color Palette</h2>
          <div
            className="color"
            style={{
              backgroundColor:
                Object.keys(popupWebsiteData).length > 0
                  ? popupWebsiteData.webContent.meta.colorPalette.color1
                  : "#000000",
            }}
          ></div>
          <div
            className="color"
            style={{
              backgroundColor:
                Object.keys(popupWebsiteData).length > 0
                  ? popupWebsiteData.webContent.meta.colorPalette.color2
                  : "#000000",
            }}
          ></div>
          <div
            className="color"
            style={{
              backgroundColor:
                Object.keys(popupWebsiteData).length > 0
                  ? popupWebsiteData.webContent.meta.colorPalette.color3
                  : "#000000",
            }}
          ></div>
          <div
            className="color"
            style={{
              backgroundColor:
                Object.keys(popupWebsiteData).length > 0
                  ? popupWebsiteData.webContent.meta.colorPalette.colorDark
                  : "#000000",
            }}
          ></div>
          <div
            className="color"
            style={{
              backgroundColor:
                Object.keys(popupWebsiteData).length > 0
                  ? popupWebsiteData.webContent.meta.colorPalette.colorLight
                  : "#000000",
            }}
          ></div>
        </div>
      </div>

      <h1>Users:</h1>
      <h2>
        There are {users.length || "-"} user{users.length === 1 ? "" : "s"}.
      </h2>
      <p id="filter">
        Filter by
        <button
          className={whichBtnIsSelected === "paid" ? "selected" : ""}
          onClick={() => {
            setDisplayedUsers(users.filter((user) => user.isCreator === true));
            setWhichBtnIsSelected("paid");
          }}
        >
          <span>Paid users</span>
        </button>
        <button
          className={whichBtnIsSelected === "admin" ? "selected" : ""}
          onClick={() => {
            setDisplayedUsers(users.filter((user) => user.isAdmin === true));
            setWhichBtnIsSelected("admin");
          }}
        >
          <span>Admins</span>
        </button>
        <button
          className={whichBtnIsSelected === "free" ? "selected" : ""}
          onClick={() => {
            setDisplayedUsers(
              users.filter(
                (user) =>
                  user.isCreator === false || user.isCreator === undefined
              )
            );
            setWhichBtnIsSelected("free");
          }}
        >
          <span>Free users</span>
        </button>
        <button
          className={whichBtnIsSelected === "all" ? "selected" : ""}
          onClick={() => {
            setDisplayedUsers(users);
            setWhichBtnIsSelected("all");
          }}
        >
          <span>All users</span>
        </button>
        <button
          className={whichBtnIsSelected === "pokemon" ? "selected" : ""}
          onClick={() => {
            setDisplayedUsers(users.filter((user) => user.pokemon));
            setWhichBtnIsSelected("pokemon");
          }}
        >
          <span>Users w/ Pokemon</span>
        </button>
      </p>
      {/* <p id="sort">
        Sort by
        <button
          className={whichSortBtnIsSelected === "newest" ? "selected" : ""}
          onClick={() => {
            if (whichSortBtnIsSelected !== "newest") {
              setDisplayedUsers(users.reverse());
            }
            setWhichSortBtnIsSelected("newest");
          }}
        >
          Newest
        </button>
        <button
          className={whichSortBtnIsSelected === "oldest" ? "selected" : ""}
          onClick={() => {
            if (whichSortBtnIsSelected !== "oldest") {
              setDisplayedUsers(users.reverse());
            }
            setWhichSortBtnIsSelected("oldest");
          }}
        >
          Oldest
        </button>
      </p> */}
      <div className="users">
        {displayedUsers.map((user) => {
          return (
            <div
              key={user.uid}
              className={
                "user" +
                (user.isAdmin ? " isAdmin" : "") +
                (user.isCreator ? " isCreator" : "")
              }
            >
              <div className="num">
                <span>
                  #
                  {(whichSortBtnIsSelected === "newest"
                    ? users.length - users.indexOf(user)
                    : users.indexOf(user) + 1) +
                    (user.isAdmin ? " (admin)" : "")}
                </span>
              </div>
              <img src={profilePics[user.uid]} />
              <h2>
                <span>Name: </span>
                {user.displayName || "N/A"}
              </h2>
              <p>
                <span>Email: </span>
                {user.email}
              </p>
              <p>
                <span>UID: </span>
                {user.uid}
              </p>
              <p>
                <span>Created: </span>
                {formatDate(user.createdAt)}
              </p>
              <p>
                <span>Auth Provider: </span>
                <div
                  className={
                    user.providerData[0].providerId === "password"
                      ? "password"
                      : user.providerData[0].providerId === "google.com"
                      ? "google"
                      : user.providerData[0].providerId === "github.com"
                      ? "github"
                      : ""
                  }
                >
                  {user.providerData[0].providerId}
                </div>
              </p>
              {
                // If the user has websites, display them
                user.websites ? (
                  <>
                    <h3>Websites:</h3>
                    {user.websites.map((website) => {
                      return (
                        <div
                          key={website.id}
                          className="websiteBtn"
                          // href={`/config/${website.domainSlug}?user=${user.uid}`}
                          onClick={async () => {
                            const websiteRef = doc(
                              db,
                              `users`,
                              `user-${user.uid}`,
                              `websites`,
                              website.domainSlug
                            );
                            console.log(websiteRef);
                            const websiteRefQuerySnapshot = await getDoc(
                              websiteRef
                            );
                            console.log(websiteRefQuerySnapshot.data());
                            setPopupWebsiteData(websiteRefQuerySnapshot.data());
                            // alert(
                            //   Object.entries(websiteRefQuerySnapshot.data())
                            //     .map((entry) => {
                            //       return `${entry[0]}: ${entry[1]}`;
                            //     })
                            //     .join("\n")
                            // );
                          }}
                        >
                          <a
                            href={`/config/${website.domainSlug}?user=${user.uid}`}
                            target="_blank"
                          >
                            {website.domainSlug}
                          </a>
                          {/* <p
                              className="fetchSiteData"
                              onClick={async () => {
                                const websiteRef = doc(
                                  db,
                                  `users`,
                                  `user-${user.uid}`,
                                  `websites`,
                                  website.domainSlug
                                );
                                console.log(websiteRef);
                                const websiteRefQuerySnapshot = await getDoc(
                                  websiteRef
                                );
                                console.log(websiteRefQuerySnapshot.data());
                                setPopupWebsiteData(
                                  websiteRefQuerySnapshot.data()
                                );
                                alert(
                                  Object.entries(websiteRefQuerySnapshot.data())
                                    .map((entry) => {
                                      return `${entry[0]}: ${entry[1]}`;
                                    })
                                    .join("\n")
                                );
                              }}
                            >
                              Fetch site data
                            </p> */}
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <p>
                    <span>Websites: </span>
                    None
                  </p>
                )
              }
              {
                //if the user has the Pokemon collection, display it
                user.pokemon ? (
                  <>
                    <h3>Pokemon:</h3>
                    <div className="pokemon">
                      {user.pokemon.map((pokemon) => {
                        return (
                          <div key={pokemon.id} className="pokemonCard">
                            <p>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
                            <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + (pokemon.shiny ? "shiny/" : "")
                             + pokemon.id + ".png"} />
                             <div className="palette">
                                <div className="color" style={{backgroundColor: pokemon.palette[0]}}></div>
                                <div className="color" style={{backgroundColor: pokemon.palette[1]}}></div>
                                <div className="color" style={{backgroundColor: pokemon.palette[2]}}></div>
                              </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <p>
                    <span>Pokemon: </span>
                    None
                  </p>
                )
              }
            </div>
          );
        })}
      </div>
    </div>
  );
}
