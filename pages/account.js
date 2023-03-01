import Head from 'next/head';
import Link from 'next/link'
import Dashnav from './components/dashnav.js'
import Dashfooter from './components/dashfooter.js'
import Account from './components/account.js'
import { randomWords } from "random-words";
import { getFirestore, collection, getDocs, doc, setDoc, getDoc } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth'
import app from '../firebase/clientApp';
import { useEffect, useState } from 'react';
import placeholder from '../styles/images/placeholder.png';
import defaultProfilePic from '../styles/images/defaultProfilePic.png';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default function Templates() {

    const [userDataDB, setUserDB] = useState({
        photoURL: ""
    });

    useEffect(() => {
        const el = document.getElementById("fetch")
        setTimeout(() => {
            el.click();
        }, 1500)
    }, [])

    const auth = getAuth(app);
            
    const [userData, setUserData] = useState({
        profile_pic: defaultProfilePic.src,
        displayName: "Default"
    })

    async function getData() {
        let db = getFirestore(app);
        const auth = getAuth(app);
        let uid;
        try {
            uid = "user-" + auth.currentUser.uid; 
        } catch(err) {
            uid = "_"  
        }
        
        const storage = getStorage();
        const storageRef = ref(storage, (uid + "/profilePic.png"));
        getDownloadURL(storageRef)
        .then((metadata) => {
            console.log(metadata)
            setUserDB({
                photoURL: metadata
            })
            // Metadata now contains the metadata for 'images/forest.jpg'
          })
          .catch((error) => {
            // Uh-oh, an error occurred!
          });

        let dataRef = doc(db, "users", uid)
        const thisUser = await getDoc(dataRef)
        try { 
            // profile_pic = auth.currentUser.photoURL;
            setUserData({
                profile_pic: auth.currentUser.photoURL,
                displayName: auth.currentUser.displayName
            })
        } catch(err) {
        } 
    }

    return (
    <div className={"Account"}>

        <Head>
        {/* <link rel="icon" href={defaultFiles['logo']} /> */}
        <link rel="icon" href="/faviconWh.ico" />
        <title>Inkmorphism - My account</title>
        </Head>

        <button id="fetch" onClick={getData}></button>

        <Dashnav
            profile_pic={userData.profile_pic}
            auth={auth}
        />

        <Account
            profilePic={userDataDB.photoURL}
            displayName={userData.displayName}
        />

        <Dashfooter/>
    </div>
    );
}
