import React, {createContext, useContext, useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {AuthContext} from "../auth/Auth";

export const BookContext = createContext();

export const Books = ({children}) => {

    const {idToken} = useContext(AuthContext);
    const [books, setBooks] = useState([]);

    const {data, isLoading, isError} = useQuery({
        queryKey: ["nyt-books"],
        queryFn: async () => {
            const res = await axios.get(
                `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${process.env.REACT_APP_BOOK_API_KEY}`
            );

            const lists = res.data.results.lists;

            return lists.map((list) => ({
                genre: list.display_name,
                books: list.books.map((b) => ({
                    isbn13: b.primary_isbn13,
                    title: b.title,
                    image: b.book_image,
                    author: b.author,
                    plot: b.description,
                })),
            }));
        },
    });

    useEffect(() => {
        axios.get(`http://localhost:8080/v1/mybookshelf/book/all`, {
            headers: {
                "Authorization": `Bearer ${idToken}`,
            }
        })
            .then(res => {
                setBooks(res.data);
                console.log(res.data);
            })
    }, [])

    const handleAddBook = (book) => {
        setBooks(prev => {
            const exists = prev.some(b => b.isbn13 === book.isbn13);

            if (exists) return prev;
            return [...prev, book];
        });
    };

    return (
        <BookContext.Provider value={{data, books, handleAddBook, isLoading, isError}}>
            {children}
        </BookContext.Provider>
    );
};
