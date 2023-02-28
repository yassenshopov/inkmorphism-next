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

export default function Templates() {

    const [userDataDB, setUserDB] = useState({
        photoURL: ""
    });

    async function randomSiteGen(style) {
    let user;
    let db;
    const auth = getAuth(app);
    let uid;
    let col;
    try {
        uid = auth.currentUser.uid; 
        user = "user-" + uid
        db = getFirestore(app);
        col = collection(db, "users", user, "websites");
    } catch (error) {
        console.log(error)
        uid = "_" 
    }
    let randomWords = require('random-words');
    let words = randomWords(2)
    let slug = "";
    for (let word in words) {
        console.log(words[word])
        slug = slug + words[word] + "-"
    }
    slug = slug + Math.ceil(Math.random()*999)
    let fullSlug = slug + ".inkmorphism.com"
    console.log(slug)
    let newSite = {
        "domain": fullSlug,
        initDate: "",
        name: "", 
        thumbnail: "",
        style: style,
    }

    await setDoc(doc(col, slug), newSite);

    let urlRedirect = "../../config/" + slug
    // window.location.href = urlRedirect
    }

    useEffect(() => {
        const el = document.getElementById("fetch")
        setTimeout(() => {
            el.click();
        }, 1500)
    }, [])

    const [theData, setData] = useState("") 
    const [sitesTotal, setSitesTotal] = useState(0)

    const auth = getAuth(app);
            
    const [userData, setUserData] = useState({
        profile_pic: defaultProfilePic.src,
        displayName: "Default"
    })

    console.log(userData)

    async function getData() {
        let db = getFirestore(app);
        const auth = getAuth(app);
        let uid;
        try {
            uid = "user-" + auth.currentUser.uid; 
        } catch(err) {
            uid = "_"  
        }

        let ref = doc(db, "users", uid)
        const thisUser = await getDoc(ref)
        console.log(thisUser.data())
        try {
            
            setUserDB(thisUser.data())
        } catch {

        }
        try { 
            // profile_pic = auth.currentUser.photoURL;
            console.log(auth)
            setUserData({
                profile_pic: auth.currentUser.photoURL,
                displayName: auth.currentUser.displayName
            })
            console.log(userData)
        } catch(err) {
            console.log(err)
        } 
    }

    return (
    <div className={"Account"}>

        <Head>
        {/* <link rel="icon" href={defaultFiles['logo']} /> */}
        <link rel="icon" href="/faviconWh.ico" />
        <title>Inkmorphism - Templates for your websites!</title>
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
