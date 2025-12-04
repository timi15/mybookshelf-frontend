import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../auth/Auth";
import {BASE_URL} from "../../config/api";
import {IssueAlertContext} from "../IssueAlert";

export const LovedBooksContext = createContext();

export const Loved = ({children}) => {

    const {idToken} = useContext(AuthContext);
    const {showAlert} = useContext(IssueAlertContext);

    const [lovedBooks, setLovedBooks] = useState([]);

    useEffect(() => {
        if (!idToken) {
            setLovedBooks([]);
            return;
        }

        axios.get(`${BASE_URL}/v1/mybookshelf/loved`, {
            headers: {
                "Authorization": `Bearer ${idToken}`,
            }
        })
            .then(res => {
                const books = res.data.map(item => item.book);
                setLovedBooks(books);
                console.log(books);
            })
    }, [idToken])

    const handleAddLovedBook = async (book) => {
            try {
                await axios.post(
                    `${BASE_URL}/v1/mybookshelf/loved/add`,
                    book,
                    {
                        headers: {
                            "Authorization": `Bearer ${idToken}`,
                            "Content-Type": "application/json"
                        }
                    }
                ).then(res => {
                    showAlert("Book added successfully!", 'success');
                    setLovedBooks(prev => [...prev, res.data.book]);
                });
                return true;

            } catch (err) {
                if (err.response?.status === 409) {
                    showAlert(err.response.data.message, "error");
                }

                return false;
            }
        }
    ;

    const handleRemoveLovedBook = async (isbn13) => {

        setLovedBooks(lovedBooks.filter((value) => value.isbn13 !== isbn13));

        try {
            await axios.delete(
                `${BASE_URL}/v1/mybookshelf/loved/${isbn13}`,
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
        <LovedBooksContext.Provider value={{lovedBooks, handleAddLovedBook, handleRemoveLovedBook}}>
            {children}
        </LovedBooksContext.Provider>
    );
};
