import Head from 'next/head'
import logo from '../styles/images/logo.png';
import {FaTwitter,FaLinkedin,FaInstagram} from 'react-icons/fa'

export default function Home() {
  return (
    <div id='mainPage'>
      <Head>
        <title>Inkmorphism - the AI Website Builder</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav>
        <a href='/' id='logo'>
            <img src="/logoWh.png"/>
            <a>Inkmorphism</a>
        </a>
        <div>
          <a>About us</a>
          <a href='/blog'>Blog</a>
          <a href='/login'>Sign in</a>
          {/* <img src={profile_pic} alt="Profile Pic"/> */}
        </div>
        <div id='mobileMenu'>
          <div id='bar1'></div>
          <div id='bar2'></div>
          <div id='bar3'></div>
        </div>
      </nav>

      <main>
        <section id='hero'>
          <div id='heroTxt'>
            <h1>Never start with a blank webpage again.</h1>
            <h2>Let Inkmorphism build it for you</h2>
            <a href='/templates'>Let's go</a>
          </div>
          <div id='exampleSites'>
            <img src='main/example1.png'/>
            <img src='main/example2.png'/>
            <img src='main/example4.png'/>
          </div>
        </section>

        <section id='partners'>
          <img src='main/openaiLogo.png'/>
          <div></div>
          <p>We work with</p>
          <div></div>
          <img src='main/midjourneyLogo.png'/>
        </section>

        <section>
        </section>

        <section>
        </section>

        <section>
        </section>

        <section>
        </section>

        <section>
        </section>

      </main>

      <footer>
        <p>Inkmorphism © 2023</p>
        <div id='socialLinks'>
          <a href='https://twitter.com/inkmorphism'>< FaTwitter /></a>
          <a href='https://instagram.com/inkmorphism'>< FaInstagram /></a>
          <a>< FaLinkedin /></a>
        </div>
      </footer>
    </div>
  )
}
