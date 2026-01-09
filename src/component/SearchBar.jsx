import React, {useState} from "react";
import {Box, Button, FormControl, InputLabel, MenuItem, TextField, Select} from "@mui/material";

export const SearchBar = ({data, onSearch, isReview}) => {

    const [mode, setMode] = useState("title");
    const [query, setQuery] = useState("");

    const handleSearch = () => {

        const q = query.toLowerCase().trim();

        if (!q.trim()) {
            onSearch(null);
            return;
        }

        const filtered = (isReview === true)
            ? data.filter((review) => {
                if (mode === "title") {
                    return review.book.title.toLowerCase().includes(q);
                }
                if (mode === "author") {
                    return review.book.author.toLowerCase().includes(q);
                }
                return false;
            })
            : data.filter((book) => {
                if (mode === "title") {
                    return book.title.toLowerCase().includes(q);
                }
                if (mode === "author") {
                    return book.author.toLowerCase().includes(q);
                }
                return false;
            });

        onSearch(filtered);
    };

    const handleClear = () => {
        setQuery("");
        onSearch(null);
    };

    return (

        <Box sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            marginTop: '3rem',
            marginLeft: 'auto',
            marginRight: 'auto',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:"rgba(241,236,219,0.61)",
            width:'80%',
            paddingTop:"0.8rem",
            borderRadius: 6,
        }}>

            <FormControl margin="normal" sx={{width: '10rem'}}>
                <InputLabel id="mode-label">Search by</InputLabel>
                <Select
                    labelId="mode-label"
                    value={mode}
                    size="small"
                    label="Search by"
                    variant="outlined"
                    onChange={(e) => setMode(e.target.value)}
                >
                    <MenuItem value="title">title</MenuItem>
                    <MenuItem value="author">author</MenuItem>
                </Select>
            </FormControl>

            <TextField
                margin="normal"
                size="small"
                label={mode === "title" ? "The title of the book..." : "The author of the book..."}
                variant="outlined"
                value={query}
                sx={{width: '25rem'}}
                onChange={(e) => setQuery(e.target.value)}
            />

            <Button
                variant="contained"
                onClick={handleSearch}
                sx={{mb: 3, width: "12rem", height: "2.3rem", backgroundColor: "#3a4943", color: "white"}}
            >
                Search
            </Button>

            <Button
                variant="outlined"
                onClick={handleClear}
                sx={{
                    mb: 3,
                    width: "12rem",
                    height: "2.3rem",
                    color: "#3a4943",
                    borderColor: "#3a4943",
                    borderWidth: 2,
                    "&:hover": {backgroundColor: "rgba(108,131,125,0.65)"}
                }}
            >
                Clear
            </Button>

        </Box>
    );
}