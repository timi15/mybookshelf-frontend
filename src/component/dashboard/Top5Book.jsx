import React from 'react'
import {Box, Skeleton} from "@mui/material";

export const Top5Book = ({dashboard}) => {

    const topBooks = dashboard?.top5BookCoverUrls ?? [];


    if (!topBooks || topBooks.length === 0) {
        return (
            <Box sx={{display: "flex", gap: 2, justifyContent: "center", }}>
                {[...Array(5)].map((_, i) => (
                    <Skeleton
                        key={i}
                        variant="rectangular"
                        width={140}
                        height={210}
                    />
                ))}
            </Box>
        );
    }

    return (
            <div style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap"
            }}>
                <Box sx={{display: "flex", gap: 4, justifyContent: "center"}}>
                    {topBooks.map((src, i) => (
                        <img
                            key={i}
                            src={src}
                            alt={i}
                            style={{
                                width: "13%",
                                objectFit: "cover",
                                borderRadius: 8
                            }}
                        />
                    ))}
                </Box>
            </div>
    )
}
