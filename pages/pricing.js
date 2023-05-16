import Head from "next/head";
import Link from "next/link";
import WIP from "./components/wip";
import MainNav from "./components/MainNav";
import { FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { GiFallingStar } from "react-icons/gi";
 import { AiFillInfoCircle } from "react-icons/ai";
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
          <h1>Craft your website</h1>
          <h2>
            <span>(and let </span>AI<span> make it better)</span>
          </h2>
          <p id="fallingStar">{/* <GiFallingStar /> */}</p>
          <div
            id="paymentMode"
            onClick={paymentModeToggle}
            className="noSelect"
          >
            <p className={monthlyPayment ? "dim" : ""}>Monthly</p>
            <div
              className={`paymentModeSwitch ${
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
                className="noSelect"
              >
                Get started
              </button>
              <ul>
              <li>- Full access to all templates<span><AiFillInfoCircle/><div>Unlimited access to the full gallery of Inkmorphism templates</div></span></li>
                <li>- Responsive design on mobile</li>
                <li>- Single page application (SPA)</li>
              </ul>
            </div>
          </div>
          <div className="plan best">
            {/* <p id="bestLabel">Most popular!</p> */}
            <p>
              <strong>Creator</strong> plan
            </p>
            <h2>
              {monthlyPayment ? 19 : 24}$/<span>month</span>
            </h2>
            <div className="features">
              <button
                onClick={() => {
                  window.location.href = "../templates";
                }}
                className="noSelect"
              >
                Get started
              </button>{" "}
              <ul>
                <li>- Full access to all templates<span><AiFillInfoCircle/><div>Unlimited access to the full gallery of Inkmorphism templates</div></span></li>
                <li>- Responsive design on mobile<span><AiFillInfoCircle/></span></li>
                <li>- Single page application (SPA)<span><AiFillInfoCircle/></span></li>
                <li className="comingSoon">
                  <span></span>Coming soon<span></span>
                </li>
                <li>- Multiple Pages<span><AiFillInfoCircle/></span></li>
              </ul>
            </div>
          </div>
          <div className="plan notWorking">
            <p>
              <strong>Business</strong> plan
            </p>
            <h2>
              {monthlyPayment ? 39 : 54}$/<span>month</span>
            </h2>
            <div className="features">
              <button
                onClick={() => {
                  window.location.href = "../templates";
                }}
                className="noSelect"
              >
                To be announced
              </button>
              <ul>
                <li>- Full access to all templates</li>
                <li>- Responsive design on mobile</li>
                <li>- Single page application (SPA)</li>
                <li>Multiple Pages</li>
                <li>Custom domain</li>
                <li>Custom email</li>
                <li>Custom analytics</li>
                <li>Custom SEO</li>
                <li>Custom social media</li>
                <li>Custom integrations</li>
              </ul>
            </div>
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
