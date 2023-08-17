import Head from "next/head";
import { FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import MainNav from "./components/MainNav";
import { useState, useEffect } from "react";
import MainFooter from "./components/MainFooter";

// Meta data:
let title = "Inkmorphism - the AI Website Builder";
let img = "main/og.webp";
let description =
  "Inkmorphism: the AI website builder that streamlines your design process. Create stunning sites effortlessly! Operates with OpenAI & Midjourney.";
let author = "Yassen Shopov";

export default function Home() {
  useEffect(() => {
    const handleScroll = () => {
      const element = document.querySelectorAll(".fade-in-section");
      if (element) {
        for (let i = 0; i < element.length; i++) {
          const rect = element[i].getBoundingClientRect();
          if (rect.y < window.innerHeight && rect.y + rect.height > 0) {
            element[i].classList.add("is-visible");
          } else {
            element[i].classList.remove("is-visible");
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on initial load
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div id="mainPage" className="darkMode">
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
            <h1>
              Create a website with the power of <span>AI</span>
            </h1>
            <h2>
              Inkmorphism builds on top of your ideas with the latest AI tools.
              Create stunning sites effortlessly!
            </h2>
            <a href="/templates" className="noSelect">
              Get started for free!
            </a>
            <h3>Try for free. No card required.</h3>
          </div>
          <div className="backgroundDecor"></div>
          <div className="backgroundDecor"></div>
          {/* <div id="exampleSites">
            <img src="main/example4.webp" />
            <img src="main/example1.webp" />
            <img src="main/example2.webp" />
          </div> */}
        </section>

        <section id="partners" className={`fade-in-section`}>
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

        <section className={`fade-in-section`}>
          <h2>A template for every one of your needs</h2>
          <p>
            Choose from a variety of templates to get started with your website.
          </p>
          <a className="ctaBtn noSelect" href="/templates">
            Get started for free
          </a>
          <div id="templateGallery">
          <a className="wrapper" href="/templates/industrial" target="_blank">
              <img src="/main/industrialThumbnail.png" loading="lazy" />
              <h3>Industrial</h3>
              <p>Industrial, a modern template for your business.</p>
            </a>
            <a className="wrapper" href="/templates/minimalism" target="_blank">
              <img src="/main/minimalismThumbnail.png" loading="lazy" />
              <h3>Minimalism</h3>
              <p>Minimalism is the art of using less to achieve more.</p>
            </a>
            <a
              className="wrapper"
              href="/templates/glassmorphism"
              target="_blank"
            >
              <img src="/main/glassmorphismThumbnail.png" loading="lazy" />
              <h3>Glassmorphism</h3>
              <p>Glassmorphism is a new trend in UI design.</p>
            </a>
            <a
              className="wrapper"
              href="/templates/neobrutalism"
              target="_blank"
            >
              <img src="/main/neobrutalismThumbnail.png" loading="lazy" />
              <h3>Neobrutalism</h3>
              <p>Neobrutalism is a new trend in UI design.</p>
            </a>
            <a className="wrapper" href="/templates/web3" target="_blank">
              <img src="/main/web3Thumbnail.png" loading="lazy" />
              <h3>Web 3.0</h3>
              <p>Web 3.0 is the next generation of the internet.</p>
            </a>
            <a className="wrapper" href="/templates/simple" target="_blank">
              <img src="/main/simpleThumbnail.png" loading="lazy" />
              <h3>Simple</h3>
              <p>Simple is the art of using less to achieve more.</p>
            </a>
          </div>
        </section>
        <section id="howItWorks" className={`fade-in-section`}>
          <h2>How it works:</h2>
          <p>
            Our AI is trained on the latest design trends and can create a
            website for you in seconds.
          </p>
          <div>
            <div className="step">
              <img src="/main/step1.png" />
              <h3>Step 1</h3>
              <p>Choose a template</p>
              <p>
                - Explore a variety of templates <br />
                - Choose the one that fits your needs <br />- Let our AI
                generate a website for you
              </p>
            </div>
            <div className="step">
              <img src="/main/step2.png" />
              <h3>Step 2</h3>
              <p>Enhance and customize</p>
              <p>
                - Add your own content <br />
                - Customize the design <br />- Use our AI helpers to improve
                your copy, images, and more
              </p>
            </div>
            <div className="step">
              <img src="/main/step3.png" />
              <h3>Step 3</h3>
              <p>Launch your site</p>
              <p>
                - Connect your domain <br />
                - Get ranked on Google <br />- Start receiving traffic
              </p>
            </div>
          </div>
        </section>
        <section id="features" className={`fade-in-section`}>
          <h2>Features</h2>
          <p>
            Inkmorphism is the AI website builder that streamlines your design
            process.
          </p>
          <div id="featuresPane">
            <div className="feature">
              <img src="/main/feature1.png" />
              <h3>AI helpers</h3>
              <p>
                Our AI helpers can improve your copy, images, and more. They
                will help you create a stunning website effortlessly.
              </p>
            </div>
            <div className="feature">
              <img src="/main/feature2.png" />
              <h3>Custom domains</h3>
              <p>
                Connect your own domain to your website. We will take care of
                the rest.
              </p>
            </div>
            <div className="feature">
              <img src="/main/feature3.png" />
              <h3>SEO</h3>
              <p>
                Our AI will help you rank on Google. We will take care of the
                rest.
              </p>
            </div>
            <div className="feature">
              <img src="/main/feature4.png" />
              <h3>Analytics</h3>
              <p>
                Track your website's performance with our built-in analytics
                tools.
              </p>
            </div>
            <div className="feature">
              <img src="/main/feature5.png" />
              <h3>Templates</h3>
              <p>
                Choose from a variety of templates to get started with your
                website.
              </p>
            </div>
            <div className="feature">
              <img src="/main/feature6.png" />
              <h3>Customization</h3>
              <p>
                Customize your website to fit your needs. Our AI will help you
                with that.
              </p>
            </div>
          </div>
        </section>
        {/* <section id="pricing">
          <h2>Simple pricing</h2>
          <p>
            We offer a free plan for you to try out our product. If you like it,
            you can upgrade to a paid plan.
          </p>
          <div id="pricingCards">
            <div className="card">
              <h3>Free</h3>
              <p>Try out our product for free.</p>
              <p>
                - 1 website <br />
                - 1 template <br />
                - 1 page <br />
                - 1 AI helper <br />
                - 1 custom domain <br />
                - 1 GB storage <br />
                - 1 GB bandwidth <br />
                - 1 email <br />
                - 1 GB email storage <br />
                - 1 GB email bandwidth <br />
              </p>
              <a className="ctaBtn noSelect" href="/templates">
                Get started for free
              </a>
            </div>
            <div className="card">
              <h3>Pro</h3>
              <p>Upgrade to a paid plan to unlock more features.</p>
              <p>
                - 1 website <br />
                - 1 template <br />
                - 1 page <br />
              </p>
              <a className="ctaBtn noSelect" href="/templates">
                Get started for free
              </a>
            </div>
            <div className="card">
              <h3>Business</h3>
              <p>Upgrade to a paid plan to unlock more features.</p>
              <p>
                - 1 website <br />
                - 1 template <br />
                - 1 page <br />
              </p>
              <a className="ctaBtn noSelect" href="/templates">
                Get started for free
              </a>
            </div>
          </div>
        </section> */}
      </main>

      <MainFooter />

      {/* <footer>
        <p>Inkmorphism © 2023</p>
        <div id="socialLinks">
          <a
            href="https://twitter.com/inkmorphism"
            target="_blank"
            className="noSelect"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com/inkmorphism"
            target="_blank"
            className="noSelect"
          >
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
      </footer> */}
    </div>
  );
}
