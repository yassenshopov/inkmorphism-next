import Head from 'next/head';
import Link from 'next/link'
import Dashnav from './components/dashnav.js'
import Dashfooter from './components/dashfooter.js'

export default function Teplates() {

  return (
    <div className={"Templates"}>

      <Head>
        {/* <link rel="icon" href={defaultFiles['logo']} /> */}
        <title>Inkmorphism - Templates for your websites!</title>
      </Head>

      <Dashnav/>
      <main id='templatesWrapper'>
        <section id='templates'>
          <article>
            <img src='templates/neobrutalismTemplate.png'/>
            <Link href='templates/neobrutalism'>
              <h2>Neobrutalism</h2>
            </Link>
          </article>
          <article>
            <h2>Glassmorphism</h2>
          </article>
          <article>
            <h2>Futurism</h2>
          </article>
          <article>
            <h2>Web3</h2>
          </article>
          <article>
            <h2>Minimalism</h2>
          </article>
          <article>
            <h2>Isometrism</h2>
          </article>
          <article>
            <h2>Fantasm</h2>
          </article>
        </section>
      </main>
      <Dashfooter/>
    </div>
  );
}
