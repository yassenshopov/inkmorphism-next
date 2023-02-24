import Head from 'next/head';
import Link from 'next/link'

export default function Blog() {

  return (
    <div className={"Blog"}>

      <Head>
        {/* <link rel="icon" href={defaultFiles['logo']} /> */}
        <title>Inkmorphism - Blog</title>
      </Head>

      <main id='templatesWrapper'>
        <section id='templates'>
          <article>
            <img src='templates/neobrutalismTemplate.png'/>
            <h2>Neobrutalism</h2>
            <div id='hiddenBtns'>
              <a href='templates/neobrutalism'>Get Started with Neobrutalism →</a>
              <a href='templates/neobrutalism'>Preview Template</a>
            </div>
          </article>
          <article>
          <img src='templates/glassmorphismTemplate.png'/>
            <h2>Glassmorphism</h2>
            <div id='hiddenBtns'>
              <a href='templates/glassmorphism'>Get Started with glassmorphism →</a>
              <a href='templates/glassmorphism'>Preview Template</a>
            </div>
          </article>
          <article>
          <img src='templates/web3Template.png'/>
            <h2>Web3</h2>
            <div id='hiddenBtns'>
              <a href='templates/web3'>Get Started with Web3 →</a>
              <a href='templates/web3'>Preview Template</a>
            </div>
          </article>
          <article>
            <h2>Futurism</h2>
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
    </div>
  );
}
