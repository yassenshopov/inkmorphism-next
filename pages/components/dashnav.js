import logo from '../../styles/images/logoWh.png';
import app from "../../firebase/clientApp";
import { getAuth } from 'firebase/auth'
import { getFirestore, collection, getDoc, doc, setDoc } from 'firebase/firestore/lite';
import { useRouter } from 'next/router';
import Loader from '../components/loader.js'
import { useEffect, useState } from 'react';
import { FiLogOut, FiUser } from 'react-icons/fi'
  
export default function Dashnav(props) { 

    const [loadBool, setLoadBool] = useState(false)

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
                    <img src={props.profile_pic} id='profilePic' className={"noSelect"}/>
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