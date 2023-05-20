import { useState } from "react";
import Dashfooter from "../components/dashfooter";
import Dashnav from "../components/dashnav";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore/lite";

export default function ContentStudio() {
  const [formData, setFormData] = useState({
    author: "",
    description: "",
    isPublished: false,
    thumbnail: "",
    title: "",
    urlSlug: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

    const db = getFirestore();

  function makeEntry() {
    // document.getElementById("submit").innerHTML = "Submitted!";
    // const form = document.getElementById("newBlogForm");
    const ref = collection(db, "articles");
    setDoc(doc(ref, formData.urlSlug), formData);
    console.log(formData);
  }

  function preventDefault(e) {
    e.preventDefault();
  }

  return (
    <div id="contentStudio">
      <Dashnav />
      <main>
        <form
          id="newBlogForm"
          onSubmit={(e) => {
            preventDefault();
          }}
        >
          <h2>New blog entry</h2>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title..."
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="urlSlug">URL Slug:</label>
            <input
              type="text"
              name="urlSlug"
              id="urlSlug"
              placeholder="URL Slug..."
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              name="description"
              id="description"
              placeholder="Description..."
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="thumbnail">Thumbnail:</label>
            <input
              type="file"
              name="thumbnail"
              id="thumbnail"
              placeholder="Thumbnail..."
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="author">Author:</label>
            <input
              type="text"
              name="author"
              id="author"
              placeholder="Author..."
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="isPublished">Published?</label>
            <input
              type="checkbox"
              name="isPublished"
              id="isPublished"
              placeholder="Published?"
              onChange={handleChange}
            />
          </div>
          <div>
            <p
              id="submit"
              onClick={() => {
                makeEntry();
              }}
            >
              Submit
            </p>
          </div>
        </form>
      </main>
      <Dashfooter />
    </div>
  );
}
