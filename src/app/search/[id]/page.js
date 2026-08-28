"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Header } from "../../features/Header";
import { Footer } from "../../features/Footer";

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
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Sci-Fi" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

export default function SearchPage() {
  const params = useParams();
  const router = useRouter();

  const searchValue = decodeURIComponent(params.id || "");

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // ОЛОН GENRE СОНГОХ
  const [selectedGenres, setSelectedGenres] = useState([]);

  // =====================================
  // SEARCH MOVIES
  // =====================================
  useEffect(() => {
    if (!searchValue) {
      setMovies([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const getMovies = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            searchValue,
          )}&language=en-US&page=${page}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${TOKEN}`,
            },
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }

        const data = await response.json();

        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Search error:", error);
          setMovies([]);
        }
      } finally {
        setLoading(false);
      }
    };

    getMovies();

    return () => {
      controller.abort();
    };
  }, [searchValue, page]);

  // SEARCH SOLIGDOHOD PAGE 1 BOLNO
  useEffect(() => {
    setPage(1);
    setSelectedGenres([]);
  }, [searchValue]);

  // =====================================
  // MOVIE DETAIL
  // =====================================
  const handleMovieClick = (movieId) => {
    router.push(`/movie/${movieId}`);
  };

  // =====================================
  // GENRE ADD / REMOVE
  // =====================================
  const handleGenreClick = (genreId) => {
    setSelectedGenres((prev) => {
      // HERB SONGOGDSON BOL HASNA
      if (prev.includes(genreId)) {
        return prev.filter((id) => id !== genreId);
      }

      // SONGOGDOOGUI BOL NEMNE
      return [...prev, genreId];
    });
  };

  // =====================================
  // FILTERED MOVIES
  // =====================================
  const filteredMovies = useMemo(() => {
    // YAMAR CH GENRE SONGOGDOOGUI BOL BUGDIIG HARUULNA
    if (selectedGenres.length === 0) {
      return movies;
    }

    // SONGOSON GENRE-UUDIIN ALI NEGT BAIH MOVIE-G HARUULNA
    return movies.filter((movie) =>
      movie.genre_ids?.some((genreId) =>
        selectedGenres.includes(genreId),
      ),
    );
  }, [movies, selectedGenres]);

  // =====================================
  // PREVIOUS PAGE
  // =====================================
  const previousPage = () => {
    if (page <= 1) return;

    setPage((prev) => prev - 1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================
  // NEXT PAGE
  // =====================================
  const nextPage = () => {
    if (page >= totalPages) return;

    setPage((prev) => prev + 1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================
  // REMOVE ALL GENRES
  // =====================================
  const clearGenres = () => {
    setSelectedGenres([]);
  };

  return (
    <main className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
      {/* HEADER */}
      <Header />

      {/* MAIN CONTENT */}
      <section className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-8 sm:px-6 sm:py-10 md:px-10 lg:py-12">
        {/* TITLE */}
        <h1 className="text-[22px] font-semibold text-gray-900 sm:text-2xl dark:text-white">
          Search results
        </h1>

        {/* RESULT COUNT */}
        <p className="mt-4 text-sm font-medium text-gray-800 dark:text-gray-200">
          {loading
            ? "Searching..."
            : `${filteredMovies.length} results for "${searchValue}"`}
        </p>

        {/* CONTENT */}
        <div className="mt-6 flex flex-col gap-10 lg:mt-8 lg:flex-row">
          {/* =====================================
              MOVIES
          ===================================== */}
          <div className="min-w-0 flex-1">
            {/* LOADING */}
            {loading ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 lg:gap-5">
                {Array.from({ length: 10 }).map((_, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900"
                  >
                    <div className="aspect-[2/3] w-full animate-pulse bg-gray-200 dark:bg-gray-800" />

                    <div className="space-y-2 p-3">
                      <div className="h-3 w-14 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

                      <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

                      <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredMovies.length === 0 ? (
              <div className="flex min-h-32 items-center justify-center rounded-lg border border-gray-200 px-4 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
                No results found.
              </div>
            ) : (
              <>
                {/* MOVIE GRID */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 lg:gap-5">
                  {filteredMovies.map((movie) => (
                    <button
                      key={movie.id}
                      type="button"
                      onClick={() => handleMovieClick(movie.id)}
                      className="group min-w-0 overflow-hidden rounded-lg bg-gray-100 text-left transition duration-200 hover:-translate-y-1 hover:shadow-lg dark:bg-gray-900"
                    >
                      {/* POSTER */}
                      <div className="aspect-[2/3] w-full overflow-hidden">
                        {movie.poster_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title || "Movie poster"}
                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gray-200 px-2 text-center text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                            No Image
                          </div>
                        )}
                      </div>

                      {/* MOVIE INFO */}
                      <div className="p-2.5 sm:p-3">
                        <div className="flex items-center gap-1 text-[10px] sm:text-xs">
                          <span className="text-yellow-400">★</span>

                          <span className="text-gray-600 dark:text-gray-400">
                            {movie.vote_average
                              ? movie.vote_average.toFixed(1)
                              : "0"}
                            /10
                          </span>
                        </div>

                        <h2 className="mt-2 line-clamp-2 min-h-8 text-xs leading-4 text-gray-800 sm:text-sm sm:leading-5 dark:text-gray-200">
                          {movie.title}
                        </h2>
                      </div>
                    </button>
                  ))}
                </div>

                {/* PAGINATION */}
                <div className="mt-8 flex items-center justify-end gap-3 sm:mt-10">
                  <button
                    type="button"
                    onClick={previousPage}
                    disabled={page === 1}
                    className={`flex h-8 items-center text-xs transition sm:text-sm ${
                      page === 1
                        ? "cursor-not-allowed text-gray-300 dark:text-gray-700"
                        : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    }`}
                  >
                    <span className="hidden sm:inline">
                      ‹ Previous
                    </span>

                    <span className="sm:hidden">‹</span>
                  </button>

                  <span className="flex h-8 min-w-8 items-center justify-center rounded-md border border-gray-200 px-2 text-xs text-gray-700 sm:text-sm dark:border-gray-700 dark:text-gray-300">
                    {page}
                  </span>

                  <button
                    type="button"
                    onClick={nextPage}
                    disabled={page >= totalPages}
                    className={`flex h-8 items-center text-xs transition sm:text-sm ${
                      page >= totalPages
                        ? "cursor-not-allowed text-gray-300 dark:text-gray-700"
                        : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    }`}
                  >
                    <span className="hidden sm:inline">
                      Next ›
                    </span>

                    <span className="sm:hidden">›</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* =====================================
              SEARCH BY GENRE
          ===================================== */}
          <aside className="w-full shrink-0 border-t border-gray-200 pt-8 dark:border-gray-700 lg:w-64 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Search by genre
              </h2>

              {/* CLEAR */}
              {selectedGenres.length > 0 && (
                <button
                  type="button"
                  onClick={clearGenres}
                  className="text-xs text-[#4F46E5] transition hover:underline"
                >
                  Clear
                </button>
              )}
            </div>

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              See lists of movies by genre
            </p>

            {/* SELECTED COUNT */}
            {selectedGenres.length > 0 && (
              <p className="mt-3 text-xs font-medium text-[#4F46E5]">
                {selectedGenres.length} genre
                {selectedGenres.length > 1 ? "s" : ""} selected
              </p>
            )}

            {/* GENRE BUTTONS */}
            <div className="mt-5 flex flex-wrap gap-2">
              {genres.map((genre) => {
                const isSelected = selectedGenres.includes(
                  genre.id,
                );

                return (
                  <button
                    key={genre.id}
                    type="button"
                    onClick={() =>
                      handleGenreClick(genre.id)
                    }
                    className={`flex items-center gap-1 rounded-full border px-3 py-1 text-[10px] font-medium transition sm:text-xs ${
                      isSelected
                        ? "border-[#4F46E5] bg-[#4F46E5] text-white"
                        : "border-gray-200 bg-white text-gray-700 hover:border-[#4F46E5] hover:text-[#4F46E5] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-[#6366F1] dark:hover:text-[#818CF8]"
                    }`}
                  >
                    <span>{genre.name}</span>

                    <span
                      className={
                        isSelected
                          ? "text-white"
                          : "text-gray-400"
                      }
                    >
                      {isSelected ? "✓" : "›"}
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}