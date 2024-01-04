import Head from "next/head";
import WIP from "./components/wip";
import MainNav from "./components/MainNav";
import MainFooter from "./components/MainFooter";

export default function About() {
  // Meta data:
  let title = "Inkmorphism | About us";
  let img = "main/og.webp";
  let description =
    "Read more about the team and story behind the most versatile AI-powered website builder, whose mission is the success of your product.";
  let author = "Yassen Shopov";

  return (
    <div className={"About"}>
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

      <section className="hero">
        <h1>About us</h1>
        <h2>
          Our mission - Making your products <span>shine</span>.
        </h2>
        <img src="/about/hero.webp" />
      </section>

      <section className="whoAreWe">
        <h2>Who are we?</h2>
        <p>
          We are a team of 3 people, who are passionate about creating
          high-quality products. We are constantly looking for new ways to
          improve our products and make them more accessible to everyone.
        </p>
        <img src="/about/whoAreWe.webp" />
      </section>

      {/* <WIP /> */}
      {/* <main>
        123
      </main> */}

      <MainFooter />
    </div>
  );
}
