import React, { useEffect, useState } from "react";
import Dashnav from "../components/dashnav";
import { getAuth } from "firebase/auth";
import app from "../../firebase/clientApp";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { AiFillCheckCircle } from "react-icons/ai";
import { doc, setDoc, updateDoc } from "firebase/firestore/lite";
import { MdOutlineContentCopy } from "react-icons/md";

export default function Sandbox() {
  const [websites, setWebsites] = useState([]);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const [uid, setUid] = useState("user-");

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        if (auth.currentUser) {
          setUid("user-" + auth.currentUser.uid);
        }

        const col = collection(db, `users/${uid}/websites`);
        const querySnapshot = await getDocs(col);

        const dbRenderedData = querySnapshot.docs.map((doc) => doc.data());
        setWebsites(dbRenderedData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWebsites();
  }, [websites]);

  function changeMetaProp(prop, value, id) {
    console.log(prop, value);
    //change the property of the mapped object in firebase
    let propRef = doc(db, `users/${uid}/websites/${id}`);
    updateDoc(propRef, {
      [`webContent.meta.${prop}`]: value,
    });
  }

  const [addNewKeywordMode, setAddNewKeywordMode] = useState(false);
  const [copied, setCopied] = useState(false);

//   const [domain, setDomain] = useState("");
//   const [results, setResults] = useState(null);

//   const API_KEY =
//     "pk1_541c5e9b37047cd87bd30d43848c41dce7322efa4924d028c65ff60091dc89fc";
//   const API_KEY_SECRET =
//     "sk1_42dd3b63afae45be5bef4be047e418cfef34a07a15c30f551962bbf92e48ee0c";
//   const API_BASE_URL = "https://porkbun.com/api/json/v3/";

//   async function searchDomainPrices(domain) {
//     const url = `${API_BASE_URL}?domain=${domain}`;
//     const response = await fetch(url, {
//         headers: {
//           Authorization: `Bearer ${API_KEY}`,
//         },
//       });
//     return data;
//   }

