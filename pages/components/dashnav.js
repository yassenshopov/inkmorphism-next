import logo from '../../styles/images/logoWh.webp';
import app from "../../firebase/clientApp";
import { getAuth } from 'firebase/auth'
import { getFirestore, collection, getDoc, doc, setDoc } from 'firebase/firestore/lite';
import { useRouter } from 'next/router';
import Loader from '../components/loader.js'
import { useEffect, useState } from 'react';
import { FiLogOut, FiUser } from 'react-icons/fi'
  
export default function Dashnav(props) { 

    const [loadBool, setLoadBool] = useState(false)
    const [profilePicIsLoading, setProfilePicIsLoading] = useState(true)

    let router = useRouter();
    function signOut() {
        setLoadBool(true)
        setTimeout(() => {
            props.auth.signOut()
            router.push('/login')
          }, 200)
    }

    useEffect(() => {
        setTimeout(() => {
            setProfilePicIsLoading(false)
        }, 2500)
    }, [])

    const [popupToggle, setPopupToggle] = useState(false)
    const openPopup = () => {
        setPopupToggle(!popupToggle)
    }
    const [mobileToggle, setMobileToggle] = useState("");
    function mobileSwitch() {
      if (mobileToggle === "") {
        setMobileToggle("clicked")
      } else {
        setMobileToggle("")
      }
    }
 
    return (
        <nav id="dashnav">
            <a href='/' className='noSelect' id="logo">
                <img src={logo.src}/>
                <p>Inkmorphism</p>
            </a>
            <div id='rightPane'>
                <a className="noSelect" href='../dashboard'>My dashboard</a>
                <div id='profileMenu'>
                    <a href="../account">My account < FiUser /></a>
                    <p id="signOut" onClick={openPopup} className="noSelect">Log out < FiLogOut /></p>
                    <div id='profilePic'>
                        <img src={props.profile_pic} className={"noSelect"} style={{filter: profilePicIsLoading ? "invert(1)" : "none"}}/>
                    </div>
                </div>
            </div>

            <div id='mobileMenu' onClick={mobileSwitch} className={"noSelect " + mobileToggle}>
                <div id='bar1'></div>
                <div id='bar2'></div>
                <div id='bar3'></div>
            </div>
            <div id='overlayMenu' className={mobileToggle}>
                <a className="noSelect" href='../dashboard'>My dashboard</a>
                <a href="../account">My account < FiUser /></a>
                <p id="signOut" onClick={openPopup} className="noSelect">Log out < FiLogOut /></p>
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
        </nav>
    );   
}