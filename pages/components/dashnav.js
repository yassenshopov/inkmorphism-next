import logo from '../../styles/images/logoWh.png';
import defaultProfilePic from '../../styles/images/defaultProfilePic.png';
import app from "../../firebase/clientApp";
import { getAuth } from 'firebase/auth'
import { useRouter } from 'next/router';
import Loader from '../components/loader.js'
import { useEffect, useState } from 'react';
import { FiLogOut, FiUser } from 'react-icons/fi'
  
export default function Dashnav() { 

    const [loadBool, setLoadBool] = useState(false);
    const auth = getAuth(app);
    console.log(auth)
    let profile_pic;
    try {  
        profile_pic = auth.currentUser.photoURL;
    } catch(err) {         
        profile_pic = defaultProfilePic.src;
    }  
    let router = useRouter();
    function signOut() {
        setLoadBool(true)
        setTimeout(() => {
            auth.signOut()
            router.push('/login')
          }, 200)
    }

    const [profileMenuOpacity, setProfileMenuOpacity] = useState(0)
    const [profileMenuMargin, setProfileMenuMargin] = useState("-7.5vw")
    const profileMenuToggle = (e) => {
        if (profileMenuOpacity === 0 && profileMenuMargin === "-7.5vw") {
            setProfileMenuOpacity(1)
            setProfileMenuMargin("0px")
        } else {
            setProfileMenuOpacity(0)    
            setProfileMenuMargin("-7.5vw")
        } 
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
                    <p style={{opacity: profileMenuOpacity, marginRight: profileMenuMargin}}>My account < FiUser/></p>
                    {/* <p>|</p> */}
                    <p style={{opacity: profileMenuOpacity, marginRight: profileMenuMargin}} id="signOut" onClick={signOut}>Log out < FiLogOut /></p>
                    <img src={profile_pic} id='profilePic' onClick={profileMenuToggle} className={"noSelect"}/>
                </div>
            </div>
            {loadBool ? <Loader/> : ""}  
        </nav>
    );   
}