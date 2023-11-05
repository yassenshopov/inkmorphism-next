const fs = require("fs");
const path = require("path");
require("dotenv").config();
const simpleGit = require("simple-git");
const { execSync } = require("child_process");
const fetch = require("node-fetch");

function itemToPage(item) {
  const sections = item.webContent.pages.main.structure
    .map((section, index) => {
      switch (section.type) {
        case "txtOnly":
          return `
            <section
              key="${index}"
              class="${section.type + " " + section.options.direction}"
            >
              <p>${section.content.txt}</p>
            </section>
            `;
        case "imgAndTxt":
          return `
            <section
              key="${index}"
              class="${section.type + " " + section.options.direction}"
            >
              <div class="txtWrapper">
                ${
                  section.content.heading !== ""
                    ? `<h2>${section.content.heading}</h2>`
                    : null
                }
                <p>${section.content.txt}</p>
              </div>
              <div class="imgWrapper">
                <img
                  src="${section.content.img}"
                  draggable="false"
                  loading="${index > 3 ? "lazy" : "eager"}"
                />
              </div>
            </section>
            `;
        case "nav":
          return `
            <nav 
              class="${section.type}" 
              key="${index}"
            >
              <a href="" id="navLogo" class="noSelect">
                <img src="${item.webContent.meta.metaFavicon}" draggable="false" />
                <p>${item.name}</p>
              </a>
            </nav>
            `;
        case "footer":
          return `
            <footer 
              class="${section.type}"
              key="${index}"
            >
              <p id="watermark">
                <a href="https://inkmorphism.com" target="_blank">
                  Built with Inkmorphism <img src="../logoWh.webp" />
                </a>
              </p>
              <p>${section.content.txt}</p>
            </footer>
            `;
        case "imgOnly":
          return `
            <section
              key="${index}"
              class="${section.type + " " + section.options.direction}"
            >
              <img
                src="${section.content.img}"
                draggable="false"
                loading="${index > 3 ? "lazy" : "eager"}"
              />
            </section>
            `;
        case "hero":
          return `
            <section
              key="${index}"
              class="${section.type}"
            >
              <div class="txtWrapper">
                ${
                  section.content.heading !== ""
                    ? `<h2>${section.content.heading}</h2>`
                    : null
                }
                <p>${section.content.txt}</p>
                <p class="cta"
                >${section.content.cta}</p>
              </div>
              <div class="imgWrapper">
                <img src='${section.content.img}'
                draggable="false"
                loading="${index > 3 ? "lazy" : "eager"}"
                />
              </div>
            </section>
        `;
        case "grid2":
          return `
              <section class="${
                section.type + " " + section.options.direction
              }">
                <h2
                >
                  ${section.content.heading}
                </h2>
                <div class="grid">
                  <article>
                    <div class="imgWrapper">
                      <img src="${
                        section.content.img1
                      }" draggable="false" loading="${
            index > 3 ? "lazy" : "eager"
          }"/>
                    </div>
                    <p
                    >
                      ${section.content.txt1}
                    </p>
                  </article>
                  <article>
                    <div class="imgWrapper">
                      <img src="${
                        section.content.img2
                      }" draggable="false" loading="${
            index > 3 ? "lazy" : "eager"
          }"/>
                    </div>
                    <p
                    >
                      ${section.content.txt2}
                    </p>
                  </article>
                </div>
              </section>
              `;
        case "grid3":
          return `
              <section class="${
                section.type + " " + section.options.direction
              }">
                <h2
                >
                  ${section.content.heading}
                </h2>
                <div class="grid">
                  <article>
                    <div class="imgWrapper">
                      <img src="${
                        section.content.img1
                      }" draggable="false" loading="${
            index > 3 ? "lazy" : "eager"
          }"/>
                    </div>
                    <p
                    >
                      ${section.content.txt1}
                    </p>
                  </article>
                  <article>
                    <div class="imgWrapper">
                      <img src="${
                        section.content.img2
                      }" draggable="false" loading="${
            index > 3 ? "lazy" : "eager"
          }"/>
                    </div>
                    <p
                    >
                      ${section.content.txt2}
                    </p>
                  </article>
                  <article>
                    <div class="imgWrapper">
                      <img src="${
                        section.content.img3
                      }" draggable="false" loading="${
            index > 3 ? "lazy" : "eager"
          }"/>
                    </div>
                    <p
                    >
                      ${section.content.txt3}
                    </p>
                  </article>
                </div>
              </section>
              `;
        case "maps":
          return `
          <section class="${section.type}">
            <h2>${section.content.heading}</h2>
            <div class="mapsWrapper">
              <iframe
                src="${section.content.embedURL}"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </section>
            `;
        default:
          break;
      }
    })
    .join("");
  console.log(sections);
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${item.webContent.meta.metaTitle}</title>
        <title>${item.webContent.meta.metaTitle}</title>
        <meta name="description" content="${
          item.webContent.meta.metaDescription
        }"></meta>
        <link rel="icon" href="${item.webContent.meta.metaFavicon}" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="${item.webContent.meta.metaAuthor}"></meta>
        <meta property="og:image" content="${
          item.webContent.meta.metaThumbnail
        }"></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:title" content="${
          item.webContent.meta.metaTitle
        }"></meta>
        <meta
          property="og:description"
          content="${item.webContent.meta.metaDescription}"
        ></meta>
        <meta property="twitter:card" content="summary_large_image"></meta>
        <meta property="twitter:title" content="${
          item.webContent.meta.metaTitle
        }"></meta>
        <meta
          property="twitter:description"
          content="${item.webContent.meta.metaDescription}"
        ></meta>
        <style>
        :root {
          --color1: ${item.webContent.meta["colorPalette"]["color1"]};
          --color2: ${item.webContent.meta["colorPalette"]["color2"]};
          --color3: ${item.webContent.meta["colorPalette"]["color3"]};
          --colorLight: ${item.webContent.meta["colorPalette"]["colorLight"]};
          --colorDark: ${item.webContent.meta["colorPalette"]["colorDark"]};
          --scrollbarThumb: ${item.webContent.meta.colorPalette.color1};
          --scrollbarTrack: #121212;
        }
        </style>
        <link rel="stylesheet" href="siteSections.css" />
        <link rel="stylesheet" href="${item.webContent.meta.metaStyle}.css" />
    </head>
    <body>
      <main
        class="${item.webContent.meta.metaStyle + " published"}"
      >
        ${sections}
      </main>
    </body>
    </html>
