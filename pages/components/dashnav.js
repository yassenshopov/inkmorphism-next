import logo from '../../styles/images/logo.png';
import app from "../../firebase/clientApp";
import { getAuth } from 'firebase/auth'
 
export default function Dashnav() {
    const auth = getAuth(app);
    let profile_pic;
    try {  
        profile_pic = auth.currentUser.photoURL;
    } catch(err) {         
        profile_pic = "";
    } 
    return (
        <nav id="dashnav">
            <div>
                <img src={logo.src}/>
                <a>Inkmorphism</a>
            </div>
            <div>
                {/* <a href=''>Websites</a>
                <a href=''>Domains</a> */}
            </div>
            <img src={profile_pic} alt="Profile Pic"/>
        </nav>
    );
}