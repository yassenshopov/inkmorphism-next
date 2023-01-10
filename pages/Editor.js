import { HelmetProvider } from 'react-helmet-async';
import app from '../firebase/clientApp';
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore/lite';
import { useEffect, useState } from 'react';

function Editor(props) {

  console.log(props['name'])
  // VARIABLES:
  let callbackDefaults = { 
    // Meta data:
    style_main           : "futurism",
    footer_txt           : "Footer Text",
    title                : "Meta title",
    heading              : "Default heading",
    subheading           : "Default subheading",
    description          : "Build the perfect website with Aixolotl, the AI website builder. With intuitive drag-and-drop features and customizable templates, creating a professional website has never been easier.",
    author               : "Default Author",
    image                : "",
    nav                  : true,
    footer               : true,
    NL_email_placeholder : "Default email placeholder",
    nav_CTA              : "CTA",
    form_submit          : "Form submit",
    link_past_issues_txt : "Link to past issues"
  }; 

  // FIREBASE FIRESTORE DB CODE:

  let db = getFirestore(app);
  const col = collection(db, "websites");

  const [defaults, setData] = useState(callbackDefaults);

  // This is a smart roundabout => On the initial render, the button is clicked programmatically,
  // and thus the data that's been fetched is displayed on the page.
  useEffect(() => {
    const el = document.getElementById("fetch")
    setTimeout(() => {
      el.click()
    }, 1500)
  }, [])

  async function getData() {
    const data = await getDocs(col);
    for (let entry in data._docs) {
      if (data._docs[entry].id == props['name']) {
        let dbRenderedData = data._docs[entry].data();
        console.log(dbRenderedData)
        setData(dbRenderedData)
      }
    }
  }

  async function sendData(savedData) {
    await setDoc(doc(col, props['name']), savedData)
  }

  // console.log(receivedData)
 
  // dataSetting().
  // then(data => {
  //   console.log(data)
  //   setData(data)
  // })

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
    sendData(savedData)
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
          <button id="fetch" onClick={getData}>Fetch</button>
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
