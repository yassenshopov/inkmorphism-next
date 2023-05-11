import Head from 'next/head';
import Link from 'next/link'
import WIP from './components/wip';
import MainNav from './components/MainNav';
import { FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function Blog() {

  return (
    <div className={"Blog"}>

      <Head>
        {/* <link rel="icon" href={defaultFiles['logo']} /> */}
        <title>Inkmorphism - Blog</title>
        <link rel="icon" href="/faviconWh.ico" />
      </Head>

      <MainNav/>

      <WIP/>

      <footer>
        <p>Inkmorphism © 2023</p>
        <div id="socialLinks">
          <a href="https://twitter.com/inkmorphism" target="_blank" className="noSelect">
            <FaTwitter />
          </a>
          <a href="https://instagram.com/inkmorphism" target="_blank"  className="noSelect">
            <FaInstagram />
          </a>
          <a
            href="https://www.linkedin.com/company/inkmorphism/"
            target="_blank"
            className="noSelect"
          >
            <FaLinkedin />
          </a>
        </div>
      </footer>
    </div>
  );
}
