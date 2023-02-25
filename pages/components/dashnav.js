import logo from '../../styles/images/logoWh.png';
import app from "../../firebase/clientApp";
import { getAuth } from 'firebase/auth'
import { useRouter } from 'next/router';
import Loader from '../components/loader.js'
import { useState } from 'react';
  
export default function Dashnav() { 
    const [loadBool, setLoadBool] = useState(false);
    const auth = getAuth(app);
    console.log(auth)
    let profile_pic;
    try {  
        profile_pic = auth.currentUser.photoURL;
    } catch(err) {         
        profile_pic = "";
    }  
    let router = useRouter();
    function signOut() {
        setLoadBool(true)
        setTimeout(() => {
            auth.signOut()
            router.push('/login')
          }, 200)
    }

    return (
        <nav id="dashnav">
            <a href='/' className='noSelect'>
                <img src={logo.src}/>
                <p>Inkmorphism</p>
            </a>
            <div id='rightPane'>
                <a href='../dashboard'>Dashboard</a>
                <p id="signOut" onClick={signOut}>Log out</p>
                <img src={profile_pic} alt="Profile Pic" id='profilePic'/>
            </div>
            {loadBool ? <Loader/> : ""}  
        </nav>
    );   
}