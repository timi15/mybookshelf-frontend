import React, {useContext} from "react";
import Carousel from "react-multi-carousel";
import {BookContext} from "../context/book/Books";
import {BookCard} from "../component/BookCard";
import 'react-multi-carousel/lib/styles.css';
import "../assert/css/home.css"

export const Home = () => {

    const {data, isLoading, isError} = useContext(BookContext);

    const responsive = {
        xxl: {breakpoint: {max: 3000, min: 1500}, items: 7},
        xl: {breakpoint: {max: 1500, min: 1300}, items: 6},
        lg: {breakpoint: {max: 1300, min: 900}, items: 4},
        md: {breakpoint: {max: 900, min: 0}, items: 3},
        sm: {breakpoint: {max: 600, min: 300}, items: 2},
        xs: {breakpoint: {max: 400, min: 0}, items: 1}
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading books</div>;

    return (
        <>

            {data.map(({genre, books}) => (
                <div key={genre} style={{marginBottom: "3rem"}}>
                    <h2 style={{marginBottom: "1rem"}}>{genre}</h2>

                    <Carousel
                        swipeable={false}
                        draggable={false}
                        responsive={responsive}
                        infinite={true}
                        transitionDuration={100}
                        containerClass="carousel-container"
                        itemClass="carousel-item">
                        {books.map((book) => (
                            <BookCard key={book.isbn13} book={book}/>
                        ))}
                    </Carousel>
                </div>
            ))}

        </>
    );
};
