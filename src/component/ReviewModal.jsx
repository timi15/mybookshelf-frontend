import React, {useContext, useState} from 'react'
import {useNavigate} from "react-router-dom";
import {Box, Button, Modal, Rating, TextField, Typography} from "@mui/material";
import axios from "axios";
import {AuthContext} from "../context/auth/Auth";
import {ReviewContext} from "../context/review/Review";
import {DateRangeFields} from "./DateRangeFields";
import {BookContext} from "../context/book/Books";
import "../assert/css/modal.css"
import "../assert/css/common.css"
import placeholder from "../assert/img/placeholder.jpg"

export const ReviewModal = ({book = {}, open, close}) => {

    const navigate = useNavigate();

    const {idToken} = useContext(AuthContext);
    const {handleAddReview} = useContext(ReviewContext);
    const {handleAddBook} = useContext(BookContext);

    const [formData, setFormData] = useState({})
    const [rate, setRate] = React.useState(5);


    const handleSubmit = (e) => {
        e.preventDefault();

        const submit = {
            isbn13: book.isbn13  || formData.isbn13,
            book: {
                isbn13: book.isbn13  || formData.isbn13,
                title: book.title  || formData.title,
                author: book.author || formData.author,
                image: book.image || formData.image,
                plot: book.plot || formData.plot
            },
            rate: rate,
            startDate: formData.startDate,
            finishDate: formData.finishDate,
            reflection: formData.reflection
        };

        console.log(submit)

        axios
            .post('http://localhost:8080/v1/mybookshelf/book-review/save', submit, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${idToken}`
                }
            })
            .then(res => {
                if (res.status === 201) {
                    handleAddReview(res.data);
                    handleAddBook(res.data.book);
                    close();
                    navigate("/reviews")

                }
            })
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
                        justifyContent:"center",
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
                        size="large"
                        style={{margin: "2rem"}}
                        onChange={(event, newValue) => setRate(newValue)}
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
                                id="isbn13"
                                name="isbn13"
                                label="ISBN13"
                                type="text"
                                required
                                fullWidth
                                size="small"
                                value={formData.isbn13}
                                onChange={({target}) =>
                                    setFormData({...formData, [target.name]: target.value})
                                }
                            />

                            <TextField
                                id="image"
                                name="image"
                                label="Image URL"
                                type="text"
                                required
                                fullWidth
                                size="small"
                                value={formData.image}
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

                            <Typography variant="6" sx={{mb: 5}}>
                                {book.author}
                            </Typography>
                        </>
                    )}

                    {Object.keys(book).length === 0 && (
                        <Box sx={{display: "flex", gap: 2}}>

                            <TextField
                                id="title"
                                name="title"
                                label="Title"
                                type="text"
                                required
                                fullWidth
                                size="small"
                                value={formData.title}
                                onChange={({target}) =>
                                    setFormData({...formData, [target.name]: target.value})
                                }
                            />

                            <TextField
                                id="author"
                                name="author"
                                label="Author"
                                type="text"
                                required
                                fullWidth
                                size="small"
                                value={formData.author}
                                onChange={({target}) =>
                                    setFormData({...formData, [target.name]: target.value})
                                }
                            />
                        </Box>
                    )}

                    <TextField
                        id="plot"
                        name="plot"
                        label="Plot"
                        type="text"
                        required
                        rows={2}
                        multiline
                        fullWidth
                        size="small"
                        value={book.plot || formData.plot}
                        onChange={({target}) =>
                            setFormData({...formData, [target.name]: target.value})
                        }
                    />

                    <DateRangeFields formData={formData} setFormData={setFormData}/>

                    <TextField
                        id="reflection"
                        name="reflection"
                        label="Reflection"
                        type="text"
                        required
                        multiline
                        rows={2}
                        fullWidth
                        size="small"
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
