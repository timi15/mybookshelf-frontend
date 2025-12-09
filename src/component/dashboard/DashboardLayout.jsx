import React from 'react';
import {Box, Paper} from "@mui/material";

export const DashboardLayout = ({
                                    readBookNumber,
                                    lovedBookNumber,
                                    lastReadBook,
                                    topBooks,
                                    readingChart,
                                    genreDonut,
                                    top3GenresTable
                                }) => {
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "repeat(2, 1fr)",
                    md: "repeat(4, 1fr)",
                },
                gap: 3,
                p: 3,
            }}
        >


                <Paper sx={{p: 2, textAlign: "center", backgroundColor:"#f1ecdb"}}>
                    <h3>Total books</h3>
                    <p style={{fontSize: "2.5rem"}}>{readBookNumber}</p>
                </Paper>

                <Paper sx={{p: 2, textAlign: "center", backgroundColor:"#f1ecdb"}}>
                    <h3>Loved books</h3>
                    <p style={{fontSize: "2.5rem"}}>{lovedBookNumber}</p>
                </Paper>

                <Paper sx={{
                    p: 2,
                    gridColumn: "span 2",
                    display: "flex",
                    flexDirection: "row",
                    gap: 4,
                    justifyContent: "center",
                    backgroundColor:"#f1ecdb"
                }}>
                    {top3GenresTable}
                </Paper>


            <Paper sx={{
                p: 2,
                gridColumn: {xs: "1 / -1", md: "1 / span 3"},
                backgroundColor:"#f1ecdb"
            }}>
                {topBooks}
            </Paper>

            <Paper sx={{
                p: 2,
                gridColumn: {xs: "1 / -1", md: "span 1"},
                backgroundColor:"#f1ecdb"
            }}>
                {lastReadBook}
            </Paper>


            <Paper sx={{
                gridColumn: {xs: "1 / -1", md: "1 / span 3"},
                p: 2,
                backgroundColor:"#f1ecdb"
            }}>
                {readingChart}
            </Paper>


            <Paper sx={{
                p: 2,
                gridColumn: {xs: "1 / -1", md: "span 1"},
                backgroundColor:"#f1ecdb"
            }}>
                {genreDonut}
            </Paper>

        </Box>
    )
}
