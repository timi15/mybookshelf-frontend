import React, {useContext, useState} from 'react'
import {Box, Button, Modal, Rating, TextField, Typography} from "@mui/material";
import axios from "axios";
import {AuthContext} from "../context/auth/Auth";
import "../assert/modal.css"
import "../assert/common.css"
import {ReviewContext} from "../context/review/Review";
import placeholder from "../assert/img/placeholder.jpg"

export const ReviewModal = ({book = {}, open, close}) => {


    const [formData, setFormData] = useState({})
    const [rate, setRate] = React.useState(2);
    const {idToken} = useContext(AuthContext);
    const {handleAddReview} = useContext(ReviewContext);


    const handleSubmit = (e) => {
        e.preventDefault();

        const submit = {...book, rate, ...formData}
        axios
            .post('http://localhost:8080/v1/mybookshelf/book-review/save', submit, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${idToken}`
                }
            })
            .then(res => {
                if (res.status === 201) {
                    console.log(res.data)
                    handleAddReview(res.data)
                }
            })

        console.log(submit);

    };


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

                        order: -1,

                        "@media (min-width:1000px)": {
                            width: "40%",
                            order: 0
                        }
                    }}
                >

                    <img
                        src={formData.image || book.image || placeholder}
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
                        value={rate}
                        onChange={(event, newValue) => setRate(newValue)}
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
                    {Object.keys(book).length === 0 && (

                        <Box sx={{display: "flex", gap: 2}}>
                            <TextField
                                size="small"
                                label="ISBN13"
                                fullWidth
                                id="isbn13"
                                name="isbn13"
                                value={formData.isbn13}
                                type="text"
                                required
                                onChange={({target}) =>
                                    setFormData({...formData, [target.name]: target.value})
                                }
                            />

                            <TextField
                                size="small"
                                label="Image URL"
                                fullWidth
                                id="image"
                                name="image"
                                value={formData.image}
                                type="text"
                                required
                                onChange={({target}) =>
                                    setFormData({...formData, [target.name]: target.value})
                                }
                            />
                        </Box>
                    )}

                    {Object.keys(book).length !== 0 && (
                        <>
                            <Typography variant="h5" fontWeight="bold">
                                {book.title}
                            </Typography>

                            <Typography
                                variant="6"
                                sx={{mb: 5}}
                            >
                                {book.author}
                            </Typography>
                        </>
                    )}

                    {Object.keys(book).length === 0 && (
                        <Box sx={{display: "flex", gap: 2}}>

                            <TextField
                                label="Title"
                                size="small"
                                fullWidth
                                id="title"
                                name="title"
                                value={formData.title}
                                type="text"
                                required
                                onChange={({target}) =>
                                    setFormData({...formData, [target.name]: target.value})
                                }
                            />

                            <TextField
                                label="Author"
                                size="small"
                                fullWidth
                                id="author"
                                name="author"
                                value={formData.author}
                                type="text"
                                required
                                onChange={({target}) =>
                                    setFormData({...formData, [target.name]: target.value})
                                }
                            />
                        </Box>
                    )}

                    <TextField
                        size="small"
                        label="Plot"
                        multiline
                        rows={2}
                        fullWidth
                        id="plot"
                        name="plot"
                        value={book.plot || formData.plot}
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

                    <Button type="submit" variant="contained" size="large" style={{backgroundColor:"#3a4943"}}>
                        Save
                    </Button>
                </Box>

            </Box>
        </Modal>


    )
}
