import React, {useContext, useState} from 'react'
import {Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, Rating, Typography} from "@mui/material";
import {ReviewContext} from "../context/review/Review";
import {ReviewModal} from "../component/ReviewModal";
import {ModifyReviewModal} from "../component/ModifyReviewModal";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import "../assert/css/common.css"

export const Reviews = () => {

    const {reviews, handleRemoveReview} = useContext(ReviewContext);

    const [selectedIsbn13, setSelectedIsbn13] = useState(null);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openModifyModal, setOpenModifyModal] = useState(false);

    const handleOpenCreateModal = () => setOpenCreateModal(true);
    const handleCloseCreateModal = () => setOpenCreateModal(false);

    const handleOpenModifyModal = () => setOpenModifyModal(true);
    const handleCloseModifyModal = () => setOpenModifyModal(false);


    return (<>
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
            <div className="container" style={{
                marginTop: "3rem",
                display: "flex",
                flexWrap: "wrap",
                gap: "2rem",
                justifyContent: "center"
            }}>
                {
                    reviews.map((review) => (
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
                                    image={review.book.image}
                                    alt={review.book.title}
                                    sx={{
                                        height: 250,
                                        width: 'auto',
                                        borderRadius: 2,
                                        boxShadow: 2,
                                    }}
                                />
                            </Box>

                            <CardContent sx={{textAlign: 'center', flexGrow: 1}}>
                                <Typography variant="h5" fontWeight="bold">
                                    {review.book.title}
                                </Typography>

                                <Typography variant="subtitle2" sx={{mb: 1}}>
                                    {review.book.author}
                                </Typography>

                                <Typography variant="body2" sx={{color: 'text.secondary', mb: 3}}>
                                    {review.book.plot}
                                </Typography>

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
                                        color="primary"
                                        onClick={() => {
                                            setSelectedIsbn13(review.isbn13);
                                            handleOpenModifyModal();
                                        }}
                                        sx={{
                                            width: '100%',
                                            backgroundColor: "#e3f2fd",
                                            borderRadius: "12px",
                                            padding: "10px",
                                            "&:hover": {backgroundColor: "#bbdefb"}
                                        }}
                                    >
                                        <EditIcon/>
                                    </IconButton>
                                </Box>

                                <Box sx={{flex: 1, display: "flex", justifyContent: "flex-end"}}>
                                    <IconButton
                                        color="error"
                                        onClick={() => handleRemoveReview(review.isbn13)}
                                        sx={{
                                            width: '100%',
                                            backgroundColor: "#ffebee",
                                            borderRadius: "12px",
                                            padding: "10px",
                                            "&:hover": {backgroundColor: "#ffcdd2"}
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
