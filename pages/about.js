import Head from 'next/head';
import Link from 'next/link'
import WIP from './components/wip';
import MainNav from './components/MainNav';

export default function About() {

  return (
    <div className={"About"}>

      <Head>
        {/* <link rel="icon" href={defaultFiles['logo']} /> */}
        <title>Inkmorphism - About us</title>
        <link rel="icon" href="/faviconWh.ico" />
      </Head>

      <MainNav/>

      <WIP/>

    </div>
  );
}
