import { useState } from "react";

export default function CPanel() {
    const [folderName, setFolderName] = useState('default');
    const [pageTitle, setPageTitle] = useState('default');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const response = await fetch('http://localhost:3000/api/create-page', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ folderName, pageTitle })
        });

        const data = await response.json();
        console.log(data.message);
        } catch (error) {
        console.error(error);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <label>
            Folder name:
            <input type="text" value={folderName} onChange={(e) => setFolderName(e.target.value)} />
            </label>
            <br />
            <label>
            Page title:
            <input type="text" value={pageTitle} onChange={(e) => setPageTitle(e.target.value)} />
            </label>
            <br />
            <button type="submit">Create page</button>
        </form>
    )
}