import React, {useContext, useState} from 'react'
import {BookContext} from "../context/book/Books";
import {BookCard} from "../component/BookCard";
import {SearchBar} from "../component/SearchBar";
import "../assert/css/library.css"

export const Library = () => {

    const {books} = useContext(BookContext);
    const [searchResult, setSearchResult] = useState(null);

    const displayed = searchResult || books;

    return (
        <>
            <SearchBar data={books} onSearch={setSearchResult} isReview={false}/>

            <div className="book-grid">
                {displayed?.map((book) => (
                    <BookCard key={book.isbn13} book={book} list_name="none"/>
                ))}
            </div>

        </>
    )
}
