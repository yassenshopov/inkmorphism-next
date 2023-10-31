import { FiLogIn } from "react-icons/fi";
import { useEffect, useState } from "react";
import Loader from "./loader.js";
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function MainFooter() {
  const [loadBool, setLoadBool] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.dataset.uid = '41dc387760';
    script.src = 'https://inkmorphism.ck.page/41dc387760/index.js';
    document.getElementById("footerLeft").appendChild(script);

    return () => {
      try {
        document.getElementById("footerLeft").removeChild(script);
      } catch (e) {
        console.log(e);
      }
      // Cleanup: remove the script element when the component unmounts
    };
  }, []);

  return (
    <footer id="MainFooter">
      {loadBool ? <Loader /> : ""}
        <div id="footerLeft">
          {/* <p>Inkmorphism © 2023</p> */}
        </div>
        <div id="footerRight">
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
        </div>
    </footer>
  );
}
