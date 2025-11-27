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
                    transition: "transform 0.25s ease",
                    transform: hover ? "scale(1)" : "scale(1)",
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
                        loading="lazy"
                        decoding="async"
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
                        top: 0,
                        left: 0,
                        width: "100%",
                        background: "rgba(0,0,0,0.65)",
                        padding: "0.3rem 0.5rem",
                        display: "flex",
                        gap: 1,
                        opacity: hover ? 1 : 0,
                        transform: hover ? "translateY(0)" : "translateY(-20px)",
                        transition: "opacity 0.25s ease, transform 0.25s ease",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <IconButton size="small" sx={{color: "white"}}>
                        <FavoriteIcon/>
                    </IconButton>

                    <IconButton size="small" sx={{color: "white"}}>
                        <AddIcon/>
                    </IconButton>

                    <IconButton size="small" sx={{color: "white"}}>
                        <CreateIcon onClick={handleOpen}/>
                    </IconButton>

                </Box>

            </Card>

            <ReviewModal book={book} open={open} close={handleClose}/>

        </>
    );
};
