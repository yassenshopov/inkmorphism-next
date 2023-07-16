import Head from "next/head";
import MainNav from "./components/MainNav";
import { AiFillInfoCircle } from "react-icons/ai";
import { useState } from "react";
import MainFooter from "./components/MainFooter";
import { TfiTime } from "react-icons/tfi";
import app from "../firebase/clientApp";
import { getAuth } from "firebase/auth";
import useCreatorStatus from "../stripe/useCreatorStatus";
import createCheckoutSession from "../stripe/createCheckoutSession";

// Meta data:
let title = "Inkmorphism Pricing | Affordable Plans for Every Need";
let img = "https://inkmorphism.com/pricing/og.webp";
let description =
  "Choose from our range of affordable pricing plans for our AI-powered website builder and create stunning websites effortlessly.";
let author = "Yassen Shopov";

export default function Pricing() {
  const [user, setUser] = useState(getAuth(app));
  const isCreator = useCreatorStatus(user);

  const [monthlyPayment, setMonthlyPayment] = useState(true);

  function paymentModeToggle() {
    setMonthlyPayment(!monthlyPayment);
  }

  return (
    <div className={"Pricing"}>
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

      {/* <WIP/> */}
      <main id="pricing">
        <section id="hero">
          <h1>Craft your website</h1>
          <h2>
            <span>(and let </span>AI<span> make it better)</span>
          </h2>
          {/* <p id="fallingStar"><GiFallingStar /></p> */}
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
                  // window.location.href = "../templates";
                }}
                className="noSelect"
              >
                To be announced <TfiTime />
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
        <section>
          {!isCreator ? (
            <button
              onClick={() => {
                console.log(user.currentUser.uid);
                createCheckoutSession(user.currentUser.uid);
              }}
              id="subscribe"
              className="noSelect"
            >
              Subscribe
            </button>
          ) : (
            <button
              onClick={() => {
                window.location.href = "../dashboard";
              }}
              id="subscribe"
              className="noSelect"
            >
              Go to dashboard
            </button>
          )}
        </section>
        <section id="specialOffer">
          <div className="txt">
            <h2>Lifetime deal!</h2>
            <h3>
              Limited time offer{" "}
              <span>
                <TfiTime />
              </span>
            </h3>
            <p>
              You can get lifetime access to the <strong>Creator</strong> plan
              for 449$
            </p>
          </div>
          <div className="visual">{/* <img src="clock.png" /> */}</div>
        </section>
      </main>

      <MainFooter />
    </div>
  );
}
