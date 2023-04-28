import { BsPlusLg } from "react-icons/bs";
import { BiLoaderAlt } from "react-icons/bi";

export default function Dash(props) {
  return (
    <main id="dash">
      <h1>Your Dashboard</h1>
      <div id="websites">
        <p>
          You have {props.sitesTotal} website project
          {props.sitesTotal === 1 ? "" : "s"} in total.{" "}
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
        {props.deletedSitesLen > 0 ? (
          <div>
            <p>
              {props.deletedSitesLen} Deleted website
              {props.deletedSitesLen === 1 ? "" : "s"}
            </p>
            <p>(They get permanently deleted after 30 days in the bin):</p>
          </div>
        ) : (
          ""
        )}
        {props.deletedSites}
      </div>
    </main>
  );
}
