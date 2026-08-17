"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

import StarLogo from "../Icons/StarLogo";
import ArrowrightLogo from "../Icons/ArrowrightLogo";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzhmMWQ1MDg2ZWRmOTY1NzQ5NjEyODdiZDI3Y2MzZSIsIm5iZiI6MTc4NjU4NTA5MC41NTIsInN1YiI6IjZhN2QyMDAyMTVhZWU3YzFlNmI3YWNhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5kK_xecc4fk2ymkk7RxsglhtFOIlUAlTRU6TWB4Nr5c`,
  },
};

const MovieCard = ({ movie, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-full cursor-pointer overflow-hidden rounded-lg bg-[#f4f4f4] transition hover:scale-[1.02]"
    >
      {/* Poster */}
      <div className="aspect-2/3 w-full overflow-hidden bg-gray-200">
        <Image
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/movies/DearSanta.png"
          }
          alt={movie.title}
          width={250}
          height={350}
          className="block h-full w-full object-cover"
        />
      </div>

      {/* Information */}
      <div className="min-h-25 bg-[#f4f4f4] px-2.5 pb-3.75 pt-3.5">
        {/* Rating */}
        <div className="mb-2 flex items-center text-[14px] text-gray-700">
          <StarLogo />

          <span>{movie.vote_average?.toFixed(1)}</span>

          <span className="text-gray-500">/10</span>
        </div>

        {/* Title */}
        <h3 className="m-0 text-[19px] font-normal leading-[1.4] text-[#151515]">
          {movie.title}
        </h3>
      </div>
    </div>
  );
};

export const Popular = ({ showSeeMore = true }) => {
  const router = useRouter();

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // API page
  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);
        setError("");

        const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;

        const response = await fetch(url, options);

        const data = await response.json();

        console.log("Popular page:", page);
        console.log("Popular status:", response.status);
        console.log("Popular response:", data);

        if (!response.ok) {
          throw new Error(
            data.status_message || "Failed to fetch popular movies",
          );
        }

        setMovies(data.results.slice(0, 10));
      } catch (error) {
        console.error("Popular Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [page]);

  // See more
  const navigateToPopularPage = () => {
    router.push("/Popular");
  };

  // Movie detail page
  const navigateToMovieDetail = (movieId) => {
    router.push(`/movie/${movieId}`);
  };

  // Next
  const handleNext = () => {
    if (page < 5) {
      setPage(page + 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // Previous
  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

const handleMovieClick = (id) => {
    router.push(`/movie/${id}`);
  }  

  return (
    <section className="w-full px-17.5 pb-10">
      {/* Header */}
      <div className="my-8 mb-8.75 flex items-center justify-between">
        <h2 className="text-[28px] font-bold text-black">Popular</h2>

        {/* See more */}
        {showSeeMore && (
          <button
            className="flex items-center gap-2 text-sm text-[#4338ca] hover:underline"
            onClick={navigateToPopularPage}
          >
            See more
            <ArrowrightLogo />
          </button>
        )}
      </div>

      {/* Loading */}
      {loading && <p className="text-gray-500">Loading...</p>}

      {/* Error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Movies */}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-5 gap-x-8 gap-y-8">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={() => handleMovieClick(movie.id)}
              />
            ))}
          </div>

          {/* Pagination */}
          {!showSeeMore && (
            <div className="mt-5 flex items-center justify-end gap-5 text-[12px]">
              {/* Previous */}
              <button
                onClick={handlePrevious}
                disabled={page === 1}
                className={`flex items-center gap-1 ${
                  page === 1
                    ? "cursor-not-allowed text-gray-300"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                <span>‹</span>
                <span>Previous</span>
              </button>

              {/* Page numbers */}
              <div className="flex items-center gap-3">
                {[1, 2, 3, 4, 5].map((number) => (
                  <button
                    key={number}
                    onClick={() => setPage(number)}
                    className={`flex h-7 w-7 items-center justify-center rounded ${
                      page === number
                        ? "border border-gray-200 bg-white text-black"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {number}
                  </button>
                ))}
              </div>

              {/* Next */}
              <button
                onClick={handleNext}
                disabled={page === 5}
                className={`flex items-center gap-1 ${
                  page === 5
                    ? "cursor-not-allowed text-gray-300"
                    : "text-gray-700 hover:text-black"
                }`}
              >
                <span>Next</span>
                <span>›</span>
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Popular;







