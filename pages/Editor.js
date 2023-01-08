import { HelmetProvider } from 'react-helmet-async';
import app from '../firebase/clientApp';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore/lite';

function Editor(props) {

  // FIREBASE FIRESTORE DB CODE:

  let db = getFirestore(app);
  async function getTheData(db, savedData) {
    const col = collection(db, "websites");
    // const dbData = await getDocs(col);
    // const dbRenderedData = dbData.docs.map(doc => doc.data());
    // console.log(dbData.docs)

    console.log(props['name'])

    await setDoc(doc(col, props['name']), savedData)
  }

  // getTheData(db)

  // END OF DB CODE

  // onkeydown = function(e) {
  //   if (e.ctrlKey && e.keyCode === 'R'.charCodeAt(0)) {
  //     // alert("You are attempting a restart")
  //     e.preventDefault();
  //     // return false;
  //     let dialog = this.document.querySelector("dialog");
  //     dialog.style.display = "block"
  //   }
  // };

  // VARIABLES:
  let defaults = {
    // Meta data:
    style_main           : "futurism",
    footer_txt           : "© 2023 Boris Drach",
    title                : "The Data Chunk | Boris | Substack",
    heading              : "The Data Chunk",
    subheading           : "Data driven analysis of a variety of topics",
    description          : "Build the perfect website with Aixolotl, the AI website builder. With intuitive drag-and-drop features and customizable templates, creating a professional website has never been easier.",
    author               : "Boris Drach",
    image                : "",
    nav                  : true,
    footer               : true,
    NL_email_placeholder : "Type your email...",
    nav_CTA              : "Subscribe",
    form_submit          : "Submit",
    link_past_issues_txt : "Read the latest issue"
  };

  let savedData = JSON.parse(JSON.stringify(defaults));

  for (const key in defaults) {
    try {
      let element = document.getElementsByClassName(key)[0];
      element.contentEditable = true;
      element.spellcheck = false;
    } catch(err) {
      // console.log(err)
    }
  }

  function saveNewData() {
    for (const key in defaults) {
      try {
        let element = document.getElementsByClassName(key)[0];
        savedData[key] = element.innerHTML;
      } catch(err) {
        // console.log(err)
      }
    }
    console.log(savedData)
    getTheData(db, savedData)
  };

  return (
    <div className="App">

      <HelmetProvider>
        <title>{defaults['title']}</title>
      </HelmetProvider>

      {/* <dialog open>
        <p>You are refreshing the page</p>
        <button>Ok</button><button>Maybe</button><button>Cancel</button>
      </dialog> */}

      <main id='editor'>
        <main>
          <button id='saveBtn' onClick={saveNewData}>Save</button>
          <header>
          <form>
              <h1 className='heading'>{defaults['heading']}</h1>
              <h2 className='subheading'>{defaults['subheading']}</h2>
              <div class="form_input">
                  <input type="email" placeholder={defaults['NL_email_placeholder']}></input>
                  <input type="submit" value={defaults["form_submit"]}></input>
              </div>
              <a href="#blog"><p className='link_past_issues_txt'>{defaults['link_past_issues_txt']}</p></a>
          </form>
          </header>
        </main>

        <footer>
          <p>Created with <a href="https://aixolotl.com">Aixolotl</a></p>
          <div>
              <p className='footer_txt'>{defaults["footer_txt"]}</p>
          </div>
        </footer>
      </main>

      <aside>

      </aside>
    </div>
  );
}

export default Editor;
