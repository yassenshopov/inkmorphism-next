import { Box, Typography } from "@mui/material";

export default function Blog(props) {
    if (props['blog']['exists']) {
        return (
            <Box>
                <Typography>This is the blog section</Typography>
            </Box>
        );
    } else {
        return ("");
    }
}