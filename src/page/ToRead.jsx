import React, {useContext, useState} from 'react'
import {ToReadBooksContext} from "../context/list/ToRead";
import {BookCard} from "../component/BookCard";
import {SearchBar} from "../component/SearchBar";

export const ToRead = () => {

    const {ToReadBooks} = useContext(ToReadBooksContext);
    const [searchResult, setSearchResult] = useState(null);

    const displayed = searchResult || ToReadBooks;

    return (
        <>
            <SearchBar data={ToReadBooks} onSearch={setSearchResult} isReview={false}/>

            <div className="book-grid">
                {displayed?.map((book) => (
                    <BookCard key={book.isbn13} book={book} list_name="toRead"/>
                ))}
            </div>
        </>
    )
}
