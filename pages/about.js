import Head from "next/head";
import Link from "next/link";
import WIP from "./components/wip";
import MainNav from "./components/MainNav";
import { FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import MainFooter from "./components/MainFooter";

export default function About() {
  return (
    <div className={"About"}>
      <Head>
        {/* <link rel="icon" href={defaultFiles['logo']} /> */}
        <title>Inkmorphism - About us</title>
        <link rel="icon" href="/faviconWh.ico" />
      </Head>

      <MainNav />

      <WIP/>
      {/* <main>
        123
      </main> */}

      <MainFooter/>
    </div>
  );
}