`;
}

export default async function handler(req, res) {
  function filePathToClientRepo(fileName) {
    return path.join(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "..",
      "clientRepos",
      folderName,
      fileName
    );
  }
  const folderName = req.body.site.domainSlug;
  const HTMLFilePath = filePathToClientRepo("index.html");
  const fileContent = itemToPage(req.body.site);
  fs.writeFileSync(HTMLFilePath, fileContent);

  //Copy the contents of file siteSections.css into siteSections.css in the client repo
  const siteSectionsFilePath = filePathToClientRepo("siteSections.css");
  const siteSectionsFileContent = fs.readFileSync(
    path.join(__dirname, "..", "..", "..", "..", "styles", "siteSections.css"),
    "utf8"
  );
  fs.writeFileSync(siteSectionsFilePath, siteSectionsFileContent);

  const metaStyleFilePath = filePathToClientRepo(
    req.body.site.webContent.meta.metaStyle + ".css"
  );
  const metaStyleFileContent = fs.readFileSync(
    path.join(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "styles",
      req.body.site.webContent.meta.metaStyle + ".css"
    ),
    "utf8"
  );
  fs.writeFileSync(metaStyleFilePath, metaStyleFileContent);

  try {
    // Ensure the directory is created (if it doesn't exist) before writing the file
    fs.mkdirSync(
      path.join(
        __dirname,
        "..",
        "..",
        "..",
        "..",
        "..",
        "clientRepos",
        folderName
      ),
      {
        recursive: true,
      }
    );

    // Write the file
    const githubToken =
      process.env.GITHUB_TOKEN || "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";
    console.log("GitHub access token:", githubToken);
    if (!githubToken) {
      console.error(
        "GitHub access token is missing. Please add it to the .env file."
      );
      process.exit(1);
    } else {
      console.log("GitHub access token is present.");
      const targetFolderPath = path.resolve(
        path.join(
          __dirname,
          "..",
          "..",
          "..",
          "..",
          "..",
          "clientRepos",
          folderName
        )
      );
      execSync(`cd ${targetFolderPath}`);

      // Initialize simple-git in the target folder
      const git = simpleGit(targetFolderPath);
      // Use git commands
      let existingOrigin = [];
      git
        .init()
        .add("./*")
        .commit(
          `Auto-generated commit: ${new Date().toLocaleString("en-US", {
            timeZone: "Europe/Sofia",
          })}`
        )
        .getRemotes(true) // Fetch list of existing remotes
        .then((remotes) => {
          console.log("Existing remotes:", remotes);
          existingOrigin = remotes.find((remote) => remote.name === "origin");
          console.log("Existing origin:", existingOrigin);
          if (!existingOrigin) {
            git.addRemote("origin", req.body.site.gitRepo);
            console.log("Added remote origin:", req.body.site.gitRepo);
            git.push(['-u', 'origin', 'main'], () => console.log('done'));
          }
          git.push(['-u', 'origin', 'main'], () => console.log('done'));
        })
    }
    console.log(`Successfully created ${filePath}`);
  } catch (err) {
    console.error("Error:", err);
  }
}
