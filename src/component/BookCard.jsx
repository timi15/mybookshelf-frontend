import React, {useState} from "react";
import {
    Card,
    CardMedia,
    Box,
    IconButton, Skeleton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from '@mui/icons-material/Create';
import {ReviewModal} from "./ReviewModal";

export const BookCard = ({book}) => {

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
                        sx={{ borderRadius: 2 }}
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

                    <IconButton size="large" sx={{ color: "white", backgroundColor: "rgba(255,255,255,0.1)" }}>
                        <FavoriteIcon />
                    </IconButton>

                    <IconButton size="large" sx={{ color: "white", backgroundColor: "rgba(255,255,255,0.1)" }}>
                        <AddIcon />
                    </IconButton>

                    <IconButton size="large" sx={{ color: "white", backgroundColor: "rgba(255,255,255,0.1)" }} onClick={handleOpen}>
                        <CreateIcon />
                    </IconButton>

                </Box>
            </Card>

            <ReviewModal book={book} open={open} close={handleClose} />

        </>
    );
};
