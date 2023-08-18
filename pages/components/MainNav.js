import { useRouter } from "next/router";
import { FiLogIn } from "react-icons/fi";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import app from "../../firebase/clientApp";
import Loader from "../components/loader.js";

export default function MainNav() {
  const auth = getAuth(app);
  const [sth, setSth] = useState("sth");

  useEffect(() => {
    setTimeout(() => {
      setSth("sth2");
    }, 2000);
  }, []);

  const [mobileToggle, setMobileToggle] = useState("");
  function mobileSwitch() {
    if (mobileToggle === "") {
      setMobileToggle("clicked");
    } else {
      setMobileToggle("");
    }
  }

  let router = useRouter();
  function redirect() {
    setTimeout(() => {
      router.push("/dashboard");
    }, 500);
  }

  function checkLogin() {
    setLoadBool(true);
    if (auth.currentUser !== null) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }

  const [loadBool, setLoadBool] = useState(false);

  return (
    <nav id="MainNav">
      {loadBool ? <Loader /> : ""}

      <a href="/" id="logo" className="noSelect">
        <img src="/logoWh.webp" />
        <p>Inkmorphism</p>
      </a>
      <div>
        <a className="noSelect" href="/templates">
          Browse templates
        </a>
        <a className="noSelect" href="/about">
          About us
        </a>
        <a className="noSelect" href="/blog">
          Blog
        </a>
        {auth.currentUser === null ? (
          <a className="noSelect signIn" href="/register" style={{fontWeight: 500}}>
            Get started for free
          </a>
        ) : (
          <a className="noSelect signIn" href="/dashboard">
            My dashboard
          </a>
        )}
      </div>
      <div
        id="mobileMenu"
        onClick={mobileSwitch}
        className={"noSelect " + mobileToggle}
      >
        <div id="bar1"></div>
        <div id="bar2"></div>
        <div id="bar3"></div>
      </div>
      <div id="overlayMenu" className={mobileToggle}>
        <a className="noSelect" href="/templates">
          Browse templates
        </a>
        <a className="noSelect" href="/about">
          About us
        </a>
        <a className="noSelect" href="/blog">
          Blog
        </a>
        {auth.currentUser === null ? (
          <a className="noSelect signIn" href="/register" style={{fontWeight: 500}}>
            Get started for free
          </a>
        ) : (
          <a className="noSelect signIn" href="/dashboard">
            My dashboard
          </a>
        )}
      </div>
    </nav>
  );
}
