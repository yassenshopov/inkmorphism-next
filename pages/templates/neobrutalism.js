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
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs"
import { useState } from "react";
import { randomWords } from "random-words";
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth'
import app from '../../firebase/clientApp';
 
export default function Neobrutalism() {

  const [scrollLeft, setScrollLeft] = useState(1);
  const [scrollRight, setScrollRight] = useState(0);

  const handleScroll = event => {
    setScrollLeft((((event.currentTarget.scrollWidth/3) - event.currentTarget.scrollLeft)/(event.currentTarget.scrollWidth/3)));
    setScrollRight(1 + (-1)*(((event.currentTarget.scrollWidth/3) - event.currentTarget.scrollLeft)/(event.currentTarget.scrollWidth/3)))
  };

  const auth = getAuth(app);
  const user = "user-" + auth.currentUser.uid

  let db = getFirestore(app);
  const col = collection(db, "users", user, "websites");

  async function randomSiteGen() {
    let randomWords = require('random-words');
    let words = randomWords(2)
    let slug = "";
    for (let word in words) {
      console.log(words[word])
      slug = slug + words[word] + "-"
    }
    slug = slug + Math.ceil(Math.random()*999)
    slug = slug + ".inkmorphism.com"
    console.log(slug)

    let newSite = {
      "domain": slug,
      initDate: "",
      name: "New Site",
      thumbnail: ""
    }

    await setDoc(doc(col, "new_site"), newSite)
  }

  return (
    <div className="Neobrutalism">
      <Head>
        {/* <link rel="icon" href={defaultFiles['logo']} /> */}
        <title>Neobrutalism | Inkmorphism - The AI Website Builder</title>
      </Head>

      <div id="contentWrapper">
        <nav>
          <div id="logo">
            <img src="nbLogo.png" alt="NeoCoach" />
            <a>NeoCoach</a>
          </div>
          <div id="links">
            <a href="#about">About us</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#contact">Contact us</a>
          </div>
          <button className="noSelect">Get in touch</button>
        </nav>

        <main>
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
        </main>

        <footer>
          <div>
            <a>Made with Inkmorphism</a>
            <p>
              <em>(All images are created with Midjourney)</em>
            </p>
          </div>
          <section id="socialLinks">
            <SiLinkedin />
            <SiInstagram />
            <SiTwitter />
            <SiGooglemybusiness />
          </section>
        </footer>
      </div>

      <div>
        <a onClick={randomSiteGen}>Create your website with Neobrutalism</a>
      </div>
    </div>
  );
}
