import React, {useContext} from 'react'
import {BookContext} from "../context/book/Books";
import {BookCard} from "../component/BookCard";
import "../assert/css/library.css"

export const Library = () => {

    const {books} = useContext(BookContext);

    return (
        <div className="book-grid">
            {books?.map((book) => (
                <BookCard key={book.isbn13} book={book} list_name="none" />
            ))}
        </div>
    )
}
