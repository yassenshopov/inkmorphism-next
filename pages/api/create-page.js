// pages/api/create-page.js

import fs from 'fs';

export default function handler(req, res) {
  const { folderName, pageTitle } = req.body;

  // create new folder
  fs.mkdirSync(`pages/${folderName}`);

  // create new page file
  fs.writeFileSync(
    `pages/${folderName}/index.js`,
    `export default function ${pageTitle}() {
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
