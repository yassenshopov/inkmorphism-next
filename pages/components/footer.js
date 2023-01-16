import { BottomNavigation, Typography, Link } from "@mui/material";

export default function Footer(props) {
    if (props['footer']['exists']) {
        return (
            <BottomNavigation>
                <Typography>Created with <Link href="https://inkmorphism.com">Inkmorphism</Link></Typography>
                <Typography className="footer_txt">{props['footer']['customTxt']}</Typography>
            </BottomNavigation>
        );
    } else {
        return ("");
    }
}