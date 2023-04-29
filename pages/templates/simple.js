import Head from "next/head";
// import Dashnav from './components/dashnav.js'
// import Dashfooter from './components/dashfooter.js'
import {
  SiLinkedin,
  SiInstagram,
  SiTwitter,
  SiGooglemybusiness,
} from "react-icons/si";
import { AiFillStar } from "react-icons/ai";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import { useEffect, useState } from "react";
import { randomWords } from "random-words";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
import app from "../../firebase/clientApp";

export default function Neobrutalism() {
  const [scrollLeft, setScrollLeft] = useState(1);
  const [scrollRight, setScrollRight] = useState(0);
  const handleScroll = (event) => {
    setScrollLeft(
      (event.currentTarget.scrollWidth / 3 - event.currentTarget.scrollLeft) /
        (event.currentTarget.scrollWidth / 3)
    );
    setScrollRight(
      1 +
        -1 *
          ((event.currentTarget.scrollWidth / 3 -
            event.currentTarget.scrollLeft) /
            (event.currentTarget.scrollWidth / 3))
    );
  };

  const [siteName, setSiteName] = useState("");
  const siteInput = (e) => {
    console.log(e.target.value);
    setSiteName(e.target.value);
  };

  async function randomSiteGen(style) {
    alert(style);
    let user;
    let db = getFirestore(app);
    const auth = getAuth(app);
    let uid;
    let col;
    try {
      uid = auth.currentUser.uid;
      user = "user-" + uid;
      let db = getFirestore(app);
      col = collection(db, "users", user, "websites");
    } catch (error) {
      console.log(error);
      uid = "_";
    }
    let randomWords = require("random-words");
    let words = randomWords(2);
    let slug = "";
    for (let word in words) {
      console.log(words[word]);
      slug = slug + words[word] + "-";
    }
    slug = slug + Math.ceil(Math.random() * 999);
    slug = slug + ".inkmorphism.com";
    console.log(slug);
    console.log(siteName);
    let newSite = {
      domain: slug,
      initDate: "",
      name: siteName,
      thumbnail: "",
      style: style,
    };

    await setDoc(doc(col, siteName), newSite);

    let urlRedirect = "../../config/" + slug;
    // window.location.href = urlRedirect
  }

  return (
    <div className="simple previewTemplate">
      <Head>
        {/* <link rel="icon" href={defaultFiles['logo']} /> */}
        <link rel="icon" href="../faviconWh.ico" />
        <title>Simple | Inkmorphism - The AI Website Builder</title>
      </Head>

      <div id="contentWrapper">
        <nav className="nav">
          <div id="logo" className="noSelect">
            <img src="simpleLogo.png" alt="Fuzzy Beats" />
            <a>Fuzzy Beats</a>
          </div>
        </nav>

        {/* <main>



          <section id="hero">
            <div id="heroText">
              <h1>
                Create value <br></br>and monetise.<div></div>
              </h1>
              <h2>
                Unlock your Business Potential with our experienced Coaching
                Services
              </h2>
              <form>
                <input type="email" placeholder="Enter your email..." />
                <button>Subscribe</button>
              </form>
              <h3>Join 23K+ others in our mailing list! 📧</h3>
            </div>
            <img src="nbHero.png" />
          </section>

          <section id="partners">
            <h2>Our Clients</h2>
            <div id="arrowHint" style={{opacity: scrollLeft}}>< BsFillArrowRightCircleFill /></div>
            <div id="arrowHintRight" style={{opacity: scrollRight}}>< BsFillArrowLeftCircleFill /></div>
            <div id="articles" onScroll={handleScroll}>
              <article className="noSelect">
                <img src="partner1.png" />
                <p>Fuji Studios</p>
              </article>
              <article className="noSelect">
                <img src="partner2.png" />
                <p>Punko Pop Inc.</p>
              </article>
              <article className="noSelect">
                <img src="partner3.png" />
                <p>CAA-AMF</p>
              </article>
              <article className="noSelect">
                <img src="partner4.png" />
                <p>Far Ltd.</p>
              </article>
              <article className="noSelect">
                <img src="partner5.png" />
                <p>Scribblers Ltd.</p>
              </article>
            </div>
          </section>

          <section id="about">
            <img src="nbMountains3_clear.png" />
            <div>
              <h2>Who are we?</h2>
              <p>
                NeoCoach © (est. 2012) is a premier business coaching company,
                dedicated to helping entrepreneurs and business owners achieve
                their goals. With a team of experienced coaches, NeoCoach offers
                a tailored approach to enhance leadership skills, improve
                performance, and drive growth for individuals and businesses
                alike.
              </p>
            </div>
          </section>

          <section id="testimonials">
            <article>
              <div>
                <img src="nbReview1.png" />
              </div>
              <div className="review">
                <p>
                  "<strong>NeoCoach</strong> was the missing piece in my solo
                  business puzzle. With their expert guidance and personalized
                  coaching, I was able to clarify my vision, set achievable
                  goals and take action to achieve them. My business growth
                  accelerated, and I'm now making more money and doing what I
                  love."<br></br>
                  <br></br>- Joel Bramms, Far Ltd.
                </p>
                <div className="starsReview">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                </div>
              </div>
            </article>
            <article>
              <div>
                <img src="nbReview2.png" />
              </div>
              <div className="review">
                <p>
                  "Working with <strong>NeoCoach</strong> has been a game
                  changer for our small game development studio. Their strategic
                  approach and guidance helped us to reach a wider audience,
                  increase our profits and take our business to the next level."
                  <br></br>
                  <br></br>- Ben Lang, TZ Studio
                </p>
                <div className="starsReview">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                </div>
              </div>
            </article>
            <article>
              <div>
                <img src="nbReview3.png" />
              </div>
              <div className="review">
                <p>
                  "As an indie graphic designer, I struggled to grow my business
                  until I started working with <strong>NeoCoach</strong>. Their tailored 
                  coaching and marketing strategies helped me to reach new leads,
                  increase my client base, and ultimately grow my business. I
                  highly recommend NeoCoach to any creative entrepreneur looking
                  to take their business to the next level."<br></br>
                  <br></br>- Layla Goodberg, Scribblers Ltd.
                </p>
                <div className="starsReview">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                </div>
              </div>
            </article>
          </section>

          <section id="contact">
            <h2>Contact us for business enquiries ⇨</h2>
            <form id="contactForm">
              <div id="names">
                <input type="text" id="firstName" placeholder="First name..."/>
                <input type="text" id="lastName" placeholder="Last name..."/>
              </div>
              <input type="email" id="email" placeholder="Email address..."/>
              <textarea id="message" placeholder="Type your message here..."/>
              <button>Submit</button>
            </form>
          </section>
        </main> */}

        <main>
          <section id="hero">
            <div id="heroTxt">
              <h1>Fuzzy Beats: The Ultimate Rockin' Bunnies!</h1>
              <h2>Listen to our latest album and catch us on tour</h2>
            </div>
            <div id="bgImg">
              <div className="shadow"></div>
              <img src="simpleHero3.png" />
            </div>
          </section>

          <section id="about" className="imgAndTxt">
            <div className="txt">
              <h2>Who are we?</h2>
              <p>
                Fuzzy Beats is a rock band from the UK, formed in 2010. The band
                consists of lead vocalist and guitarist, <strong>Fuzzy</strong>,
                bassist, <strong>Buzzy</strong>, and drummer,{" "}
                <strong>Dizzy</strong>. The band has released 3 albums to date,
                with their latest album, "Fuzzy Beats: The Ultimate Rockin'
                Bunnies!", released in 2020. The band is currently on tour in
                the UK, with plans to tour Europe and the US in 2023.
              </p>
            </div>
            <img src="simpleAbout.png" />
          </section>

          <section className="grid3">
            <div className="gridItem">
              <img src="simpleGridElement1.png" />
              <h2>Digital Discordance</h2>
              <p>
                <em>Digital Discordance</em>: A high-energy album filled with
                glitchy beats and futuristic soundscapes that will take you on a
                journey through the digital unknown.
              </p>
            </div>
            <div className="gridItem">
              <img src="simpleGridElement4.png" />
              <h2>Sky Garden Symphony</h2>
              <p>
                <em>Sky Garden Symphony</em>: A relaxing album filled with
                ambient textures and soothing melodies that will take you on a
                journey through the clouds.
              </p>
            </div>
            <div className="gridItem">
              <img src="simpleGridElement2.png" />
              <h2>Pixels</h2>
              <p>
                <em>Pixels</em>: A retro album filled with 8-bit beats and
                chiptune melodies that will take you on a journey through the
                digital past.
              </p>
            </div>
          </section>
        </main>

        <footer className="footer">
          <p>Copyright by Fuzzy Beats ©</p>
          <section id="socialLinks">
            <SiLinkedin />
            <SiInstagram />
            <SiTwitter />
            <SiGooglemybusiness />
          </section>
        </footer>
      </div>

      {/* <div>
        <input
          id="siteName"
          type="text"
          placeholder="Enter your site name..."
          onChange={siteInput}
        />
        <button
          onClick={() => {
            randomSiteGen("Neobrutalism");
          }}
        >
          Create your website with Neobrutalism
        </button>
      </div> */}
    </div>
  );
}
