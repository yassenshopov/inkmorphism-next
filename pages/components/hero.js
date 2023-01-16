import { Box, Container, Typography } from "@mui/material";

export default function Hero(props) {
    if (props['hero']['exists']) {
        return (
            <Box>
                <Typography>Created with <a href="https://inkmorphism.com">Inkmorphism</a></Typography>
                {/* <iframe src="https://yassenshopov.substack.com/embed" width="480" height="320" style="border:1px solid #EEE; background:white;" frameborder="0" scrolling="no"></iframe> */}
            </Box>
        );
    } else {
        return ("");
    }
}