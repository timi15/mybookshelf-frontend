import React from 'react';
import {Box, Paper} from "@mui/material";
import "../../assert/css/dashboard.css"

export const DashboardLayout = ({
                                    readBookNumber,
                                    lovedBookNumber,
                                    lastReadBook,
                                    topBooks,
                                    readingChart,
                                    genreDonut,
                                    top3GenresTable
                                }) => {

    const year = new Date().getFullYear();

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

            <Paper sx={{
                gridColumn: {xs: "1 / -1", md: "1 / span 3"},
                p: 2,
                backgroundColor: "#f1ecdb",
                borderRadius: 6
            }}>
                <h3>Annual reading statistics ({year})</h3>
                {readingChart}
            </Paper>

            <Paper sx={{
                p: 2,
                gridColumn: {xs: "1 / -1", md: "span 1"},
                backgroundColor: "#f1ecdb",
                borderRadius: 6
            }}>
                <h3>Genre statistics</h3>
                {genreDonut}
            </Paper>

            <Paper sx={{
                p: 2,
                gridColumn: {xs: "1 / -1", md: "1 / span 3"},
                backgroundColor: "#f1ecdb",
                borderRadius: 6,
            }}>
                <h3>TOP 5 Book</h3>
                {topBooks}
            </Paper>

            <Paper sx={{
                p: 2,
                gridColumn: {xs: "1 / -1", md: "span 1"},
                backgroundColor: "#f1ecdb",
                borderRadius: 6
            }}>
                <h3>Last Read Book</h3>
                {lastReadBook}
            </Paper>

            <Paper sx={{p: 2, textAlign: "center", backgroundColor: "#f1ecdb", borderRadius: 6}}>
                <h3>Number of books read</h3>
                <p style={{fontSize: "2.5rem"}}>{readBookNumber}</p>
            </Paper>

            <Paper sx={{p: 2, textAlign: "center", backgroundColor: "#f1ecdb", borderRadius: 6}}>
                <h3>Number of favorite books</h3>
                <p style={{fontSize: "2.5rem"}}>{lovedBookNumber}</p>
            </Paper>

            <Paper sx={{
                p: 2,
                gridColumn: "span 2",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                backgroundColor: "#f1ecdb",
                borderRadius: 6
            }}>
                <h3>TOP 3 genre</h3>
                {top3GenresTable}
            </Paper>


        </Box>
    )
}
