import React, {useContext} from 'react'
import {LovedBooksContext} from "../context/list/Loved";
import {BookCard} from "../component/BookCard";

export const Loved = () => {

    const {lovedBooks} = useContext(LovedBooksContext);

    return (
        <div className="book-grid">
            {lovedBooks?.map((book) => (
                <BookCard key={book.isbn13} book={book} list_name="loved" />
            ))}
        </div>
    )
}
