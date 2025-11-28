import React, {createContext, useContext, useEffect, useState} from 'react'
import axios from "axios";
import {AuthContext} from "../auth/Auth";

export const ReviewContext = createContext();

export const Review = ({children}) => {

    const {idToken} = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (!idToken) {
            setReviews([]);
            return;
        }

        axios
            .get('http://localhost:8080/v1/mybookshelf/book-review/all', {
                headers: {
                    Authorization: `Bearer ${idToken}`
                }
            })
            .then(res => {
                setReviews(res.data);
            })

    }, [idToken]);

    const handleAddReview = (review) => {
        setReviews(prev => [...prev, review]);
    };

    const handleUpdateReview = async (isbn13, review) => {
        setReviews(prev =>
            prev.map(r => r.isbn13 === isbn13 ? { ...r, ...review } : r)
        );

        try {
            await axios.put(
                `http://localhost:8080/v1/mybookshelf/book-review/${isbn13}`,
                review,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${idToken}`
                    }
                }
            );
            return true;

        } catch (err) {
            return false;
        }
    };


    const handleRemoveReview = async (isbn13) => {
        setReviews(prev => prev.filter((value) => value.isbn13 !== isbn13));
        try {
            await axios
                .delete(`http://localhost:8080/v1/mybookshelf/book-review/${isbn13}`, {
                    headers: {
                        "Authorization": `Bearer ${idToken}`
                    }
                });

            return true;

        } catch (err) {
            console.log(err);
            return false;
        }
    };

    return (
        <ReviewContext.Provider value={{reviews, handleAddReview, handleUpdateReview, handleRemoveReview}}>
            {children}
        </ReviewContext.Provider>
    )
}
