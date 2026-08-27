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
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzhmMWQ1MDg2ZWRmOTY1NzQ5NjEyODdiZDI3Y2MzZSIsIm5iZiI6MTc4NjU4NTA5MC41NTIsInN1YiI6IjZhN2QyMDAyMTVhZWU3YzFlNmI3YWNhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5kK_xecc4fk2ymkk7RxsglhtFOIlUAlTRU6TWB4Nr5c",
  },
};

// MOVIE CARD
const MovieCard = ({ movie, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-full cursor-pointer overflow-hidden rounded-lg bg-[#f4f4f4] transition duration-200 hover:scale-[1.02] dark:bg-gray-900"
    >
      {/* POSTER */}
      <div className="aspect-2/3 w-full overflow-hidden bg-gray-200 dark:bg-gray-800">
        <Image
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/movies/DearSanta.png"
          }
          alt={movie.title || "Movie poster"}
          width={250}
          height={350}
          className="block h-full w-full object-cover"
        />
      </div>

      {/* MOVIE INFORMATION */}
      <div className="min-h-25 bg-[#f4f4f4] px-2.5 pb-3.75 pt-3.5 dark:bg-gray-900">

        {/* RATING */}
        <div className="mb-2 flex items-center text-[14px] text-gray-700 dark:text-gray-300">
          <StarLogo />

          <span className="ml-1">
            {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
          </span>

          <span className="ml-1 text-gray-500 dark:text-gray-500">/10</span>
        </div>

        {/* TITLE */}
        <h3 className="m-0 text-[19px] font-normal leading-[1.4] text-[#151515] dark:text-white">
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
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);
        setError("");

        const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
        console.log("Fetching page:", page);

        const response = await fetch(url, options);
        const data = await response.json();

        console.log("TMDB status:", response.status);
        console.log("TMDB data:", data);

        if (!response.ok) {
          throw new Error(
            data.status_message || "Failed to fetch popular movies",
          );
        }

        setMovies(data.results || []);

        setTotalPages(Math.min(data.total_pages || 1, 500));
      } catch (error) {
        console.error("Popular Error:", error);

        setMovies([]);

        setError(error.message || "Failed to fetch popular movies");
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [page]);

  const navigateToPopularPage = () => {
    router.push("/Popular");
  };

  // MOVIE DETIAL
  const handleMovieClick = (movieId) => {
    console.log("Clicked movie ID:", movieId);

    router.push(`/movie/${movieId}`);
  };

  // PAGE CHANGE
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }

    setPage(newPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // PREVIOUS
  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // NEXT
  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-white px-17.5 pb-10 transition-colors duration-300 dark:bg-gray-950">

      {/* HEADER */}
      <div className="my-8 mb-8.75 flex items-center justify-between">

        {/* TITLE */}
        <h2 className="text-[28px] font-bold text-black dark:text-white">
          Popular
        </h2>

        {/* SEE MORE */}
        {showSeeMore && (
          <button
            onClick={navigateToPopularPage}
            className="flex items-center gap-2 text-sm text-[#4338ca] hover:underline dark:text-indigo-400"
          >
            <span>See more</span>
            <ArrowrightLogo />
          </button>
        )}
      </div>

      {/* LOADING */}
      {loading && (
        <div className="flex min-h-75 items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      )}

      {/* ERROR */}
      {!loading && error && (
        <div className="flex min-h-75 flex-col items-center justify-center gap-3">
          <p className="text-red-500">{error}</p>

          <button
            onClick={() => window.location.reload()}
            className="rounded-md bg-black px-4 py-2 text-sm text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            Try again
          </button>
        </div>
      )}

      {/* MOVIES */}
      {!loading && !error && movies.length > 0 && (
        <>
          {/* MOVIE GRID */}
          <div className="grid grid-cols-5 gap-x-8 gap-y-8">
            {movies.slice(0, 10).map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={() => handleMovieClick(movie.id)}
              />
            ))}
          </div>

          {/* PAGINATION */}
          {!showSeeMore && (
            <div className="mt-8 flex h-10 items-center justify-end gap-2 text-[14px]">
              {/* PREVIOUS */}

              <button
                onClick={handlePrevious}
                disabled={page === 1}
                className={`flex h-10 items-center justify-center gap-1 rounded-md border border-[#E4E4E7] px-3 dark:border-gray-700
                    ${
                      page === 1
                        ? "cursor-not-allowed text-gray-300 dark:text-gray-700"
                        : "cursor-pointer text-[#09090B] hover:bg-zinc-100 dark:text-gray-200 dark:hover:bg-gray-800"
                    }
                  `}
              >
                <span className="text-[18px] leading-none">‹</span>

                <span className="font-inter text-[14px] font-medium leading-5">
                  Previous
                </span>
              </button>

              {/* PAGE NUMBERS */}
              <div className="flex h-10 items-center gap-1">

                {/* CURRENT PAGE */}
                <button
                  onClick={() => handlePageChange(page)}
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-[#E4E4E7] bg-white text-black dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  {page}
                </button>

                {/* NEXT PAGE */}
                {page + 1 <= totalPages && (
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    className="flex h-10 w-10 items-center justify-center rounded-md text-[#09090B] transition hover:bg-zinc-100 dark:text-gray-200 dark:hover:bg-gray-800"
                  >
                    {page + 1}
                  </button>
                )}

                {/* DOTS */}
                {page + 4 < totalPages && (
                  <button
                    disabled
                    className="flex h-10 w-10 cursor-default items-center justify-center rounded-md text-[#09090B] dark:text-gray-300"
                  >
                    ...
                  </button>
                )}

                {/* PAGE + 4 */}
                {page + 4 <= totalPages && (
                  <button
                    onClick={() => handlePageChange(page + 4)}
                    className="flex h-10 w-10 items-center justify-center rounded-md text-[#09090B] transition hover:bg-zinc-100 dark:text-gray-200 dark:hover:bg-gray-800"
                  >
                    {page + 4}
                  </button>
                )}
              </div>

              {/* NEXT */}
              <button
                onClick={handleNext}
                disabled={page === totalPages}
                className={`flex h-10 items-center justify-center gap-1 rounded-md border border-[#E4E4E7] px-3 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800
                    ${
                      page === totalPages
                        ? "cursor-not-allowed text-gray-300 dark:text-gray-700"
                        : "cursor-pointer text-[#09090B] hover:bg-zinc-100 dark:text-gray-200 dark:hover:bg-gray-800"
                    }
                  `}
              >
                <span className="font-inter text-[14px] font-medium leading-5">
                  Next
                </span>

                <span className="text-[18px] leading-none">›</span>
              </button>
            </div>
          )}
        </>
      )}

      {/* NO MOVIES */}
      {!loading && !error && movies.length === 0 && (
        <div className="flex min-h-75 items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">No movies found.</p>
        </div>
      )}
    </section>
  );
};

export default Popular;
