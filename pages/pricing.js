import Head from "next/head";
import Link from "next/link";
import WIP from "./components/wip";
import MainNav from "./components/MainNav";
import { FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { GiFallingStar } from "react-icons/gi";
import { useState } from "react";

export default function Pricing() {
  const [monthlyPayment, setMonthlyPayment] = useState(false);

  function paymentModeToggle() {
    setMonthlyPayment(!monthlyPayment);
  }

  return (
    <div className={"Pricing"}>
      <Head>
        {/* <link rel="icon" href={defaultFiles['logo']} /> */}
        <title>Inkmorphism - Pricing</title>
        <link rel="icon" href="/faviconWh.ico" />
      </Head>

      <MainNav />

      {/* <WIP/> */}
      <main id="pricing">
        <section id="hero">
          <h1>Create your website</h1>
          <h2>(and let AI make it better)</h2>
          <p id="fallingStar">
            {/* <GiFallingStar /> */}
          </p>
          <div id="paymentMode" onClick={paymentModeToggle}>
            <p className={monthlyPayment ? "dim" : ""}>Monthly</p>
            <div
              className={`noSelect paymentModeSwitch ${
                monthlyPayment ? "monthly" : "annual"
              }`}
            >
              <div
                className={"switch " + (monthlyPayment ? "clicked" : "annual")}
              ></div>
            </div>
            <p className={monthlyPayment ? "" : "dim"}>Annual</p>
          </div>
        </section>
        <section id="plansGrid">
          <div className="plan">
            <p>
              <strong>Free</strong> plan
            </p>
            <h2>
              0$/<span>month</span>
            </h2>
            <div className="features">
              <button
                onClick={() => {
                  window.location.href = "../templates";
                }}
              >
                Get started
              </button>
              <p>Full access to all templates</p>
            </div>
          </div>
          <div className="plan best">
            <p id="bestLabel">Most popular!</p>
            <p>
              <strong>Creator</strong> plan
            </p>
            <h2>
              19$/<span>month</span>
            </h2>
            <button
              onClick={() => {
                window.location.href = "../templates";
              }}
            >
              Get started
            </button>{" "}
            <p>Free forever</p>
            <p>1 website</p>
            <p>1 page</p>
            <p>1 template</p>
            <p>1 revision</p>
          </div>
          <div className="plan">
            <p>
              <strong>Business</strong> plan
            </p>
            <h2>
              39$/<span>month</span>
            </h2>
            <button
              onClick={() => {
                window.location.href = "../templates";
              }}
            >
              Get started
            </button>
            <p>Free forever</p>
            <p>1 website</p>
            <p>1 page</p>
            <p>1 template</p>
            <p>1 revision</p>
            <p>1 publish</p>
            <p>1 domain</p>
            <p>1 GB storage</p>
            <p>1 GB bandwidth</p>
            <p>1 email</p>
            <p>1 user</p>
            <p>1 support</p>
            <p>1 analytics</p>
            <p>1 SEO</p>
            <p>1 social media</p>
            <p>1 integrations</p>
          </div>
        </section>
      </main>

      <footer>
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
      </footer>
    </div>
  );
}
