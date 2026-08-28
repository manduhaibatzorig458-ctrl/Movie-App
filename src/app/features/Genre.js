"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Header } from "../features/Header";
import { Footer } from "../features/Footer";

const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzhmMWQ1MDg2ZWRmOTY1NzQ5NjEyODdiZDI3Y2MzZSIsIm5iZiI6MTc4NjU4NTA5MC41NTIsInN1YiI6IjZhN2QyMDAyMTVhZWU3YzFlNmI3YWNhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5kK_xecc4fk2ymkk7RxsglhtFOIlUAlTRU6TWB4Nr5c";

const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 53, name: "Thriller" },
];

export default function GenrePage() {
  const params = useParams();
  const router = useRouter();

  const genreParam = params.id;

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!genreParam) return;

    const ids = String(genreParam)
      .split("-")
      .map(Number)
      .filter((id) => !Number.isNaN(id));

    setSelectedGenres(ids);
    setPage(1);
  }, [genreParam]);

  const selectedGenreNames = genres
    .filter((genre) => selectedGenres.includes(genre.id))
    .map((genre) => genre.name);

  const genreName =
    selectedGenreNames.length > 0 ? selectedGenreNames.join(" + ") : "Movies";

  // GET MOVIES
  useEffect(() => {
    if (selectedGenres.length === 0) {
      return;
    }

    const getMovies = async () => {
      try {
        setLoading(true);

        const genreIds = selectedGenres.join(",");

        console.log("Selected genres:", selectedGenres);
        console.log("TMDB genres:", genreIds);

        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?language=en-US&with_genres=${genreIds}&page=${page}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${TOKEN}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.status_message || `TMDB Error: ${response.status}`,
          );
        }

        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        console.error("Genre Error:", error);

        setMovies([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [selectedGenres, page]);

  // MOVIE CLICK
  const handleMovieClick = (movieId) => {
    router.push(`/movie/${movieId}`);
  };

  //  GENRE CLICK
  const handleGenreClick = (id) => {
    let newGenres;

    if (selectedGenres.includes(id)) {
      newGenres = selectedGenres.filter((genreId) => genreId !== id);
    } else {
      newGenres = [...selectedGenres, id];
    }

    setPage(1);

    if (newGenres.length === 0) {
      router.push("/genre/28");
      return;
    }

    router.push(`/genre/${newGenres.join("-")}`);
  };

  // REMOVE SELECTED GENRE
  const removeGenre = (id) => {
    const newGenres = selectedGenres.filter((genreId) => genreId !== id);

    if (newGenres.length === 0) {
      router.push("/genre/28");
      return;
    }

    router.push(`/genre/${newGenres.join("-")}`);
  };

  // PREVIOUS PAGE
  const previousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // NEXT PAGE
  const nextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* HEADER */}
      <Header />

      <section className="mx-auto max-w-360 px-10 py-10">
        {/* TITLE */}
        <h1 className="text-2xl font-semibold text-gray-900">
          {genreName} Movies
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          See lists of {genreName} movies
        </p>

        {/* SELECTED GENRES */}
        {selectedGenres.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {selectedGenres.map((id) => {
              const genre = genres.find((item) => item.id === id);

              if (!genre) return null;

              return (
                <button
                  key={genre.id}
                  onClick={() => removeGenre(genre.id)}
                  className="flex items-center gap-2 rounded-full bg-blue-500 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-600"
                >
                  {genre.name}

                  <span className="text-sm">×</span>
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-8 flex gap-10">
          {/* MOVIE LIST */}

          <div className="min-w-0 flex-1">
            {/* LOADING */}
            {loading && (
              <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {Array.from({ length: 10 }).map((_, index) => (
                  <div
                    key={index}
                    className="animate-pulse overflow-hidden rounded-lg bg-gray-100"
                  >
                    <div className="h-64 bg-gray-200" />

                    <div className="p-3">
                      <div className="h-3 w-16 rounded bg-gray-200" />

                      <div className="mt-3 h-4 w-24 rounded bg-gray-200" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* NO RESULTS */}
            {!loading && movies.length === 0 && (
              <div className="flex h-32 items-center justify-center rounded-lg border border-gray-200 text-sm text-gray-500">
                No movies found.
              </div>
            )}

            {/* MOVIES */}
            {!loading && movies.length > 0 && (
              <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {movies.map((movie) => (
                  <div
                    key={movie.id}
                    onClick={() => handleMovieClick(movie.id)}
                    className="cursor-pointer overflow-hidden rounded-lg bg-gray-100 transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    {/* POSTER */}
                    <div className="h-64 w-full overflow-hidden">
                      {movie.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gray-200 text-sm text-gray-500">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* INFO */}
                    <div className="p-3">
                      {/* RATING */}
                      <div className="flex items-center gap-1 text-xs">
                        <span className="text-yellow-400">★</span>

                        <span className="text-gray-600">
                          {movie.vote_average
                            ? movie.vote_average.toFixed(1)
                            : "N/A"}
                          /10
                        </span>
                      </div>

                      {/* TITLE */}
                      <h2 className="mt-2 line-clamp-2 text-sm font-medium text-gray-800">
                        {movie.title}
                      </h2>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* PAGINATION */}
            {!loading && movies.length > 0 && (
              <div className="mt-10 flex items-center justify-end gap-3">
                {/* PREVIOUS */}
                <button
                  onClick={previousPage}
                  disabled={page === 1}
                  className={`text-sm ${
                    page === 1
                      ? "cursor-not-allowed text-gray-300"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  ‹ Previous
                </button>

                {/* CURRENT PAGE */}
                <span className="flex h-8 min-w-8 items-center justify-center rounded-md border border-gray-200 px-2 text-sm text-gray-700">
                  {page}
                </span>

                {/* NEXT */}
                <button
                  onClick={nextPage}
                  disabled={page >= totalPages}
                  className={`text-sm ${
                    page >= totalPages
                      ? "cursor-not-allowed text-gray-300"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  Next ›
                </button>
              </div>
            )}
          </div>

          {/* GENRE SIDEBAR*/}

          <aside className="hidden w-64 shrink-0 border-l border-gray-200 pl-8 lg:block">
            <h2 className="text-lg font-semibold text-gray-900">
              Search by genre
            </h2>

            <p className="mt-1 text-xs text-gray-500">Select multiple genres</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {genres.map((genre) => {
                const isSelected = selectedGenres.includes(genre.id);

                return (
                  <button
                    key={genre.id}
                    onClick={() => handleGenreClick(genre.id)}
                    className={`rounded-full border px-3 py-1 text-xs transition ${
                      isSelected
                        ? "border-blue-500 bg-blue-500 text-white"
                        : "border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {genre.name}

                    {isSelected ? " ✓" : " ›"}
                  </button>
                );
              })}
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}








