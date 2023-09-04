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
import Loader from "./components/loader";
import { TbConfetti } from "react-icons/tb";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

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
  const [loader, setLoader] = useState(false);

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
        {loader ? <Loader /> : null}
        <section id="hero">
          <h1>Craft your website</h1>
          <h2>
            <span>(and let our </span>AI<span> make it better)</span>
          </h2>
          {/* <p id="fallingStar"><GiFallingStar /></p> */}
          <div
            id="paymentMode"
            onClick={paymentModeToggle}
            className="noSelect"
          >
            <p className={monthlyPayment ? "" : "dim"}>Monthly</p>
            <div
              className={`paymentModeSwitch ${
                monthlyPayment ? "monthly" : "annual"
              }`}
            >
              <div
                className={"switch " + (monthlyPayment ? "monthly" : "annual")}
              >
                <TbConfetti />
              </div>
            </div>
            <p className={monthlyPayment ? "dim" : ""}>Annual</p>
          </div>
        </section>
        <section id="plansGrid">
          <div className="plan">
            <p>
              <strong>Free</strong> plan
            </p>
            <h2>
              0$/
              {monthlyPayment ? <span>month</span> : <span>year</span>}
            </h2>
            <div className="features">
              <button
                onClick={() => {
                  window.location.href = "../templates";
                }}
                className="noSelect"
              >
                Start for free
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
            <p id="bestLabel">Most popular!</p>
            <p>
              <strong>Creator</strong> plan
            </p>
            {monthlyPayment ? (
              <h2>
                24$/<span>month</span>
              </h2>
            ) : (
              <h2>
                228$/<span>year</span>
              </h2>
            )}
            <div className="features">
              <button
                onClick={() => {
                  let price = monthlyPayment ? 24 : 19;
                  createCheckoutSession(user.currentUser.uid, price);
                  setLoader(true);
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
                  - Weekly report
                  <span>
                    <AiFillInfoCircle />
                    <div>
                      A descriptive weekly report from a professional web
                      developer that highlights improvements, ideas, performance
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
            {monthlyPayment ? (
              <h2>
                54$/<span>month</span>
              </h2>
            ) : (
              <h2>
                468$/<span>year</span>
              </h2>
            )}
            <div className="features">
              <button
                onClick={() => {
                  // window.location.href = "../templates";
                }}
                className="noSelect notWorking"
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
        <section id="faq">
          <h2>Frequently asked questions</h2>
          <div className="question">
            <h3>
              <span>
                <MdOutlineKeyboardArrowDown />
              </span>
              What is Inkmorphism?
              <div
                className="clicker"
                onClick={(e) => {
                  e.target.parentElement.parentElement.classList.toggle(
                    "clicked"
                  );
                }}
              ></div>
            </h3>
            <p>
              Inkmorphism is an AI-powered website builder that allows you to
              create stunning websites effortlessly. You can choose from a
              variety of templates and customize them to your liking.
              <br />
              <br />
              The key feature of Inkmorphism is AI enhancement. After you create
              your website, our professional web devs will review it and use AI
              to enhance it. This means that your website will be optimised,
              have better SEO, and will be more user-friendly.
              <br />
              <br />
              You also get a weekly report from our web devs that highlights
              improvements, ideas, and performance.
            </p>
          </div>

          <div className="question">
            <h3>
              <span>
                <MdOutlineKeyboardArrowDown />
              </span>
              Can I build a website without any technical knowledge?
              <div
                className="clicker"
                onClick={(e) => {
                  e.target.parentElement.parentElement.classList.toggle(
                    "clicked"
                  );
                }}
              ></div>
            </h3>
            <p>
              Yes! Inkmorphism is designed to be as simple as possible. You can
              create a website in just a few clicks. You don't need any
              technical knowledge to use Inkmorphism.
            </p>
          </div>

          <div className="question">
            <h3>
              <span>
                <MdOutlineKeyboardArrowDown />
              </span>
              Can I use my own domain name with Inkmorphism?
              <div
                className="clicker"
                onClick={(e) => {
                  e.target.parentElement.parentElement.classList.toggle(
                    "clicked"
                  );
                }}
              ></div>
            </h3>
            <p>
              Yes! You can use your own domain name with Inkmorphism. You can
              either buy a domain name from us or use your own domain name and
              transfer it.
            </p>
          </div>

          <div className="question">
            <h3>
              <span>
                <MdOutlineKeyboardArrowDown />
              </span>
              Is there a free trial?
              <div
                className="clicker"
                onClick={(e) => {
                  e.target.parentElement.parentElement.classList.toggle(
                    "clicked"
                  );
                }}
              ></div>
            </h3>
            <p>
              Yes! You can try Inkmorphism for free. You can create a website
              and use it for free -{" "}
              <a href="#pricing">then upgrade to a paid plan at any time</a>.
            </p>
          </div>

          <div className="question">
            <h3>
              <span>
                <MdOutlineKeyboardArrowDown />
              </span>
              Can I change my subscription plan?
              <div
                className="clicker"
                onClick={(e) => {
                  e.target.parentElement.parentElement.classList.toggle(
                    "clicked"
                  );
                }}
              ></div>
            </h3>
            <p>
              Yes, you can change your subscription plan at any time by going to
              the settings of your website.
            </p>
          </div>

          <div className="question">
            <h3>
              <span>
                <MdOutlineKeyboardArrowDown />
              </span>
              Who will be working on my website?
              <div
                className="clicker"
                onClick={(e) => {
                  e.target.parentElement.parentElement.classList.toggle(
                    "clicked"
                  );
                }}
              ></div>
            </h3>
            <p>
              After creating a website and choosing a paid plan, we will assign
              you a web developer from our team. They will be working on your
              website and will use the most modern AI tools to enhance it.
            </p>
          </div>
        </section>
        {/* <section>
          {!isCreator ? (
            <button
              onClick={() => {
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
        </section> */}
      </main>

      <MainFooter />
    </div>
  );
}
