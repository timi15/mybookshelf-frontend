import React, {createContext, useContext, useEffect, useState} from 'react'
import axios from "axios";
import {AuthContext} from "../auth/Auth";
import {BASE_URL} from "../../config/api";
import {IssueAlertContext} from "../IssueAlert";

export const ReviewContext = createContext();

export const Review = ({children}) => {

    const {idToken} = useContext(AuthContext);
    const {showAlert} = useContext(IssueAlertContext);


    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (!idToken) {
            setReviews([]);
            return;
        }

        axios
            .get(`${BASE_URL}/v1/mybookshelf/book-review/all`, {
                headers: {
                    Authorization: `Bearer ${idToken}`
                }
            })
            .then(res => {
                setReviews(res.data);
                console.log(res.data)
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
                `${BASE_URL}/v1/mybookshelf/book-review/${isbn13}`,
                review,
                {
                    headers: {
                        "Authorization": `Bearer ${idToken}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            showAlert('Review updated successfully.', 'success');
            return true;

        } catch (err) {
            showAlert('Review updated failed.', 'error');
            return false;
        }
    };


    const handleRemoveReview = async (isbn13) => {
        setReviews(prev => prev.filter((value) => value.isbn13 !== isbn13));
        try {
            await axios
                .delete(`${BASE_URL}/v1/mybookshelf/book-review/${isbn13}`, {
                    headers: {
                        "Authorization": `Bearer ${idToken}`
                    }
                });

            showAlert('Review removed successfully.', 'success');
            return true;

        } catch (err) {
            showAlert('Review removed failed.', 'error');
            return false;
        }
    };

    return (
        <ReviewContext.Provider value={{reviews, handleAddReview, handleUpdateReview, handleRemoveReview}}>
            {children}
        </ReviewContext.Provider>
    )
}
