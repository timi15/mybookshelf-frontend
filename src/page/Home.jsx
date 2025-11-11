import React from 'react';
import {useQuery} from "@tanstack/react-query";

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

export const Home = () => {
    const {data, isLoading, isError} = useQuery({
        queryKey: ["allGenresBooks"],
        queryFn: () => fetchAllGenres(["romance", "fantasy", "mystery", "fiction", "horror", "thriller", "erotica"]),
        staleTime: 1000 * 60 * 60 * 12,
        cacheTime: 1000 * 60 * 60 * 24,
    });

    if (isLoading) return <div> loading </div>;
    if (isError) return <div>error</div>;

    return (
        <div style={{padding: "2rem"}}>
            <h1 style={{textAlign: "center", marginBottom: "2rem"}}>
                books
            </h1>

            {data.map(({genre, books}) => (
                <div key={genre} style={{marginBottom: "3rem"}}>
                    <h2 style={{textTransform: "capitalize", marginBottom: "1rem"}}>
                        {genre}
                    </h2>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                            gap: "1rem",
                        }}
                    >
                        {books?.length > 0 ? (
                            books.map((book) => (
                                <div
                                    key={book.id}
                                    style={{
                                        border: "1px solid #ddd",
                                        borderRadius: "8px",
                                        padding: "0.5rem",
                                        textAlign: "center",
                                        backgroundColor: "#fafafa",
                                        transition: "transform 0.2s ease",
                                    }}
                                >
                                    <img
                                        src={book.image}
                                        alt={book.title}
                                        style={{
                                            width: "100%",
                                            height: "200px",
                                            objectFit: "cover",
                                            borderRadius: "4px",
                                        }}
                                    />
                                    <p style={{fontWeight: "bold", marginTop: "0.5rem"}}>{book.title}</p>
                                    <p style={{marginTop: "0.5rem"}}>{book.genres}</p>
                                    <p style={{fontSize: "0.9rem", color: "#666"}}>
                                        {book.authors?.[0]?.name ?? "Ismeretlen szerző"}
                                    </p>

                                </div>
                            ))
                        ) : (
                            <p>no books</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};
