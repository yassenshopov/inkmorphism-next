import Head from 'next/head';
import Link from 'next/link'
import Dashnav from './components/dashnav.js'
import Dashfooter from './components/dashfooter.js'
import { randomWords } from "random-words";
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth'
import app from '../firebase/clientApp';

export default function Templates() {

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

  return (
    <div className={"Templates"}>

      <Head>
        {/* <link rel="icon" href={defaultFiles['logo']} /> */}
        <link rel="icon" href="/faviconWh.ico" />
        <title>Inkmorphism - Templates for your websites!</title>
      </Head>

      <Dashnav/>
      <main id='templatesWrapper'>

      </main>
      <Dashfooter/>
    </div>
  );
}
