import Head from "next/head";
import Link from "next/link";
import WIP from "./components/wip";
import MainNav from "./components/MainNav";
import { FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { GiFallingStar } from "react-icons/gi";
import { AiFillInfoCircle } from "react-icons/ai";
import { useState } from "react";
import MainFooter from "./components/MainFooter";
import { TfiTime } from "react-icons/tfi";

export default function Pricing() {
  const [monthlyPayment, setMonthlyPayment] = useState(true);

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
                  // window.location.href = "../templates";
                }}
                className="noSelect"
              >
                Get started
              </button>
              <ul>
                <li>
                  - Full access to all templates
                  <span>
                    <AiFillInfoCircle />
                    <div>
                      Unlimited access to the full gallery of Inkmorphism
                      templates
                    </div>
                  </span>
                </li>
                <li>
                  - Responsive design on mobile
                  <span>
                    <AiFillInfoCircle />
                    <div>
                      Layout is adjusted for all mobile devices for better user
                      experience
                    </div>
                  </span>
                </li>
                <li>
                  - Single page application (SPA)
                  <span>
                    <AiFillInfoCircle />
                    <div>A main page that contains all your sections</div>
                  </span>
                </li>
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
                <li>
                  - Full access to all templates
                  <span>
                    <AiFillInfoCircle />
                    <div>
                      Unlimited access to the full gallery of Inkmorphism
                      templates
                    </div>
                  </span>
                </li>
                <li>
                  - Responsive design on mobile
                  <span>
                    <AiFillInfoCircle />
                    <div>
                      Layout is adjusted for all mobile devices for better user
                      experience
                    </div>
                  </span>
                </li>
                <li>
                  - Single page application (SPA)
                  <span>
                    <AiFillInfoCircle />
                    <div>A main page that contains all your sections</div>
                  </span>
                </li>
                <li>
                  - Weekly consultation
                  <span>
                    <AiFillInfoCircle />
                    <div>
                      Weekly consultation with a professional web developer
                    </div>
                  </span>
                </li>
                <li>
                  - Website analytics
                  <span>
                    <AiFillInfoCircle />
                    <div>
                      Track your website's performance with Google Analytics
                    </div>
                  </span>
                </li>
                <li className="comingSoon">
                  <span></span>Coming soon<span></span>
                </li>
                <li>
                  - Multiple Pages
                  <span>
                    <AiFillInfoCircle />
                    <div>Create multiple pages for your website</div>
                  </span>
                </li>
                <li>
                  - Add a custom domain
                  <span>
                    <AiFillInfoCircle />
                    <div>Add a custom domain to your website</div>
                  </span>
                </li>
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
                To be announced <TfiTime/>
              </button>
              <ul>
                <li>
                  - Full access to all templates
                  <span>
                    <AiFillInfoCircle />
                    <div>
                      Unlimited access to the full gallery of Inkmorphism
                      templates
                    </div>
                  </span>
                </li>
                <li>
                  - Responsive design on mobile
                  <span>
                    <AiFillInfoCircle />
                    <div>
                      Layout is adjusted for all mobile devices for better user
                      experience
                    </div>
                  </span>
                </li>
                <li>
                  - Single page application (SPA)
                  <span>
                    <AiFillInfoCircle />
                    <div>A main page that contains all your sections</div>
                  </span>
                </li>
                <li>
                  - Weekly consultation
                  <span>
                    <AiFillInfoCircle />
                    <div>
                      Weekly consultation with a professional web developer
                    </div>
                  </span>
                </li>
                <li>
                  - Website analytics
                  <span>
                    <AiFillInfoCircle />
                    <div>
                      Track your website's performance with Google Analytics
                    </div>
                  </span>
                </li>
                <li>
                  - Multiple Pages
                  <span>
                    <AiFillInfoCircle />
                    <div>Create multiple pages for your website</div>
                  </span>
                </li>
                <li>
                  - Add a custom domain
                  <span>
                    <AiFillInfoCircle />
                    <div>Add a custom domain to your website</div>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section id="specialOffer">
          <div className="txt">
            <h2>Lifetime deal!</h2>
            <h3>(limited time)</h3>
            <p>
              You can get lifetime access to the <strong>Creator</strong> plan for 449$
            </p>
          </div>
        </section>
      </main>

      <MainFooter />
    </div>
  );
}
