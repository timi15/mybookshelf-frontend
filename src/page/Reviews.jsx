import React, {useContext, useState} from 'react'
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    IconButton,
    Rating,
    Typography
} from "@mui/material";
import Chip from "@mui/material/Chip";
import {ReviewContext} from "../context/review/Review";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {ReviewModal} from "../component/ReviewModal";
import {ModifyReviewModal} from "../component/ModifyReviewModal";
import {SearchBar} from "../component/SearchBar";
import "../assert/css/common.css"

export const Reviews = () => {

    const {reviews, handleRemoveReview} = useContext(ReviewContext);

    const [searchResult, setSearchResult] = useState(null);

    const displayed = searchResult || reviews;

    const [selectedIsbn13, setSelectedIsbn13] = useState(null);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openModifyModal, setOpenModifyModal] = useState(false);

    const handleOpenCreateModal = () => setOpenCreateModal(true);
    const handleCloseCreateModal = () => setOpenCreateModal(false);

    const handleOpenModifyModal = () => setOpenModifyModal(true);
    const handleCloseModifyModal = () => setOpenModifyModal(false);


    return (
        <>
            <div style={{textAlign: "center"}}>
                <Button className="btn" style={{
                    marginTop: "3rem",
                    width: "30%",
                    fontSize: "1.2rem",
                    backgroundColor: "#3a4943",
                    color: "white"
                }} onClick={handleOpenCreateModal}>
                    Create Review
                </Button>
            </div>

            <SearchBar data={reviews} onSearch={setSearchResult} isReview={true}/>

            <div className="container" style={{
                marginTop: "3rem",
                marginBottom: "3rem",
                display: "flex",
                flexWrap: "wrap",
                gap: "2rem",
                justifyContent: "center"
            }}>
                {
                    displayed.map((review) => (
                        <Card
                            sx={{
                                width: 300,
                                borderRadius: 3,
                                boxShadow: 3,
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                backgroundColor: 'rgba(241,236,219,0.77)'
                            }}
                            key={review.isbn13}
                        >
                            <Box style={{
                                display: "flex",
                                justifyContent: "space-between",
                                gap: 1,
                                marginTop: "auto",
                                marginBottom: "1.5rem",
                                paddingLeft: "1rem",
                                paddingRight: "1rem",
                                width: '100%',
                                opacity: '60%'
                            }}>
                                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                    {review.startDate}
                                </Typography>
                                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                    {review.finishDate}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    mb: 2
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={review.book.coverUrl}
                                    alt={review.book.title}
                                    sx={{
                                        height: 250,
                                        width: 'auto',
                                        borderRadius: 2,
                                        boxShadow: 2,
                                    }}
                                />
                            </Box>

                            <CardContent sx={{textAlign: 'center', flexGrow: 1, width: "100%"}}>
                                <Typography variant="h5" fontWeight="bold">
                                    {review.book.title}
                                </Typography>

                                <Typography variant="subtitle2" sx={{mb: 1, fontSize:"1rem"}}>
                                    {review.book.author}
                                </Typography>

                                <Typography variant="body2" sx={{color: 'text.secondary', mb: 3}}>
                                    {review.book.plot}
                                </Typography>

                                <Box sx={{mb: 2}}>
                                    {
                                        review?.genres?.map((genre, index) => (
                                            <Chip key={index} sx={{marginLeft: "5px"}} label={genre}/>
                                        ))
                                    }
                                </Box>

                                <Rating name="read-only" value={review.rate} sx={{mb: 3}} readOnly/>

                                <Typography variant="body2">
                                    {review.reflection}
                                </Typography>
                            </CardContent>

                            <CardActions
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: 1,
                                    marginTop: "auto",
                                    width: '100%'
                                }}
                            >

                                <Box sx={{flex: 1, display: "flex", justifyContent: "flex-start"}}>
                                    <IconButton
                                        onClick={() => {
                                            setSelectedIsbn13(review.isbn13);
                                            handleOpenModifyModal();
                                        }}
                                        sx={{
                                            width: '100%',
                                            backgroundColor: "#3a4943",
                                            color: "white",
                                            borderRadius: "12px",
                                            padding: "10px",
                                            "&:hover": {backgroundColor: "rgba(108,131,125,0.65)"}
                                        }}
                                    >
                                        <EditIcon/>
                                    </IconButton>
                                </Box>

                                <Box sx={{flex: 1, display: "flex", justifyContent: "flex-end"}}>
                                    <IconButton
                                        onClick={() => handleRemoveReview(review.isbn13)}
                                        sx={{
                                            width: '100%',
                                            color: "#3a4943",
                                            borderColor: "#3a4943",
                                            borderStyle: "solid",
                                            borderWidth: 2,
                                            borderRadius: "12px",
                                            padding: "10px",
                                            "&:hover": {backgroundColor: "rgba(108,131,125,0.65)"}
                                        }}
                                    >
                                        <DeleteIcon/>
                                    </IconButton>
                                </Box>

                            </CardActions>


                        </Card>

                    ))
                }

            </div>
            <ModifyReviewModal isbn13={selectedIsbn13} open={openModifyModal} close={handleCloseModifyModal}/>
            <ReviewModal open={openCreateModal} close={handleCloseCreateModal}/>

        </>
    )
}
