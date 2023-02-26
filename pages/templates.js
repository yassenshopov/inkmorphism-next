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
