import React from 'react'
import {Box, Skeleton} from "@mui/material";

export const LastReadBook = ({image}) => {

    if (image === null){
        return (
            <Box sx={{display: "flex", gap: 2, justifyContent: "center", }}>
                <Skeleton variant="rectangular" width={120} height={180}/>,
            </Box>
        );
    }

    return (
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <img
                src={image}
                alt="Last read"
                style={{
                    width: 170,
                    objectFit: "cover",
                    borderRadius: 6
                }}
            />
        </Box>
    )
}