//   const handleSearch = async () => {
//     if (domain) {
//       const data = await searchDomainPrices(domain);
//       setResults(data);
//     }
//   };

  return (
    <div className="Sandbox">
      <Dashnav />
      <div className="content">
        <h1>Sandbox</h1>
        {/* <div>
          <h2>Choose a domain:</h2>
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Enter a domain name"
          />
          <button onClick={handleSearch}>Search</button>
          {results && (
            <div>
              <h2>Domain Search Results</h2>
              <pre>{JSON.stringify(results, null, 2)}</pre>
            </div>
          )}
        </div> */}
        {websites.map((website) => (
          <div key={website.id} className="website">
            <div className="mainData">
              <h2>{website.name}</h2>
              <img src={website.webContent.meta.metaThumbnail} />
              <p>{website.domain}</p>
              <hr style={{ width: "100%", backgroundColor: "black" }} />
              <div>
                <h2>Prompts for GPT</h2>
                <h3>Meta Description:</h3>
                <p className="gptPrompt">
                  Write a meta description that's 100% optimised for SEO and is
                  guaranteed to rank on Google's first page with the following
                  metrics:
                  <br></br>
                  <br></br>
                  Character limit: 160
                  <br></br>
                  Keyword density: 1.5%
                  <br></br>
                  Flesch readability score: 60
                  <br></br>
                  Sentiment: Positive
                  <br></br>
                  {website.webContent.meta.metaTitle
                    ? "Webpage Title: " + website.webContent.meta.metaTitle
                    : ""}
                  <br></br>
                  {website.webContent.meta.pageContentSummary
                    ? "Page Content Summary: " +
                      website.webContent.meta.pageContentSummary
                    : ""}
                  <br></br>
                  {website.webContent.meta.targetAudience
                    ? "Target Audience: " +
                      website.webContent.meta.targetAudience
                    : ""}
                  <br></br>
                  {website.webContent.meta.callToAction
                    ? "Call to Action: " + website.webContent.meta.callToAction
                    : ""}
                  <br></br>
                  Keywords: {website.webContent.meta.keywords.join(", ")}
                </p>
                <button
                  className="copyBtn"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "Write a meta description that's 100% optimised for SEO and is guaranteed to rank on Google's first page with the following metrics: Character limit: 160 Keyword density: 1.5% Flesch readability score: 60 Sentiment: Positive " +
                        website.webContent.meta.metaTitle +
                        " " +
                        website.webContent.meta.pageContentSummary +
                        " " +
                        website.webContent.meta.targetAudience +
                        " " +
                        website.webContent.meta.callToAction +
                        " Keywords: " +
                        website.webContent.meta.keywords.join(", ")
                    );
                    setCopied(true);
                    setTimeout(() => {
                      setCopied(false);
                    }, 2000);
                  }}
                >
                  {copied ? <AiFillCheckCircle /> : <MdOutlineContentCopy />}
                </button>
                <h3>Meta Title:</h3>
                <p className="gptPrompt">
                  Write a meta title that's 100% optimised for SEO and is
                  guaranteed to rank on Google's first page with the following
                  metrics:
                  <br></br>
                  <br></br>
                  Character limit: 60
                  <br></br>
                  Keyword density: 1.5%
                  <br></br>
                  Flesch readability score: 60
                  <br></br>
                  Sentiment: Positive
                  <br></br>
                  {website.webContent.meta.pageContentSummary
                    ? "Page Content Summary: " +
                      website.webContent.meta.pageContentSummary
                    : ""}
                  <br></br>
                  {website.webContent.meta.targetAudience
                    ? "Target Audience: " +
                      website.webContent.meta.targetAudience
                    : ""}
                  <br></br>
                  {website.webContent.meta.callToAction
                    ? "Call to Action: " + website.webContent.meta.callToAction
                    : ""}
                  <br></br>
                  Keywords: {website.webContent.meta.keywords.join(", ")}
                </p>
                <button
                  className="copyBtn"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "Write a meta title that's 100% optimised for SEO and is guaranteed to rank on Google's first page with the following metrics: Character limit: 60 Keyword density: 1.5% Flesch readability score: 60 Sentiment: Positive " +
                        website.webContent.meta.pageContentSummary +
                        " " +
                        website.webContent.meta.targetAudience +
                        " " +
                        website.webContent.meta.callToAction +
                        " Keywords: " +
                        website.webContent.meta.keywords.join(", ")
                    );
                    setCopied(true);
                    setTimeout(() => {
                      setCopied(false);
                    }, 2000);
                  }}
                >
                  {copied ? <AiFillCheckCircle /> : <MdOutlineContentCopy />}
                </button>
              </div>
            </div>
            <div className="metaData">
              <div>
                <h3>Website Title:</h3>
                <textarea
                  type="text"
                  className="rw"
                  defaultValue={website.webContent.meta.metaTitle || ""}
                  placeholder="Write your website title here..."
                  onChange={(e) => {
                    changeMetaProp(
                      "metaTitle",
                      e.target.value,
                      website.domainSlug
                    );
                  }}
                ></textarea>
                {website.webContent.meta.metaTitle ? <AiFillCheckCircle /> : ""}
              </div>
              <div>
                <h3>Page Content Summary:</h3>
                <textarea
                  type="text"
                  className="rw"
                  defaultValue={
                    website.webContent.meta.pageContentSummary || ""
                  }
                  placeholder="Write a short summary of your page..."
                  onChange={(e) => {
                    changeMetaProp(
                      "pageContentSummary",
                      e.target.value,
                      website.domainSlug
                    );
                  }}
                ></textarea>
                {website.webContent.meta.pageContentSummary ? (
                  <AiFillCheckCircle />
                ) : (
                  ""
                )}
              </div>
              <div>
                <h3>Target Audience:</h3>
                <textarea
                  type="text"
                  className="rw"
                  defaultValue={website.webContent.meta.targetAudience || ""}
                  placeholder="Who is your target audience?"
                  onChange={(e) => {
                    changeMetaProp(
                      "targetAudience",
                      e.target.value,
                      website.domainSlug
                    );
                  }}
                ></textarea>
                {website.webContent.meta.targetAudience ? (
                  <AiFillCheckCircle />
                ) : (
                  ""
                )}
              </div>
              <div>
                <h3>Call to Action:</h3>
                <textarea
                  type="text"
                  className="rw"
                  defaultValue={website.webContent.meta.callToAction || ""}
                  placeholder='What do you want your audience to do? ("Buy now", "Sign up", etc.)'
                  onChange={(e) => {
                    changeMetaProp(
                      "callToAction",
                      e.target.value,
                      website.domainSlug
                    );
                  }}
                ></textarea>
                {website.webContent.meta.callToAction ? (
                  <AiFillCheckCircle />
                ) : (
                  ""
                )}
              </div>
              <div className="keywords">
                <h3>Keywords:</h3>
                <div className="keywordsWrapper">
                  {website.webContent.meta.keywords.map((keyword) => (
                    <p
                      key={keyword}
                      onClick={() => {
                        //delete on click
                        changeMetaProp(
                          "keywords",
                          website.webContent.meta.keywords.filter(
                            (kw) => kw !== keyword
                          ),
                          website.domainSlug
                        );
                      }}
                    >
                      {keyword}
                    </p>
                  ))}
                  {addNewKeywordMode ? (
                    <input
                      type="text"
                      className="rw keyword"
                      placeholder="Add a new keyword..."
                      onBlur={(e) => {
                        changeMetaProp(
                          "keywords",
                          [...website.webContent.meta.keywords, e.target.value],
                          website.domainSlug
                        );
                        setAddNewKeywordMode(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          changeMetaProp(
                            "keywords",
                            [
                              ...website.webContent.meta.keywords,
                              e.target.value,
                            ],
                            website.domainSlug
                          );
                          setAddNewKeywordMode(false);
                        }
                      }}
                    ></input>
                  ) : (
                    <p
                      className="addMore"
                      onClick={() => {
                        setAddNewKeywordMode(true);
                      }}
                    >
                      +
                    </p>
                  )}
                </div>
                {website.webContent.meta.keywords.length > 0 ? (
                  <AiFillCheckCircle />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
