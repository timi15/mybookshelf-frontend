import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../auth/Auth";
import {BASE_URL} from "../../config/api";
import {IssueAlertContext} from "../IssueAlert";

export const ToReadBooksContext = createContext();

export const ToRead = ({children}) => {

    const {idToken} = useContext(AuthContext);
    const {showAlert} = useContext(IssueAlertContext);

    const [ToReadBooks, setToReadBooks] = useState([]);

    useEffect(() => {
        if (!idToken) {
            setToReadBooks([]);
            return;
        }

        axios
            .get(`${BASE_URL}/v1/mybookshelf/to-read`, {
                headers: {
                    "Authorization": `Bearer ${idToken}`,
                }
            })
            .then(res => {
                const books = res.data.map(item => item.book);
                setToReadBooks(books);
            })
    }, [idToken])

    const handleAddToReadBook = async (book) => {
        try {
            await axios
                .post(
                    `${BASE_URL}/v1/mybookshelf/to-read/add`,
                    book,
                    {
                        headers: {
                            "Authorization": `Bearer ${idToken}`,
                            "Content-Type": "application/json"
                        }
                    }
                )
                .then(res => {
                    setToReadBooks(prev => [...prev, res.data.book]);
                });

            showAlert("Book added successfully!", 'success');
            return true;

        } catch (err) {
            if (err.response?.status === 409) {
                showAlert(err.response.data.message, "error");
            }

            return false;
        }
    };

    const handleRemoveToReadBook = async (isbn13) => {

        setToReadBooks(ToReadBooks.filter((value) => value.isbn13 !== isbn13));

        try {
            await axios.delete(
                `${BASE_URL}/v1/mybookshelf/to-read/${isbn13}`,
                {
                    headers: {
                        "Authorization": `Bearer ${idToken}`
                    }
                }
            )
            showAlert("Book removed successfully!", 'success');
            return true;

        } catch (err) {
            showAlert('Book removed failed.', 'error');
            return false;
        }
    };


    return (
        <ToReadBooksContext.Provider value={{ToReadBooks, handleAddToReadBook, handleRemoveToReadBook}}>
            {children}
        </ToReadBooksContext.Provider>
    );
};
