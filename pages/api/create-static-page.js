import fs from "fs";

function itemToPage(item) {
  const sections = item.webContent.pages.main.structure.map(
    (section, index) => {
      switch (section.type) {
        case "txtOnly":
          return (
            `
            <section
              key="${index}"
              className="${section.type + " " + section.options.direction}"
            >
              <p>${section.content.txt}</p>
            </section>
            `
          );
        case "imgAndTxt":
          return (
            `
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
            `
          );
        case "nav":
          return (
            `
            <nav 
              className="${section.type}" 
              key="${index}"
            >
              <a href="" id="navLogo" className="noSelect">
                <img src="${item.webContent.meta.metaFavicon}" draggable="false" />
                <p>${item.name}</p>
              </a>
            </nav>
            `
          );
        case "footer":
          return (
            `
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
            `
          );
        case "imgOnly":
          return (
            `
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
            `
          );
        default:
          break;
      }
    }
  );
  console.log(sections);
  return `export default function Default() {
        return (
          <main
            className={"${item.webContent.meta.metaStyle + " published"}"}
            style={{
              "--color1": "${item.webContent.meta["colorPalette"]["color1"]}",
              "--color2": "${item.webContent.meta["colorPalette"]["color2"]}",
              "--color3": "${item.webContent.meta["colorPalette"]["color3"]}",
              "--colorLight": "${item.webContent.meta["colorPalette"]["colorLight"]}",
              "--colorDark": "${item.webContent.meta["colorPalette"]["colorDark"]}"              
            }}
          >            
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
