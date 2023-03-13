import { useRouter } from "next/router";
import { FiLogIn } from 'react-icons/fi'
import { useState } from 'react'
import { getAuth } from "firebase/auth";
import app from "../../firebase/clientApp";

export default function MainNav() {
    
    const [mobileToggle, setMobileToggle] = useState("");
    function mobileSwitch() {
      if (mobileToggle === "") {
        setMobileToggle("clicked")
      } else {
        setMobileToggle("")
      }
    }
  
    let router = useRouter();
    function redirect() {
      setTimeout(() => {
        router.push('/dashboard')
      }, 500)
    }
  
    function checkLogin() {
        const auth = getAuth(app);
        if (auth.currentUser !== null) {
            router.push('/dashboard')
        } else {
            router.push('/login')
        }
    }

    return (
        <nav id="MainNav">
            <a href='/' id='logo' className='noSelect'>
                <img src="/logoWh.png"/>
                <p>Inkmorphism</p>
            </a>
            <div>
            <a className='noSelect' href='/templates'>Templates</a>
            <a className='noSelect' href='/about'>About us</a>
            <a className='noSelect' href='/blog'>Blog</a>
            <a className='noSelect signIn' onClick={checkLogin}>Sign in <FiLogIn/></a>
            {/* <img src={profile_pic} alt="Profile Pic"/> */}
            </div>
            <div id='mobileMenu' onClick={mobileSwitch} className={"noSelect " + mobileToggle}>
            <div id='bar1'></div>
            <div id='bar2'></div>
            <div id='bar3'></div>
            </div>
            <div id='overlayMenu' className={mobileToggle}>
            <a className='noSelect' href='/templates'>Templates</a>
            <a className='noSelect' href='/about'>About us</a>
            <a className='noSelect' href='/blog'>Blog</a>
            <a className='noSelect signIn' onClick={checkLogin}>Sign in <FiLogIn/></a>
            </div>
        </nav>
    )
}