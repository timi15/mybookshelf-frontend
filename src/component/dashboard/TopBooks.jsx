import React from 'react'
import {Box, Skeleton} from "@mui/material";

export const TopBooks = ({dashboard}) => {

    const topBooks = dashboard?.top5BookImage ?? {};


    if (!topBooks || topBooks.length === 0) {
        return (
            <Box sx={{display: "flex", gap: 2}}>
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
        <>
            <h3>Top 5 Books</h3>

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
                                width: "15%",
                                objectFit: "cover",
                                borderRadius: 8
                            }}
                        />
                    ))}
                </Box>
            </div>
        </>
    )
}
