import React, {useContext, useEffect, useState} from 'react'
import {Box, Button, Modal, Rating, TextField, Typography, Chip} from "@mui/material";
import axios from "axios";
import {AuthContext} from "../context/auth/Auth";
import {ReviewContext} from "../context/review/Review";
import {BASE_URL} from "../config/api";
import {DateRangeFields} from "./DateRangeFields";
import placeholder from "../assert/img/placeholder.jpg"

export const ModifyReviewModal = ({isbn13, open, close}) => {

    const {idToken} = useContext(AuthContext);
    const {handleUpdateReview} = useContext(ReviewContext);

    const [currentReview, setCurrentReview] = useState({});
    const [formData, setFormData] = useState({
        plot: "",
        rate: 0,
        startDate: "",
        finishDate: "",
        genres: [],
        reflection: "",
    });

    useEffect(() => {
        if (!isbn13) return;
        axios
            .get(`${BASE_URL}/v1/mybookshelf/book-review/${isbn13}`, {
                headers: {
                    "Authorization": `Bearer ${idToken}`
                }
            })
            .then(res => {
                const data = res.data;
                setCurrentReview(data);
                setFormData({
                    plot: data.book.plot || "",
                    rate: Number(data.rate) || 0,
                    startDate: data.startDate || "",
                    finishDate: data.finishDate || "",
                    genres: data.genres || [],
                    reflection: data.reflection || "",
                });
            });
    }, [isbn13, idToken]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await handleUpdateReview(isbn13, formData);
        if (success) {
            close();
        }
    }

    return (
        <Modal
            open={open}
            onClose={close}
        >
            <Box
                className="modal-style"
                component="form"
                onSubmit={handleSubmit}
                autoComplete="off"
                sx={{
                    display: "flex",
                    gap: 3,
                    flexDirection: "column",
                    "@media (min-width:1000px)": {
                        flexDirection: "row"
                    },
                    scrollbarWidth: "none",
                    "&::-webkit-scrollbar": {display: "none"}
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        order: -1,
                        "@media (min-width:1000px)": {
                            width: "40%",
                            order: 0
                        }
                    }}
                >
                    <img
                        src={currentReview.book?.coverUrl || placeholder}
                        alt="Preview"
                        style={{
                            width: "50%",
                            objectFit: "cover",
                            borderRadius: "8px"
                        }}
                    />

                    <Rating
                        name="rating"
                        size="large"
                        value={formData.rate}
                        style={{margin: "2rem"}}
                        onChange={(event, newValue) => {
                            setFormData({...formData, rate: newValue});
                        }}
                    />
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    <Typography variant="h5" fontWeight="bold">
                        {currentReview.book?.isbn13}
                    </Typography>

                    <Typography variant="h5" fontWeight="bold">
                        {currentReview.book?.title}
                    </Typography>

                    <Typography variant="6" sx={{mb: 5}}>
                        {currentReview.book?.author}
                    </Typography>

                    <TextField
                        id="plot"
                        name="plot"
                        label="Plot"
                        type="text"
                        required
                        multiline
                        rows={2}
                        fullWidth
                        size="small"
                        value={formData.plot}
                        onChange={({target}) =>
                            setFormData({...formData, [target.name]: target.value})
                        }
                    />

                    <Box sx={{mb: 4, textAlign: "center"}}>
                        {
                            formData.genres?.map((genre, index) => (
                                <Chip key={index} sx={{marginLeft: "2rem"}} label={genre}/>
                            ))
                        }
                    </Box>

                    <DateRangeFields formData={formData} setFormData={setFormData}/>

                    <TextField
                        id="reflection"
                        name="reflection"
                        label="Reflection"
                        type="text"
                        required
                        size="small"
                        fullWidth
                        multiline
                        rows={2}
                        value={formData.reflection}
                        onChange={({target}) =>
                            setFormData({...formData, [target.name]: target.value})
                        }
                    />

                    <Button type="submit" variant="contained" size="large" style={{backgroundColor: "#3a4943"}}>
                        Save
                    </Button>
                </Box>

            </Box>
        </Modal>
    )
}
