import React, {useContext, useState} from "react";
import {
    Card,
    CardMedia,
    Box,
    IconButton, Skeleton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from '@mui/icons-material/Create';
import ClearIcon from '@mui/icons-material/Clear';
import {ReviewModal} from "./ReviewModal";
import {LovedBooksContext} from "../context/list/Loved";
import {BookContext} from "../context/book/Books";
import {ToReadBooksContext} from "../context/list/ToRead";

export const BookCard = ({book, list_name}) => {

    const {handleAddLovedBook, handleRemoveLovedBook} = useContext(LovedBooksContext);
    const {handleAddToReadBook, handleRemoveToReadBook} = useContext(ToReadBooksContext);
    const {handleAddBook} = useContext(BookContext);

    const [hover, setHover] = useState(false);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Card
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                sx={{
                    position: "relative",
                    width: "14rem",
                    aspectRatio: "2 / 3",
                    overflow: "hidden",
                    borderRadius: 3,
                    cursor: "pointer",
                    transition: "0.25s ease",
                }}
            >

                {!book.image ? (
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        height="100%"
                        sx={{borderRadius: 2}}
                    />
                ) : (
                    <CardMedia
                        component="img"
                        src={book.image}
                        alt={book.title}
                        sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: 2,
                        }}
                    />
                )}

                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(0,0,0,0.83)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 2,
                        opacity: hover ? 1 : 0,
                        transition: "opacity 0.25s ease",
                    }}
                >

                    {
                        list_name === "none" ? (
                            <>
                                <IconButton size="large" sx={{color: "white", backgroundColor: "rgba(255,255,255,0.1)"}}
                                            onClick={() => {
                                                handleAddBook(book);
                                                handleAddLovedBook(book)
                                            }}>
                                    <FavoriteIcon/>
                                </IconButton>

                                <IconButton size="large"
                                            sx={{color: "white", backgroundColor: "rgba(255,255,255,0.1)"}}
                                            onClick={() => {
                                                handleAddBook(book);
                                                handleAddToReadBook(book)
                                            }}>
                                    <AddIcon/>
                                </IconButton>
                            </>
                        ) : (
                            list_name === "loved" ? (
                                <>
                                    <IconButton size="large"
                                                sx={{color: "white", backgroundColor: "rgba(255,255,255,0.1)"}}
                                                onClick={() => {
                                                    handleRemoveLovedBook(book.isbn13)
                                                }}
                                    >
                                        <ClearIcon/>
                                    </IconButton>
                                </>
                            ) : (
                                <>
                                    <IconButton size="large"
                                                sx={{color: "white", backgroundColor: "rgba(255,255,255,0.1)"}}
                                                onClick={() => {
                                                    handleRemoveToReadBook(book.isbn13)
                                                }}
                                    >
                                        <ClearIcon/>
                                    </IconButton>
                                </>
                            )
                        )
                    }

                    <IconButton size="large" sx={{color: "white", backgroundColor: "rgba(255,255,255,0.1)"}}
                                onClick={handleOpen}>
                        <CreateIcon/>
                    </IconButton>

                </Box>
            </Card>

            <ReviewModal book={book} open={open} close={handleClose}/>

        </>
    );
};
