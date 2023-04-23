import fs from 'fs';

export default function handler(req, res) {

    const { item } = req.body;

    //   create new folder
    // fs.mkdirSync(`pages/sites/static/${data.domainSlug}`);
    // create new page file
    fs.writeFileSync(
    `pages/sites/static/${item.domainSlug}.json`,
        JSON.stringify(item)
    );

  res.status(200).json({ message: 'Page created successfully.' });
}
