import logo from '../../styles/images/logo.png';
import app from "../../firebase/clientApp";
import {getAuth} from 'firebase/auth'

export default function Dashnav() {
    const auth = getAuth(app);
    let profile_pic = auth.currentUser.photoURL;
    console.log(profile_pic)
    return (
        <div id="dashnav">
            <img src={logo.src}/>
            <div>
                <a href=''>Websites</a>
                <a href=''>Domains</a>
            </div>
            <img src={profile_pic}/>
        </div>
    );
}