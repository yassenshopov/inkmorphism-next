import logo from '../../styles/images/logoWh.png';
import defaultProfilePic from '../../styles/images/defaultProfilePic.png';
import app from "../../firebase/clientApp";
import { getAuth } from 'firebase/auth'
import { getFirestore, collection, getDoc, doc, setDoc } from 'firebase/firestore/lite';
import { useRouter } from 'next/router';
import Loader from '../components/loader.js'
import { useEffect, useState } from 'react';
import { FiLogOut, FiUser } from 'react-icons/fi'
  
export default function Dashnav() { 

    // const [userData, setUserData] = useState({
    //     profile_pic: defaultProfilePic.src
    // })
    // async function getData() {
    //     let db = getFirestore(app);
    //     const auth = getAuth(app);
    //     let uid;
    //     try {
    //         uid = "user-" + auth.currentUser.uid; 
    //     } catch(err) {
    //         uid = "_"  
    //     }
    //     const col = doc(db, (`users`), uid);
    //     console.log(col)
    //     let data = await getDoc(col);
    //     let renderedData = []
    //     // for (let entry in data._docs) {
    //     //     console.log(data._docs[entry].data())
    //     //     renderedData.push(data._docs[entry].data());
    //     // }
    //     // console.log(renderedData)
    //     // setUserData(renderedData)
    // } 


    const [loadBool, setLoadBool] = useState(false);
    const auth = getAuth(app);
    console.log(auth)
    let profile_pic;
    try {  
        profile_pic = auth.currentUser.photoURL;
    } catch(err) {         
        profile_pic = userData.profile_pic;
    }  
    let router = useRouter();
    function signOut() {
        setLoadBool(true)
        setTimeout(() => {
            auth.signOut()
            router.push('/login')
          }, 200)
    }
    function account() {
        router.push('/account')
    }

    const [popupToggle, setPopupToggle] = useState(false)
    const openPopup = () => {
        setPopupToggle(!popupToggle)
        console.log(popupToggle)
    }

    return (
        <nav id="dashnav">
            <a href='/' className='noSelect'>
                <img src={logo.src}/>
                <p>Inkmorphism</p>
            </a>
            <div id='rightPane'>
                <a href='../dashboard'>Dashboard</a>
                <div id='profileMenu'>
                    <p onClick={account}>My account < FiUser/></p>
                    {/* <p>|</p> */}
                    <p id="signOut" onClick={openPopup}>Log out < FiLogOut /></p>
                    <img src={profile_pic} id='profilePic' className={"noSelect"}/>
                </div>
            </div>

            <div style={{ display: ((popupToggle) ? 'flex' : 'none') }} id="popupWrapper">
                <form id="popup">
                    <p id="message">Are you sure you want to log out?</p>
                    <div id="buttons">
                        <p onClick={openPopup} className="noSelect">Cancel</p>
                        <p onClick={signOut} className="noSelect">Log out</p>
                    </div>
                </form>
            </div>
            {loadBool ? <Loader/> : ""}  
            {/* <button id="fetch" onClick={getData}></button> */}
        </nav>
    );   
}