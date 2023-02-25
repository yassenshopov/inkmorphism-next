import app from "../../firebase/clientApp";
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { MdAllOut } from 'react-icons/md'
import { BsPlusLg } from 'react-icons/bs'
import placeholder from '../../styles/images/placeholder.png';

export default function Dash() {
    


    useEffect(() => {
        const el = document.getElementById("fetch")
        setTimeout(() => {
            el.click();
        }, 1500)
    }, [])

    const [theData, setData] = useState("") 

    async function getData() {
        let db = getFirestore(app);
        const auth = getAuth(app);
        let uid;
        try {
            uid = "user-" + auth.currentUser.uid; 
        } catch(err) {
            uid = "_"  
        }
        const col = collection(db, (`users/` + uid + `/websites`));
        let data = await getDocs(col);
        let dbRenderedData = []
        for (let entry in data._docs) {
            dbRenderedData.push(data._docs[entry].data());
        }
        const websites = dbRenderedData.map((site) =>
            <article>
                < MdAllOut />
                <img src={(site.thumbnail==="") ? placeholder.src : site.thumbnail} />
                <h2>{site.name}</h2>
                <a href={"https://"+site.domain} target="_blank">{site.domain}</a>
                {/* <p>{site.initDate}</p> */}
            </article>
        )
        console.log(dbRenderedData)
        console.log(websites)
        setData(websites)
    } 

    return (
        <main id="dash">
            <h1>Your Dashboard</h1>
            <div id="websites">
                {theData}
                <a href="../templates">
                    <article><BsPlusLg/></article>
                </a>
            </div>
            <button id="fetch" onClick={getData}></button>
        </main>
    );
}
