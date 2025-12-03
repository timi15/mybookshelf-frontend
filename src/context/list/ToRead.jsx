import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../auth/Auth";

export const ToReadBooksContext = createContext();

export const ToRead = ({children}) => {

    const {idToken} = useContext(AuthContext);
    const [ToReadBooks, setToReadBooks] = useState([]);

    useEffect(() => {
        if (!idToken) {
            setToReadBooks([]);
            return;
        }

        axios.get(`http://localhost:8080/v1/mybookshelf/to-read`, {
            headers: {
                "Authorization": `Bearer ${idToken}`,
            }
        })
            .then(res => {
                const books = res.data.map(item => item.book);
                setToReadBooks(books);
                console.log(books);
            })
    }, [idToken])

    const handleAddToReadBook = async (book) => {
        try {
            await axios.post(
                `http://localhost:8080/v1/mybookshelf/to-read/add`,
                book,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${idToken}`
                    }
                }
            ).then(res => {
                console.log(res.data);
                setToReadBooks(prev => [...prev, res.data.book]);
            });
            return true;

        } catch (err) {
            return false;
        }
    };

    const handleRemoveToReadBook = async (isbn13) => {

        setToReadBooks(ToReadBooks.filter((value) => value.isbn13 !== isbn13));

        try {
            await axios.delete(
                `http://localhost:8080/v1/mybookshelf/to-read/${isbn13}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${idToken}`
                    }
                }
            )
            return true;

        } catch (err) {
            return false;
        }
    };


    return (
        <ToReadBooksContext.Provider value={{ ToReadBooks, handleAddToReadBook, handleRemoveToReadBook}}>
            {children}
        </ToReadBooksContext.Provider>
    );
};
