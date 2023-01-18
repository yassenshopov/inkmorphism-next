import { AppBar, Button, Toolbar, Typography } from "@mui/material";

export default function Nav(props) {
    if (props['nav']['exists']) {
        return (
            <AppBar position="static">
                <Toolbar>
                    <img src={props['nav']['logo']} style={{width: '4vw'}}/>
                    <Typography sx={{fontFamily: 'Oswald'}} variant="p">{props['nav']['title']}</Typography>
                    <Button variant="contained">{props['nav']['button']}</Button>
                </Toolbar>
            </AppBar>
        );
    } else {
        return ("");
    }
}