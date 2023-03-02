// pages/api/create-page.js

import fs from 'fs';

export default function handler(req, res) {
    const { folderName, pageTitle } = req.body;

    let pageTitleUp = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1); 
    //   create new folder
    fs.mkdirSync(`pages/clients/${folderName}`);
    console.log("1st half YES")

    // create new page file
    fs.writeFileSync(
    `pages/clients/${folderName}/index.js`,
    `export default function Default() {
        return (
        <div>
            <h1>${pageTitle}</h1>
            <p>This is a dynamically generated page.</p>
        </div>
        );
    }`
    );

  res.status(200).json({ message: 'Page created successfully.' });
}
