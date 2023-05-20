import Head from 'next/head';
import Link from 'next/link'
import WIP from './components/wip';
import MainNav from './components/MainNav';
import { FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import MainFooter from './components/MainFooter';

export default function Blog() {

  return (
    <div className={"Blog"}>

      <Head>
        {/* <link rel="icon" href={defaultFiles['logo']} /> */}
        <title>Inkmorphism - Blog</title>
        <link rel="icon" href="/faviconWh.ico" />
      </Head>

      <MainNav/>

      {/* <WIP/> */}

      <main>
        <section id="hero">
          <div id="heroTxt">
            <h1>Got a new website and not sure how to make it pop?</h1>
            <h2>Let Inkmorphism build it for you!</h2>
            <a href="/templates">Let's go</a>
          </div>
        </section>

        <section id="blogs">
        </section>

        </main>

      <MainFooter/>

    </div>
  );
}
