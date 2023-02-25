import { BottomNavigation, Typography, Link } from "@mui/material";
import { GiQuillInk } from 'react-icons/gi'

export default function Footer(props) {
    let footerExists;
    try {
        footerExists = props['footer']['exists']
    } catch(err) {
        console.log(err)
        footerExists = false
    }
    if (footerExists) {
        return ( 
            <BottomNavigation>
                <Typography>Created with <Link href="https://inkmorphism.com">Inkmorphism <GiQuillInk/></Link></Typography>
                <Typography className="footer_txt">{props['footer']['customTxt']}</Typography>
            </BottomNavigation>
        );
    } else {
        return ("");
    }
}