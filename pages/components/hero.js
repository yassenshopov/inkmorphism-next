import { Box, Typography } from "@mui/material";

export default function Hero(props) {
    if (props['hero']['exists']) {
        return (
            <Box>
                <Typography>This is the hero section</Typography>
            </Box>
        );
    } else {
        return ("");
    }
}