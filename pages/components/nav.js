import { AppBar, Button, Toolbar, Typography, Box } from "@mui/material";

export default function Nav(props) {
    let navExists;
    try {
        navExists = props['nav']['exists']
    } catch(err) {
        console.log(err)
        navExists = false 
    }
    if (navExists) {
        return (
            <AppBar position="static">
                <Toolbar>
                    <a href="" className="cleanLink"><img src={props['nav']['logo']} style={{width: '4vw'}}/></a>
                    <a href="" className="cleanLink"><Typography sx={{fontFamily: 'Oswald'}} variant="p">{props['nav']['title']}</Typography></a>
                    <Button variant="contained">{props['nav']['button']}</Button>
                    <Box className="editSection"></Box>
                </Toolbar>
            </AppBar>
        );
    } else {
        return ("");
    }
}