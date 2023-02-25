import { Box, Typography } from "@mui/material";

export default function Blog(props) {
    console.log(props)
    try {
        let blogExists = props['blog']['exists'];
    } catch(err) {
        let blogExists = false;
        console.log(err)
    }
    try {
        if (blogExists) {
            return (
                <Box>
                    <Typography>This is the blog section</Typography>
                </Box>
            );
        } else {
            return ("");
        }
    } catch(err) {
        console.log(err)
    }
}