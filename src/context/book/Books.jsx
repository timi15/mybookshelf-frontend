import React, { createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const BookContext = createContext();

export const Books = ({ children }) => {

    const { data, isLoading, isError } = useQuery({
        queryKey: ["nyt-books"],
        queryFn: async () => {
            const res = await axios.get(
                `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${process.env.REACT_APP_BOOK_API_KEY}`
            );

            const lists = res.data.results.lists;

            const formatted = lists.map((list) => ({
                genre: list.display_name,
                books: list.books.map((b) => ({
                    isbn13: b.primary_isbn13,
                    title: b.title,
                    image: b.book_image,
                    author: b.author,
                    plot: b.description,
                })),
            }));

            return formatted;
        },
    });

    return (
        <BookContext.Provider value={{ data, isLoading, isError }}>
            {children}
        </BookContext.Provider>
    );
};
