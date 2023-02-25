import logo from '../../styles/images/logoWh.png';
import app from "../../firebase/clientApp";
import { getAuth } from 'firebase/auth'
 
export default function Dashfooter() {
    const auth = getAuth(app);
    let profile_pic;
    try {
        profile_pic = auth.currentUser.photoURL;
    } catch(err) {
        profile_pic = "";
    } 
    return (
        <footer id="dashfooter">
            <div>
                <img src={logo.src}/>
                <a>Inkmorphism</a>
            </div>
            {/* <div>
                <a href=''>Websites</a>
                <a href=''>Domains</a> 
            </div> */}
            {/* <img src={profile_pic} alt="Profile Pic"/> */}
        </footer>
    );
}