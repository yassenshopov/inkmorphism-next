import Head from 'next/head';
// import Dashnav from './components/dashnav.js'
// import Dashfooter from './components/dashfooter.js'
import { SiLinkedin, SiInstagram, SiTwitter, SiGooglemybusiness } from "react-icons/si";

export default function Neobrutalism() {

  return (
    <div className="Neobrutalism">

      <Head>
        {/* <link rel="icon" href={defaultFiles['logo']} /> */}
        <title>Neobrutalism | Inkmorphism - The AI Website Builder</title>
      </Head>

      <div id='contentWrapper'>
        <nav>
          <div id='logo'>
            <img src='nbLogo.png' alt='NeoCoach'/>
            <a>NeoCoach</a>
          </div>
          <div id='links'>
            <a>About us</a>
            <a>Testimonials</a>
            <a>Contact us</a>
          </div>
          <button>Get in touch</button>
        </nav>

        <main>
          <section id='hero'>
            <div id='heroText'>
              <h1>Create value <br></br>and monetise.<div></div></h1>
              <h2>Unlock your Business Potential with our experienced Coaching Services</h2>
              <form>
                <input type='email' placeholder='Enter your email...'/>
                <button>Subscribe</button>
              </form>
              <h3>Join 23K others in our mailing list! 📧</h3>
            </div>
            <img src='nbHero.png'/>
          </section>

          <section id='partners'>
            <article>
              <img src='partner1.png'/>
              <p>Fuji Studios</p>
            </article>
            <article>
              <img src='partner2.png'/>
              <p>Punko Pop Inc.</p>
            </article>
            <article>
              <img src='partner3.png'/>
              <p>CAA-AMF</p>
            </article>
            <article>
              <img src='partner4.png'/>
              <p>Far Ltd.</p>
            </article>
            <article>
              <img src='partner5.png'/>
              <p>Scribblers Ltd.</p>
            </article>
          </section>

          <section>
            <img src='nbMountains2_clear.png'/>
            <p>123</p>
          </section>
        </main>

        <footer>
          <div>
            <a>Made with Inkmorphism</a>
            <p><em>(All images are created with Midjourney)</em></p>
          </div>
          <section id='socialLinks'>
            <SiLinkedin/>
            <SiInstagram/>
            <SiTwitter/>
            <SiGooglemybusiness/>
          </section>
        </footer>
      </div>
    </div>
  );
}
