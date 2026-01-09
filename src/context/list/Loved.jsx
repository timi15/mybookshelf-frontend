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
                    showAlert("Book successfully added to your favorites.", 'success');
                    setLovedBooks(prev => [...prev, res.data.book]);
                });
                return true;

            } catch (err) {
                if (err.response?.status === 409) {
                    showAlert("This book is already in your loved list.", "error");
                }

                showAlert("Failed to add the book to your loved list.", "error");
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
            showAlert("Book removed from your loved list.", 'success');
            return true;

        } catch (err) {
            console.log(err);
            showAlert('Failed to remove the book from your loved list..', 'error');
            return false;
        }
    };


    return (
        <LovedBooksContext.Provider value={{lovedBooks, handleAddLovedBook, handleRemoveLovedBook}}>
            {children}
        </LovedBooksContext.Provider>
    );
};
