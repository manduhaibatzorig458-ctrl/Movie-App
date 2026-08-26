"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Header } from "../../features/Header";
import { Footer } from "../../features/Footer";

const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzhmMWQ1MDg2ZWRmOTY1NzQ5NjEyODdiZDI3Y2MzZSIsIm5iZiI6MTc4NjU4NTA5MC41NTIsInN1YiI6IjZhN2QyMDAyMTVhZWU3YzFlNmI3YWNhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5kK_xecc4fk2ymkk7RxsglhtFOIlUAlTRU6TWB4Nr5c";

export default function SearchPage() {
  const params = useParams();
  const router = useRouter();

  const searchValue = params.id;

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!searchValue) return;

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
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }

        const data = await response.json();

        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        console.error("Search error:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [searchValue, page]);

  // MOVIE DETIAL
  const handleMovieClick = (movieId) => {
    router.push(`/movie/${movieId}`);
  };

  // PAGINATION
  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);

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

      {/* SEARCH RESULTS */}
      <section className="mx-auto max-w-360 px-10 py-10">
        {/* TITLE */}
        <h1 className="text-2xl font-semibold text-gray-900">Search results</h1>

        {/* RESULT COUNT */}
        <p className="mt-4 text-sm font-medium text-gray-900">
          {movies.length > 0
            ? `${movies.length} results for "${searchValue}"`
            : `0 results for "${searchValue}"`}
        </p>

        <div className="mt-8 flex gap-10">
          {/*MOVIE*/}
          <div className="flex-1">
            {/* LOADING */}
            {loading ? (
              <div className="grid grid-cols-5 gap-5">
                {Array.from({ length: 5 }).map((_, index) => (
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
            ) : movies.length === 0 ? (
              /* NO RESULTS */
              <div className="flex h-32 items-center justify-center rounded-lg border border-gray-200 text-sm text-gray-500">
                No results found.
              </div>
            ) : (
              /* MOVIES */
              <div className="grid grid-cols-5 gap-5">
                {movies.map((movie) => (
                  <div
                    key={movie.id}
                    onClick={() => handleMovieClick(movie.id)}
                    className="cursor-pointer overflow-hidden rounded-lg bg-gray-100 transition hover:-translate-y-1 hover:shadow-md"
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

                    {/* MOVIE INFO */}
                    <div className="p-3">
                      {/* RATING */}
                      <div className="flex items-center gap-1 text-xs">
                        <span className="text-yellow-400">★</span>

                        <span className="text-gray-600">
                          {movie.vote_average
                            ? movie.vote_average.toFixed(1)
                            : "0"}
                          /10
                        </span>
                      </div>

                      {/* TITLE */}
                      <h2 className="mt-2 line-clamp-2 text-sm text-gray-800">
                        {movie.title}
                      </h2>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/*PAGINATION*/}
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

          {/*SEARCH BY GENRE*/}
          <aside className="w-64 border-l border-gray-200 pl-8">
            <h2 className="text-lg font-semibold text-gray-900">
              Search by genre
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              See lists of movies by genre
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {[
                "Action",
                "Adventure",
                "Animation",
                "Biography",
                "Comedy",
                "Crime",
                "Documentary",
                "Drama",
                "Family",
                "Fantasy",
                "Film-Noir",
                "Game-Show",
                "History",
                "Horror",
                "Music",
                "Musical",
                "Mystery",
                "News",
                "Reality-TV",
                "Romance",
                "Sci-Fi",
                "Short",
                "Sport",
                "Talk-Show",
                "Thriller",
                "War",
                "Western",
              ].map((genre) => (
                <button
                  key={genre}
                  onClick={() => {
                    router.push(`/genre/${encodeURIComponent(genre)}`);
                  }}
                  className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-700 hover:bg-gray-100"
                >
                  {genre} ›
                </button>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}











