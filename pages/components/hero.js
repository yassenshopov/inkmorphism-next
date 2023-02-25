import { Box, Typography } from "@mui/material";

export default function Hero(props) {
    let heroExists;
    try {
        heroExists = props['hero']['exists']
    } catch(err) {
        console.log(err)
        heroExists = false
    }
    if (heroExists) {
        return (
            <Box>
                <Typography>This is the hero section</Typography>
            </Box>
        );
    } else {
        return ("");
    }
}