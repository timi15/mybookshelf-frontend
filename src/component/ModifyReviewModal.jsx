import React, {useContext, useEffect, useState} from 'react'
import {Box, Button, Modal, Rating, TextField, Typography} from "@mui/material";
import axios from "axios";
import {AuthContext} from "../context/auth/Auth";
import {ReviewContext} from "../context/review/Review";
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
        reflection: "",
    });


    useEffect(() => {
        if (!isbn13) return;
        axios
            .get(`http://localhost:8080/v1/mybookshelf/book-review/${isbn13}`, {
                headers: {
                    "Authorization": `Bearer ${idToken}`
                }
            })
            .then(res => {
                const data = res.data;

                setCurrentReview(data);
                setFormData({
                    plot: data.plot || "",
                    rate: Number(data.rate) || 0,
                    startDate: data.startDate || "",
                    finishDate: data.finishDate || "",
                    reflection: data.reflection || "",
                });
            });
    }, [isbn13, idToken]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await handleUpdateReview(isbn13, formData);
        if(success){
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
                        justifyContent:"center",

                        order: -1,

                        "@media (min-width:1000px)": {
                            width: "40%",
                            order: 0
                        }
                    }}
                >

                    <img
                        src={currentReview.image}
                        alt="Preview"
                        style={{
                            width: "50%",
                            objectFit: "cover",
                            borderRadius: "8px"
                        }}
                        onError={(e) => {
                            e.currentTarget.src = placeholder;
                        }}
                    />

                    <Rating
                        name="rating"
                        value={formData.rate}
                        onChange={(event, newValue) => {
                            setFormData({...formData, rate: newValue});
                        }}
                        size="large"
                        style={{margin: "2rem"}}
                    />
                </Box>


                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column"
                    }}
                >


                    <Box sx={{display: "flex", gap: 2}}>

                        <Typography variant="h5" fontWeight="bold">
                                {currentReview.isbn13}
                        </Typography>


                    </Box>


                    <Typography variant="h5" fontWeight="bold">
                        {currentReview.title}
                    </Typography>

                    <Typography
                        variant="6"
                        sx={{mb: 5}}
                    >
                        {currentReview.author}
                    </Typography>


                    <TextField
                        size="small"
                        label="Plot"
                        multiline
                        rows={2}
                        fullWidth
                        id="plot"
                        name="plot"
                        value={formData.plot}
                        required
                        onChange={({target}) =>
                            setFormData({...formData, [target.name]: target.value})
                        }
                    />

                    <Box sx={{display: "flex", gap: 2}}>
                        <TextField
                            size="small"
                            fullWidth
                            id="startDate"
                            name="startDate"
                            value={formData.startDate}
                            type="date"
                            required
                            slotProps={{
                                input: {
                                    inputProps: {
                                        max: new Date().toISOString().split("T")[0]
                                    }
                                }
                            }}
                            onChange={({target}) =>
                                setFormData({...formData, [target.name]: target.value})
                            }
                        />

                        <TextField
                            fullWidth
                            size="small"
                            id="finishDate"
                            name="finishDate"
                            value={formData.finishDate}
                            type="date"
                            required
                            slotProps={{
                                input: {
                                    inputProps: {
                                        min: formData.startDate || "",
                                        max: new Date().toISOString().split("T")[0]
                                    }
                                }
                            }}
                            onChange={({target}) =>
                                setFormData({...formData, [target.name]: target.value})
                            }
                        />
                    </Box>

                    <TextField
                        size="small"
                        multiline
                        rows={2}
                        fullWidth
                        id="reflection"
                        label="Reflection"
                        name="reflection"
                        value={formData.reflection}
                        required
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
