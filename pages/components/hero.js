import { Box, Typography } from "@mui/material";

export default function Hero(props) {
    try {
        let heroExists = props['hero']['exists']
    } catch(err) {
        console.log(err)
        let heroExists = false
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