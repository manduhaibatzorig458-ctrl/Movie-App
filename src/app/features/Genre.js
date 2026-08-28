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
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
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

  // ============================
  // URL-EES GENRE AVAH
  // /genre/28
  // /genre/28-16
  // /genre/28-16-35
  // ============================
  useEffect(() => {
    if (!genreParam) return;

    const ids = String(genreParam)
      .split("-")
      .map(Number)
      .filter((id) => !Number.isNaN(id));

    setSelectedGenres(ids);
    setPage(1);
  }, [genreParam]);

  // ============================
  // SELECTED GENRE NAMES
  // ============================
  const selectedGenreNames = genres
    .filter((genre) => selectedGenres.includes(genre.id))
    .map((genre) => genre.name);

  const genreName =
    selectedGenreNames.length > 0
      ? selectedGenreNames.join(" + ")
      : "Movies";

  // ============================
  // GET MOVIES
  // ============================
  useEffect(() => {
    if (selectedGenres.length === 0) {
      setMovies([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const getMovies = async () => {
      try {
        setLoading(true);

        // ОЛОН GENRE-ИЙГ ЗЭРЭГ FILTER ХИЙНЭ
        const genreIds = selectedGenres.join(",");

        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?language=en-US&with_genres=${genreIds}&page=${page}`,
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
          console.error("Genre Error:", error);
          setMovies([]);
          setTotalPages(1);
        }
      } finally {
        setLoading(false);
      }
    };

    getMovies();

    return () => controller.abort();
  }, [selectedGenres, page]);

  // ============================
  // MOVIE CLICK
  // ============================
  const handleMovieClick = (movieId) => {
    router.push(`/movie/${movieId}`);
  };

  // ============================
  // GENRE ADD / REMOVE
  // ============================
  const handleGenreClick = (id) => {
    let newGenres;

    if (selectedGenres.includes(id)) {
      // SONGOSON GENRE-IIG HASNA
      newGenres = selectedGenres.filter(
        (genreId) => genreId !== id,
      );
    } else {
      // SHINE GENRE NEMNE
      newGenres = [...selectedGenres, id];
    }

    setPage(1);

    // BUGD HASAGDSAN BOL DEFAULT ACTION
    if (newGenres.length === 0) {
      router.push("/genre/28");
      return;
    }

    // URL-IIG SHINECHLENE
    router.push(`/genre/${newGenres.join("-")}`);
  };

  // ============================
  // PREVIOUS PAGE
  // ============================
  const previousPage = () => {
    if (page <= 1) return;

    setPage((prev) => prev - 1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ============================
  // NEXT PAGE
  // ============================
  const nextPage = () => {
    if (page >= totalPages) return;

    setPage((prev) => prev + 1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
      {/* HEADER */}
      <Header />

      <section className="mx-auto w-full max-w-360 flex-1 px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10">
        {/* ============================
            MOBILE + DESKTOP TITLE
        ============================ */}
        <div>
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
            Search filter
          </h1>
        </div>

        {/* ============================
            GENRE FILTER
            MOBILE DEER DEED HESGEE
            DESKTOP DEER BARUUN TALD
        ============================ */}
        <div className="mt-6 lg:hidden">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
            Search by genre
          </h2>

          <p className="mt-1 text-[10px] text-gray-500 dark:text-gray-400">
            See lists of movies by genre
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
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
                  className={`flex items-center gap-1 rounded-full border px-3 py-1 text-[10px] font-medium transition ${
                    isSelected
                      ? "border-[#4F46E5] bg-[#4F46E5] text-white"
                      : "border-gray-200 bg-white text-gray-700 hover:border-[#4F46E5] hover:text-[#4F46E5] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                  }`}
                >
                  {genre.name}

                  <span>
                    {isSelected ? "✓" : "›"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================
            SELECTED GENRES
        ============================ */}
        {selectedGenres.length > 0 && (
          <div className="mt-6">
            <div className="flex flex-wrap gap-2">
              {selectedGenres.map((id) => {
                const genre = genres.find(
                  (item) => item.id === id,
                );

                if (!genre) return null;

                return (
                  <button
                    key={genre.id}
                    type="button"
                    onClick={() =>
                      handleGenreClick(genre.id)
                    }
                    className="flex items-center gap-2 rounded-full bg-[#4F46E5] px-3 py-1.5 text-xs font-medium text-white transition hover:bg-[#4338CA]"
                  >
                    {genre.name}

                    <span className="text-sm">
                      ×
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================
            MOVIE TITLE
        ============================ */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 sm:text-xl dark:text-white">
            {genreName} Movies
          </h2>

          <p className="mt-2 text-xs text-gray-500 sm:text-sm dark:text-gray-400">
            See lists of {genreName} movies
          </p>
        </div>

        {/* ============================
            CONTENT
        ============================ */}
        <div className="mt-6 flex flex-col gap-10 lg:flex-row">
          {/* MOVIE LIST */}
          <div className="min-w-0 flex-1">
            {/* LOADING */}
            {loading && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 lg:gap-5">
                {Array.from({ length: 10 }).map(
                  (_, index) => (
                    <div
                      key={index}
                      className="overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900"
                    >
                      <div className="aspect-[2/3] w-full animate-pulse bg-gray-200 dark:bg-gray-800" />

                      <div className="space-y-2 p-3">
                        <div className="h-3 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

                        <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                      </div>
                    </div>
                  ),
                )}
              </div>
            )}

            {/* NO RESULTS */}
            {!loading && movies.length === 0 && (
              <div className="flex h-32 items-center justify-center rounded-lg border border-gray-200 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
                No movies found.
              </div>
            )}

            {/* MOVIES */}
            {!loading && movies.length > 0 && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 lg:gap-5">
                {movies.map((movie) => (
                  <button
                    key={movie.id}
                    type="button"
                    onClick={() =>
                      handleMovieClick(movie.id)
                    }
                    className="group min-w-0 overflow-hidden rounded-lg bg-gray-100 text-left transition hover:-translate-y-1 hover:shadow-lg dark:bg-gray-900"
                  >
                    {/* POSTER */}
                    <div className="aspect-[2/3] w-full overflow-hidden">
                      {movie.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={
                            movie.title || "Movie poster"
                          }
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-200 text-xs text-gray-500 dark:bg-gray-800">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* INFO */}
                    <div className="p-2.5 sm:p-3">
                      <div className="flex items-center gap-1 text-[10px] sm:text-xs">
                        <span className="text-yellow-400">
                          ★
                        </span>

                        <span className="text-gray-600 dark:text-gray-400">
                          {movie.vote_average
                            ? movie.vote_average.toFixed(1)
                            : "N/A"}
                          /10
                        </span>
                      </div>

                      <h2 className="mt-2 line-clamp-2 min-h-8 text-xs font-medium leading-4 text-gray-800 sm:text-sm sm:leading-5 dark:text-gray-200">
                        {movie.title}
                      </h2>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* PAGINATION */}
            {!loading && movies.length > 0 && (
              <div className="mt-8 flex items-center justify-end gap-3 sm:mt-10">
                <button
                  type="button"
                  onClick={previousPage}
                  disabled={page === 1}
                  className={`text-xs sm:text-sm ${
                    page === 1
                      ? "cursor-not-allowed text-gray-300"
                      : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  }`}
                >
                  ‹ Previous
                </button>

                <span className="flex h-8 min-w-8 items-center justify-center rounded-md border border-gray-200 px-2 text-xs text-gray-700 sm:text-sm dark:border-gray-700 dark:text-gray-300">
                  {page}
                </span>

                <button
                  type="button"
                  onClick={nextPage}
                  disabled={page >= totalPages}
                  className={`text-xs sm:text-sm ${
                    page >= totalPages
                      ? "cursor-not-allowed text-gray-300"
                      : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  }`}
                >
                  Next ›
                </button>
              </div>
            )}
          </div>

          {/* ============================
              DESKTOP GENRE SIDEBAR
          ============================ */}
          <aside className="hidden w-64 shrink-0 border-l border-gray-200 pl-8 lg:block dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Search by genre
            </h2>

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Select multiple genres
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {genres.map((genre) => {
                const isSelected =
                  selectedGenres.includes(genre.id);

                return (
                  <button
                    key={genre.id}
                    type="button"
                    onClick={() =>
                      handleGenreClick(genre.id)
                    }
                    className={`flex items-center gap-1 rounded-full border px-3 py-1 text-xs transition ${
                      isSelected
                        ? "border-[#4F46E5] bg-[#4F46E5] text-white"
                        : "border-gray-200 bg-white text-gray-700 hover:border-[#4F46E5] hover:text-[#4F46E5] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                    }`}
                  >
                    {genre.name}

                    <span>
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

