import Head from 'next/head';
import Link from 'next/link'
import Dashnav from './components/dashnav.js'
import Dashfooter from './components/dashfooter.js'
import { randomWords } from "random-words";
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth'
import app from '../firebase/clientApp';
import { useState, useEffect } from 'react';
import placeholder from '../styles/images/placeholder.png';
import defaultProfilePic from '../styles/images/defaultProfilePic.png';

export default function Templates() {

  let profile_pic = ""

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

  try {  
    profile_pic = auth.currentUser.photoURL;
  } catch(err) {         
    profile_pic = userData.profile_pic;
  }  

  return (
    <div className={"Templates"}>

      <Head>
        {/* <link rel="icon" href={defaultFiles['logo']} /> */}
        <link rel="icon" href="/faviconWh.ico" />
        <title>Inkmorphism - Templates for your websites!</title>
      </Head>

      <button id="fetch" onClick={getData}></button>

      <Dashnav
        profile_pic={profile_pic}
        auth={auth}
      />
      <main id='templatesWrapper'>
        <section id='templates'>
          <article>
            <img src='templates/neobrutalismTemplate.png'/>
            <h2>Neobrutalism</h2>
            <div id='hiddenBtns'>
              <a onClick={() => {randomSiteGen("Neobrutalism")}}>Get Started with Neobrutalism →</a>
              <a href='templates/neobrutalism'>Preview Template</a>
            </div>
          </article>
          <article>
          <img src='templates/glassmorphismTemplate.png'/>
            <h2>Glassmorphism</h2>
            <div id='hiddenBtns'>
              <a onClick={() => {randomSiteGen("Glassmorphism")}}>Get Started with glassmorphism →</a>
              <a href='templates/glassmorphism'>Preview Template</a>
            </div>
          </article>
          <article>
          <img src='templates/web3Template.png'/>
            <h2>Web3</h2>
            <div id='hiddenBtns'>
              <a onClick={() => {randomSiteGen("Web3")}}>Get Started with Web3 →</a>
              <a href='templates/web3'>Preview Template</a>
            </div>
          </article>
          <article>
            <h2>Futurism</h2>
          </article>
          <article>
            <h2>Minimalism</h2>
          </article>
          <article>
            <h2>Isometrism</h2>
          </article>
          <article>
            <h2>Fantasm</h2>
          </article>
        </section>
      </main>
      <Dashfooter/>
    </div>
  );
}
