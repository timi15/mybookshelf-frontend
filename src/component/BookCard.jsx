import React, {useState} from "react";
import {
    Card,
    CardMedia,
    CardContent,
    Box,
    Typography,
    IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from '@mui/icons-material/Create';

export const BookCard = ({book}) => {
    const [hover, setHover] = useState(false);

    return (
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

            <CardMedia
                component="img"
                src={book.image}
                alt={book.title}
                sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
            />

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
                    <CreateIcon/>
                </IconButton>

            </Box>

            <Box
                sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    background: "rgba(0,0,0,0.75)",
                    color: "white",
                    opacity: hover ? 1 : 0,
                    transform: hover ? "translateY(0)" : "translateY(30px)",
                    transition: "opacity 0.25s ease, transform 0.25s ease",
                }}
            >
                <CardContent sx={{paddingBottom: "0 !important"}}>

                    <Typography variant="h6">{book.title}</Typography>

                    <Typography variant="body2" sx={{opacity: 0.9}}>
                        {book.authors?.[0]?.name ?? "Unknown author"}
                    </Typography>

                    <Typography variant="body2" sx={{opacity: 0.9}}>
                        {(book.rating.average * 10).toFixed(1) ?? 0} / 10
                    </Typography>

                </CardContent>
            </Box>
        </Card>
    );
};
