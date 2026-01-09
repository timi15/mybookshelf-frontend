import React, {useContext, useState} from 'react'
import {LovedBooksContext} from "../context/list/Loved";
import {BookCard} from "../component/BookCard";
import {SearchBar} from "../component/SearchBar";

export const Loved = () => {

    const {lovedBooks} = useContext(LovedBooksContext);
    const [searchResult, setSearchResult] = useState(null);

    const displayed = searchResult || lovedBooks;

    return (
        <>
            <SearchBar data={lovedBooks} onSearch={setSearchResult} isReview={false}/>

            <div className="book-grid">
                {displayed?.map((book) => (
                    <BookCard key={book.isbn13} book={book} list_name="loved"/>
                ))}
            </div>
        </>
    )
}
