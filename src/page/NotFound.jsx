import React from 'react'
import {Link} from "react-router-dom";
import tornbook from "../assert/img/torn-page.png"
import {Box} from "@mui/material";
import "../assert/css/not-found.css"

export const NotFound = () => {
    return (
        <Box className="not-found">
            <img src={tornbook} alt="Broken book" width={250} height={250}/>
            <p className="error">Page not found</p>
            <Link to="/home" className="link-to-home" type="bu">Go back to Home</Link>
        </Box>
    );
}
