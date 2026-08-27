"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

import { Header } from "../../../../features/Header";
import { Footer } from "../../../../features/Footer";

const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzhmMWQ1MDg2ZWRmOTY1NzQ5NjEyODdiZDI3Y2MzZSIsIm5iZiI6MTc4NjU4NTA5MC41NTIsInN1YiI6IjZhN2QyMDAyMTVhZWU3YzFlNmI3YWNhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5kK_xecc4fk2ymkk7RxsglhtFOIlUAlTRU6TWB4Nr5c";

export default function SimilarPage() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id;

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // GET SIMILAR MOVIES
  useEffect(() => {
    if (!id) return;

    const getSimilarMovies = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=${page}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${TOKEN}`,
            },
          },
        );

        const data = await response.json();

        console.log("Similar Movie ID:", id);
        console.log("Similar Movies:", data);

        if (!response.ok) {
          throw new Error(
            data.status_message || "Failed to fetch similar movies",
          );
        }

        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        console.error("Similar movies error:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    getSimilarMovies();
  }, [id, page]);

  // GO TO MOVIE DETAIL
  const goToMovie = (movieId) => {
    router.push(`/movie/${movieId}`);
  };

  // PREVIOUS PAGE
  const goPrevious = () => {
    if (page > 1) {
      setPage(page - 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // NEXT PAGE
  const goNext = () => {
    if (page < totalPages) {
      setPage(page + 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // LOADING
  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Header />

        <div className="mx-auto max-w-275 px-6 py-10">
          <div className="mb-7 h-8 w-60 animate-pulse rounded bg-gray-200" />

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg bg-gray-100"
              >
                <div className="aspect-2/3 animate-pulse bg-gray-200" />

                <div className="p-3">
                  <div className="mb-2 h-4 w-16 animate-pulse rounded bg-gray-200" />

                  <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <Header />

      <div className="mx-auto max-w-275 px-6 py-7 md:py-10">
        {/* BACK */}
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-black"
        >
          <span className="text-lg">←</span>
          Back
        </button>

        {/* TITLE */}
        <div className="mb-7">
          <h1 className="text-[28px] font-bold">More like this</h1>
        </div>

        {/* NO MOVIES */}
        {movies.length === 0 ? (
          <div className="flex min-h-80 items-center justify-center">
            <p className="text-gray-500">No similar movies found.</p>
          </div>
        ) : (
          <>
            {/* MOVIE GRID */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
              {movies.map((movie) => (
                <button
                  key={movie.id}
                  type="button"
                  onClick={() => goToMovie(movie.id)}
                  className="group overflow-hidden rounded-lg bg-gray-100 text-left transition hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* POSTER */}
                  <div className="relative aspect-2/3 overflow-hidden bg-gray-200">
                    {movie.poster_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title || "Movie poster"}
                        fill
                        sizes="(max-width: 768px) 50vw, 180px"
                        className="object-cover transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* INFO */}
                  <div className="px-2 py-2">
                    {/* RATING */}
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-yellow-400">★</span>

                      <span className="font-medium">
                        {movie.vote_average
                          ? movie.vote_average.toFixed(1)
                          : "0.0"}
                      </span>

                      <span className="text-gray-500">/10</span>
                    </div>

                    {/* TITLE */}
                    <p className="mt-1 line-clamp-2 text-sm font-medium">
                      {movie.title || "Unknown Movie"}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* PAGINATION */}
            <div className="mt-8 flex items-center justify-end gap-5">
              {/* PREVIOUS */}
              <button
                type="button"
                disabled={page === 1}
                onClick={goPrevious}
                className={`text-sm ${
                  page === 1
                    ? "cursor-not-allowed text-gray-300"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                ‹ Previous
              </button>

              {/* CURRENT PAGE */}
              <span className="flex h-9 min-w-9 items-center justify-center rounded-lg border border-gray-200 px-2 text-sm">
                {page}
              </span>

              {/* NEXT PAGE NUMBER */}
              {page < totalPages && (
                <button
                  type="button"
                  onClick={goNext}
                  className="text-sm text-black hover:text-purple-600"
                >
                  {page + 1}
                </button>
              )}

              {/* NEXT */}
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={goNext}
                className={`text-sm ${
                  page >= totalPages
                    ? "cursor-not-allowed text-gray-300"
                    : "text-black hover:text-purple-600"
                }`}
              >
                Next ›
              </button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </main>
  );
}
