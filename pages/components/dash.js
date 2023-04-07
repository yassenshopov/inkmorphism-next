import { BsPlusLg } from "react-icons/bs";
import { BiLoaderAlt } from "react-icons/bi";

export default function Dash(props) {
  return (
    <main id="dash">
      <h1>Your Dashboard</h1>
      <div id="websites">
        <p>
          You have {props.sitesTotal} website projects in total.{" "}
          {props.sitesTotal <= 10 ? (
            <a href="../templates">Start a new one?</a>
          ) : (
            ""
          )}
        </p>
        {props.theData === "" ? <BiLoaderAlt id="loaderSites" /> : ""}
        {props.theData}
        {props.sitesTotal <= 10 ? (
          <a href="../templates" id="linkTemplates">
            <article>
              <BsPlusLg />
            </article>
          </a>
        ) : (
          ""
        )}
      </div>
    </main>
  );
}
