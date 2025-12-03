import React, {useContext} from 'react'
import {BookCard} from "../component/BookCard";
import {ToReadBooksContext} from "../context/list/ToRead";

export const ToRead = () => {

    const {ToReadBooks} = useContext(ToReadBooksContext);

    return (
        <div className="book-grid">
            {ToReadBooks?.map((book) => (
                <BookCard key={book.isbn13} book={book} list_name="toRead" />
            ))}
        </div>
    )
}
