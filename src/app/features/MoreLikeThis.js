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
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch similar movies");
        }

        const data = await response.json();

        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getSimilarMovies();
  }, [id, page]);

  const goToMovie = (movieId) => {
    router.push(`/movie/${movieId}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="px-15 pt-13.75 pb-15">
        <div className="flex items-center justify-between mb-7">
          <h1 className="text-[28px] font-bold">More like this</h1>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-5 gap-x-7 gap-y-7">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => goToMovie(movie.id)}
                  className="overflow-hidden rounded-lg bg-[#f5f5f5] cursor-pointer hover:shadow-lg transition"
                >
                  <div className="relative w-full h-75.2">
                    {movie.poster_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                  </div>

                  <div className="px-2 py-2.5">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-yellow-400">★</span>

                      <span className="text-sm text-gray-700">
                        {movie.vote_average
                          ? movie.vote_average.toFixed(1)
                          : "0.0"}
                      </span>

                      <span className="text-xs text-gray-400">/10</span>
                    </div>

                    <h2 className="text-base font-medium line-clamp-2">
                      {movie.title}
                    </h2>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-end items-center gap-5 mt-7">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className={`text-sm ${
                  page === 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                ‹ Previous
              </button>

              <button className="w-9 h-9 border rounded-lg text-sm">
                {page}
              </button>

              {page < totalPages && (
                <button
                  onClick={() => setPage(page + 1)}
                  className="text-sm hover:text-purple-600"
                >
                  {page + 1}
                </button>
              )}

              <button
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                className={`text-sm ${
                  page >= totalPages
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-black hover:text-purple-600"
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
