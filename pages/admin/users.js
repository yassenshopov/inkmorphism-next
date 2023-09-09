import React, { useEffect, useState } from "react";
import Dashnav from "../components/dashnav";
import app from "../../firebase/clientApp";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { getAuth } from "@firebase/auth";
import { ref, getDownloadURL, getStorage } from "@firebase/storage";

export default function UsersDash() {
  const [users, setUsers] = useState([]);
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
        dbRenderedData.forEach((user) => {
          try {
            getProfilePicFromStorage(user.uid);
            console.log(profilePics);
          } catch (err) {
            console.error(err);
          }
        });

        setUsers(dbRenderedData);
        console.log(dbRenderedData);
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

  return (
    <div className="UsersDash">
      <Dashnav />
      <h1>Users:</h1>
      <h2>
        There are {users.length} user{users.length === 1 ? "" : "s"}.
      </h2>
      <div className="users">
        {users.map((user) => {
          return (
            <div key={user.uid} className="user">
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
