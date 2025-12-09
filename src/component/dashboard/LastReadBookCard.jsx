import React from 'react'
import {Box} from "@mui/material";

export const LastReadBookCard = ({image}) => {
    return (

        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <h3>Last Read Book</h3>

            <img
                src={image}
                alt="Last read"
                style={{
                    width: 190,
                    height: 290,
                    objectFit: "cover",
                    borderRadius: 6
                }}
            />
        </Box>


    )
}
