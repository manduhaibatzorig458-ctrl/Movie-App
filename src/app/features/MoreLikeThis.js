"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

import { Header } from "../../../features/Header";
import { Footer } from "../../../features/Footer";

const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzhmMWQ1MDg2ZWRmOTY1NzQ5NjEyODdiZDI3Y2MzZSIsIm5iZiI6MTc4NjU4NTA5MC41NTIsInN1YiI6IjZhN2QyMDAyMTVhZWU3YzFlNmI3YWNhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5kK_xecc4fk2ymkk7RxsglhtFOIlUAlTRU6TWB4Nr5c";

export default function SimilarMoviesPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id;

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    const getSimilarMovies = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
              accept: "application/json",
            },
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch similar movies");
        }

        const data = await response.json();

        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Similar movies error:", error);

          setMovies([]);
          setTotalPages(1);
        }
      } finally {
        setLoading(false);
      }
    };

    getSimilarMovies();

    return () => controller.abort();
  }, [id, page]);

  // MOVIE DETAIL
  const goToMovie = (movieId) => {
    router.push(`/movie/${movieId}`);
  };

  // PREVIOUS PAGE
  const previousPage = () => {
    if (page <= 1) return;

    setPage((prev) => prev - 1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // NEXT PAGE
  const nextPage = () => {
    if (page >= totalPages) return;

    setPage((prev) => prev + 1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
      <Header />
      <main className="mx-auto w-full max-w-360 flex-1 px-4 py-7 sm:px-6 sm:py-10 md:px-10 md:py-12 lg:px-15 lg:pt-13.75 lg:pb-15">
        {/* TITLE */}
        <div className="mb-5 sm:mb-7">
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl md:text-[28px] dark:text-white">
            More like this
          </h1>
        </div>

        {/* LOADING SKELETON */}
        {loading && (
          <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-7 lg:gap-y-7">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900"
              >
                {/* POSTER SKELETON */}
                <div className="aspect-2/3 w-full animate-pulse bg-gray-200 dark:bg-gray-800" />

                {/* TEXT SKELETON */}
                <div className="space-y-3 p-2 sm:p-3">
                  <div className="h-3 w-14 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

                  <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

                  <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* NO RESULTS */}
        {!loading && movies.length === 0 && (
          <div className="flex h-32 items-center justify-center rounded-lg border border-gray-200 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
            No similar movies found.
          </div>
        )}

        {/* MOVIE GRID */}
        {!loading && movies.length > 0 && (
          <>
            <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-7 lg:gap-y-7">
              {movies.map((movie) => (
                <button
                  key={movie.id}
                  type="button"
                  onClick={() => goToMovie(movie.id)}
                  className="group min-w-0 overflow-hidden rounded-lg bg-[#f5f5f5] text-left transition duration-200 hover:-translate-y-1 hover:shadow-lg dark:bg-gray-900"
                >
                  {/* POSTER */}
                  <div className="relative aspect-2/3 w-full overflow-hidden">
                    {movie.poster_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title || "Movie poster"}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                        className="object-cover transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-200 text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* MOVIE INFO */}
                  <div className="p-2 sm:px-2 sm:py-2.5">
                    {/* RATING */}
                    <div className="flex items-center gap-1">
                      <span className="text-[11px] text-yellow-400 sm:text-sm">
                        ★
                      </span>

                      <span className="text-[10px] text-gray-700 sm:text-sm dark:text-gray-300">
                        {movie.vote_average
                          ? movie.vote_average.toFixed(1)
                          : "0.0"}
                      </span>

                      <span className="text-[9px] text-gray-400 sm:text-xs">
                        /10
                      </span>
                    </div>

                    {/* TITLE */}
                    <h2 className="mt-1 line-clamp-2 min-h-8 text-[11px] font-medium leading-4 text-gray-900 sm:mt-2 sm:min-h-10 sm:text-sm sm:leading-5 md:text-base dark:text-white">
                      {movie.title}
                    </h2>
                  </div>
                </button>
              ))}
            </div>

            {/* PAGINATION */}
            <div className="mt-8 flex items-center justify-center gap-3 sm:mt-10 sm:justify-end sm:gap-5">
              {/* PREVIOUS */}
              <button
                type="button"
                disabled={page === 1}
                onClick={previousPage}
                className={`text-xs transition sm:text-sm ${
                  page === 1
                    ? "cursor-not-allowed text-gray-300 dark:text-gray-700"
                    : "text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
                }`}
              >
                ‹ Previous
              </button>

              {/* CURRENT PAGE */}
              <span className="flex h-8 min-w-8 items-center justify-center rounded-md border border-gray-200 px-2 text-xs text-gray-700 sm:h-9 sm:min-w-9 sm:text-sm dark:border-gray-700 dark:text-gray-300">
                {page}
              </span>

              {/* NEXT PAGE NUMBER */}
              {page < totalPages && (
                <button
                  type="button"
                  onClick={nextPage}
                  className="hidden text-sm text-gray-500 transition hover:text-purple-600 sm:block dark:text-gray-400"
                >
                  {page + 1}
                </button>
              )}

              {/* NEXT */}
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={nextPage}
                className={`text-xs transition sm:text-sm ${
                  page >= totalPages
                    ? "cursor-not-allowed text-gray-300 dark:text-gray-700"
                    : "text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                }`}
              >
                Next ›
              </button>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
