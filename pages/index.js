import Head from "next/head";
import { FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import MainNav from "./components/MainNav";

// Meta data:
let title = "Inkmorphism - the AI Website Builder";
let img = "main/og.webp";
let description =
  "Create stunning websites with Inkmorphism - the AI-powered website builder that leverages generative image and text technology to streamline your design process.";
let author = "Yassen Shopov";

export default function Home() {
  return (
    <div id="mainPage">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <meta name="author" content={author}></meta>
        <meta name="description" content={description} />
        <link rel="icon" href="/faviconWh.ico" />
        <meta property="og:image" content={img}></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:title" content={title}></meta>
        <meta property="og:description" content={description}></meta>
        <meta property="twitter:card" content="summary_large_image"></meta>
        <meta property="twitter:title" content={title}></meta>
        <meta property="twitter:description" content={description}></meta>
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
            <img src="main/example4.png" />
            <img src="main/example1.png" />
            <img src="main/example2.png" />
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
        {/* 
        <section></section>

        <section></section>

        <section></section>

        <section></section>

        <section></section> */}
      </main>

      <footer>
        <p>Inkmorphism © 2023</p>
        <div id="socialLinks">
          <a href="https://twitter.com/inkmorphism" target="_blank">
            <FaTwitter />
          </a>
          <a href="https://instagram.com/inkmorphism" target="_blank">
            <FaInstagram />
          </a>
          <a
            href="https://www.linkedin.com/company/inkmorphism/"
            target="_blank"
          >
            <FaLinkedin />
          </a>
        </div>
      </footer>
    </div>
  );
}
