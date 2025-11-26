import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {Skeleton} from "@mui/material";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {BookCard} from "../component/BookCard";

const normalizeTitle = (title) => {
    return title
        ?.toLowerCase()
        .replace(/[:\-–_]/g, " ")
        .replace(/\b(book|vol|volume)\s*\d+\b/g, "")
        .replace(/\d+$/, "")
        .replace(/\s+/g, " ")
        .trim();
};

const fetchAllGenres = async (genres) => {
    const results = [];

    for (const genre of genres) {
        const response = await fetch(
            `https://corsproxy.io/?https://api.bigbookapi.com/search-books?api-key=${process.env.REACT_APP_BOOK_API_KEY}&genres=${encodeURIComponent(genre)}&earliest-publish-year=2010&latest-publish-year=2025&number=70&min-rating=0.8`
        );

        if (response.ok) {
            const data = await response.json();

            const filtered = data.books
                ?.flat()
                .filter(
                    (book) =>
                        book.image &&
                        !book.image.includes("-1-M.jpg") &&
                        !book.title.includes("Untitled") &&
                        book.title.length < 25 &&
                        book.genres?.some((g) => g.toLowerCase().includes(genre.toLowerCase())));

            const uniqueBooks = [];
            const titles = [];

            for (const book of filtered) {

                if (book.title === "Verity") {
                    book.image = "https://covers.openlibrary.org/b/id/12317944-M.jpg";
                }

                const normalized = normalizeTitle(book.title);
                const isDuplicate = titles.some(
                    (t) => t.includes(normalized) || normalized.includes(t)
                );

                if (!isDuplicate) {
                    titles.push(normalized);
                    uniqueBooks.push(book);
                }
            }

            results.push({genre, books: uniqueBooks});


            await new Promise((res) => setTimeout(res, 1200));
        }
    }

    return results;
};

const responsive = {
    xxl: {
        breakpoint: {max: 3000, min: 1500},
        items: 7,
        slidesToSlide: 5
    },
    xl: {
        breakpoint: {max: 1500, min: 1300},
        items: 6,
        slidesToSlide: 4
    },
    lg: {
        breakpoint: {max: 1300, min: 900},
        items: 4,
        slidesToSlide: 3
    },
    md: {
        breakpoint: {max: 900, min: 0},
        items: 3,
        slidesToSlide: 2
    },
    sm: {
        breakpoint: {max: 600, min: 300},
        items: 2,
        slidesToSlide: 1
    },
    xs: {
        breakpoint: {max: 400, min: 0},
        items: 1,
        slidesToSlide: 1
    }

};

export const Home = () => {
    const {data, isLoading, isFetching, isError} = useQuery({
        queryKey: ["allGenresBooks"],
        queryFn: () => fetchAllGenres(["romance", "fantasy", "mystery", "fiction", "horror", "thriller", "erotica"]),
        staleTime: 1000 * 60 * 60 * 12,
        cacheTime: 1000 * 60 * 60 * 24,
    });


    if (isLoading || isFetching) {
        return (
            <div style={{padding: "2rem"}}>
                {[...Array(6)].map((_, i) => (
                    <div key={i} style={{marginBottom: "3rem"}}>
                        <Skeleton variant="text" width="20%" height={40}/>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                                gap: "1rem",
                                marginTop: "1rem",
                            }}
                        >
                            {[...Array(8)].map((_, j) => (
                                <div
                                    key={j}
                                    style={{
                                        borderRadius: "8px",
                                        padding: "0.5rem",
                                    }}
                                >
                                    <Skeleton
                                        variant="rectangular"
                                        width="100%"
                                        height={200}
                                        style={{borderRadius: "4px"}}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }


    if (isError) return <div>error</div>;

    return (
        <div style={{padding: "2rem"}}>

            {data.map(({genre, books}) => (
                <div key={genre} style={{marginBottom: "3rem"}}>
                    <h2 style={{textTransform: "capitalize", marginBottom: "1rem"}}>
                        {genre}
                    </h2>
                    <div
                    >
                        <Carousel
                            swipeable={false}
                            draggable={false}
                            responsive={responsive}
                            infinite={true}
                            transitionDuration={100}
                            containerClass="carousel-container"
                            itemClass="carousel-item"
                        >
                            {books?.length > 0 ? (
                                books.map((book) => (
                                    <BookCard key={book.id} book={book} />
                                ))
                            ) : (
                                <p>no books</p>
                            )}
                        </Carousel>

                    </div>
                </div>
            ))}
        </div>
    );
};