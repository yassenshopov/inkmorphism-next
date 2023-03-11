import Head from 'next/head';
import Link from 'next/link'
import WIP from './components/wip';
import MainNav from './components/MainNav';

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

    </div>
  );
}
