import { Box, Container, Typography } from "@mui/material";

export default function Hero(props) {
    if (props['hero']['exists']) {
        return (
            <Box>
                <Typography>Created with <a href="https://inkmorphism.com">Inkmorphism</a></Typography>
            </Box>
        );
    } else {
        return ("");
    }
}