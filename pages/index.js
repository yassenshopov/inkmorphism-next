import Head from "next/head";
import { FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import MainNav from "./components/MainNav";

export default function Home() {
  return (
    <div id="mainPage">
      <Head>
        <title>Inkmorphism - the AI Website Builder</title>
        <meta
          name="description"
          content="Create stunning websites with Inkmorphism - the AI-powered website builder that leverages generative image and text technology to streamline your design process."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/faviconWh.ico" />
        <meta property="og:image" content="main/og.webp"></meta>
      </Head>

      <MainNav />

      <main>
        <section id="hero">
          <div id="heroTxt">
            <h1>Never start with a blank webpage again.</h1>
            <h2>Let Inkmorphism build it for you</h2>
            <a href="/templates">Let's go</a>
          </div>
          <div id="exampleSites">
            <img src="main/example1.png" />
            <img src="main/example2.png" />
            <img src="main/example4.png" />
          </div>
        </section>

        <section id="partners">
          <a className="noSelect" href="https://openai.com/">
            <img src="main/openaiLogo.png" />
          </a>
          <div></div>
          <p>We work with</p>
          <div></div>
          <a className="noSelect" href="https://www.midjourney.com">
            <img src="main/midjourneyLogo.png" />
          </a>
        </section>

        <section></section>

        <section></section>

        <section></section>

        <section></section>

        <section></section>
      </main>

      <footer>
        <p>Inkmorphism © 2023</p>
        <div id="socialLinks">
          <a href="https://twitter.com/inkmorphism">
            <FaTwitter />
          </a>
          <a href="https://instagram.com/inkmorphism">
            <FaInstagram />
          </a>
          <a>
            <FaLinkedin />
          </a>
        </div>
      </footer>
    </div>
  );
}
