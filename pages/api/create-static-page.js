import fs from "fs";

function itemToPage(item) {
  const sections = item.webContent.pages.main.structure.map(
    (section, index) => {
      switch (section.type) {
        case "txtOnly":
          return `
            <section
              key="${index}"
              className="${section.type + " " + section.options.direction}"
            >
              <p>${section.content.txt}</p>
            </section>
            `;
        case "imgAndTxt":
          return `
            <section
              key="${index}"
              className="${section.type + " " + section.options.direction}"
            >
              <p>${section.content.txt}</p>
              <img
                src="${section.content.img}"
                draggable="false"
                loading="${index > 3 ? "lazy" : "eager"}"
              />
            </section>
            `;
        case "nav":
          return `
            <nav 
              className="${section.type}" 
              key="${index}"
            >
              <a href="" id="navLogo" className="noSelect">
                <img src="${item.webContent.meta.metaFavicon}" draggable="false" />
                <p>${item.name}</p>
              </a>
            </nav>
            `;
        case "footer":
          return `
            <footer 
              className="${section.type}"
              key="${index}"
            >
              <p id="watermark">
                <a href="https://inkmorphism.com" target="_blank">
                  Built with Inkmorphism 🖋️
                </a>
              </p>
              <p>${section.content.txt}</p>
            </footer>
            `;
        case "imgOnly":
          return `
            <section
              key="${index}"
              className="${section.type + " " + section.options.direction}"
            >
              <img
                src="${section.content.img}"
                draggable="false"
                loading="${index > 3 ? "lazy" : "eager"}"
              />
            </section>
            `;
        default:
          break;
      }
    }
  );
  console.log(sections);
  return `
    import Head from "next/head";
    import { useEffect } from "react";
  
    export default function Default() {

          useEffect(() => {
            const root = document.documentElement;
            root.style.setProperty("--scrollbarThumb", "${item.webContent.meta.colorPalette.color1}");
            root.style.setProperty("--scrollbarTrack", "#121212");
          }, []);

          return (
            <main
              className={"${item.webContent.meta.metaStyle + " published"}"}
              style={{
                "--color1": "${item.webContent.meta["colorPalette"]["color1"]}",
                "--color2": "${item.webContent.meta["colorPalette"]["color2"]}",
                "--color3": "${item.webContent.meta["colorPalette"]["color3"]}",
                "--colorLight": "${
                  item.webContent.meta["colorPalette"]["colorLight"]
                }",
                "--colorDark": "${
                  item.webContent.meta["colorPalette"]["colorDark"]
                }",
                "--scrollbarThumb": "${item.webContent.meta.colorPalette.color1}",
                "--scrollbarTrack": "#121212",
              }}
            >
            <Head>
              <title>${item.webContent.meta.metaTitle}</title>
              <meta name="description" content="${item.webContent.meta.metaDescription}"></meta>
              <link rel="icon" href="${item.webContent.meta.metaFavicon}" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta name="author" content="${item.webContent.meta.metaAuthor}"></meta>
              <meta property="og:image" content="${item.webContent.meta.metaThumbnail}"></meta>
              <meta property="og:type" content="website"></meta>
              <meta property="og:title" content="${item.webContent.meta.metaTitle}"></meta>
              <meta
                property="og:description"
                content="${item.webContent.meta.metaDescription}"
              ></meta>
              <meta property="twitter:card" content="summary_large_image"></meta>
              <meta property="twitter:title" content="${item.webContent.meta.metaTitle}"></meta>
              <meta
                property="twitter:description"
                content="${item.webContent.meta.metaDescription}"
              ></meta>
            </Head>    
              ${sections}
            </main>
          );
      }`;
}

export default function handler(req, res) {
  const { item } = req.body;

  //   create new folder
  // fs.mkdirSync(`pages/sites/static/${data.domainSlug}`);
  // create new page file
  fs.writeFileSync(
    `pages/sites/static/${item.domainSlug}.json`,
    JSON.stringify(item)
  );
  fs.writeFileSync(`pages/sites/${item.domainSlug}.js`, itemToPage(item));

  res.status(200).json({ message: "Page created successfully." });
}
