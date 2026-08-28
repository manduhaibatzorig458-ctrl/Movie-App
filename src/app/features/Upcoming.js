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

const MovieCard = ({ movie, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-full min-w-0 cursor-pointer overflow-hidden rounded-lg bg-[#f4f4f4] transition duration-200 hover:scale-[1.02] dark:bg-gray-900"
    >
      {" "}
      <div className="aspect-2/3 w-full overflow-hidden rounded-t-lg bg-gray-200 dark:bg-gray-800">
        <Image
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/movies/DearSanta.png"
          }
          alt={movie.title || "Movie poster"}
          width={216}
          height={324}
          sizes="(max-width: 639px) 45vw, (max-width: 767px) 30vw, (max-width: 1023px) 22vw, (max-width: 1279px) 18vw, 16vw"
          className="block h-full w-full object-cover"
        />{" "}
      </div>
      <div className="min-h-23 bg-[#f4f4f4] px-2 pb-3 pt-2.5 sm:min-h-25 sm:px-2.5 sm:pt-3 dark:bg-gray-900">
        <div className="mb-1.5 flex items-center text-[12px] text-gray-700 sm:mb-2 sm:text-[14px] dark:text-gray-300">
          <StarLogo />

          <span className="ml-1">
            {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
          </span>

          <span className="ml-1 text-gray-500 dark:text-gray-500">/10</span>
        </div>

        <h3 className="m-0 line-clamp-2 text-[14px] font-normal leading-[1.35] text-[#151515] sm:text-[16px] md:text-[17px] lg:text-[18px] dark:text-white">
          {movie.title}
        </h3>
      </div>
    </div>
  );
};

export const Upcoming = ({ showSeeMore = true }) => {
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

        const url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`;

        const response = await fetch(url, options);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.status_message || `TMDB Error: ${response.status}`,
          );
        }

        setMovies(data.results || []);
        setTotalPages(Math.min(data.total_pages || 1, 500));
      } catch (error) {
        console.error("UPCOMING ERROR:", error);

        setMovies([]);
        setError(error.message || "Failed to fetch upcoming movies");
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [page]);

  const navigateToUpcomingPage = () => {
    router.push("/Upcoming");
  };

  const handleMovieClick = (movieId) => {
    router.push(`/movie/${movieId}`);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;

    setPage(newPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePrevious = () => {
    if (page <= 1) return;

    setPage(page - 1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNext = () => {
    if (page >= totalPages) return;

    setPage(page + 1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full bg-white px-4 pb-8 transition-colors duration-300 sm:px-6 sm:pb-10 md:px-8 lg:px-10 xl:px-16 2xl:px-17.5 dark:bg-gray-950">
      <div className="mb-5 flex items-center justify-between sm:mb-6 md:mb-7 lg:mb-8">
        <h2 className="text-[22px] font-bold text-black sm:text-[24px] md:text-[26px] lg:text-[28px] dark:text-white">
          Upcoming
        </h2>

        {showSeeMore && (
          <button
            onClick={navigateToUpcomingPage}
            className="flex shrink-0 items-center gap-1.5 text-xs text-[#4338ca] transition hover:underline sm:gap-2 sm:text-sm dark:text-indigo-400"
          >
            <span>See more</span>
            <ArrowrightLogo />
          </button>
        )}
      </div>

      {loading && (
        <div className="flex min-h-60 items-center justify-center sm:min-h-75">
          <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      )}

      {!loading && error && (
        <div className="flex min-h-60 flex-col items-center justify-center gap-3 px-4 text-center sm:min-h-75">
          <p className="text-sm text-red-500 dark:text-red-400">{error}</p>

          <button
            onClick={() => window.location.reload()}
            className="rounded-md bg-black px-4 py-2 text-sm text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && movies.length > 0 && (
        <>
          <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-6 md:grid-cols-4 md:gap-x-5 md:gap-y-7 lg:grid-cols-5 lg:gap-x-6 lg:gap-y-8 xl:grid-cols-5 xl:gap-x-8 xl:gap-y-8">
            {movies.slice(0, 10).map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={() => handleMovieClick(movie.id)}
              />
            ))}
          </div>

          {!showSeeMore && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:mt-8 sm:justify-end">
              <button
                onClick={handlePrevious}
                disabled={page === 1}
                className={`flex h-9 items-center justify-center gap-1 rounded-md border border-[#E4E4E7] px-2.5 text-xs sm:h-10 sm:px-3 sm:text-sm dark:border-gray-700 ${
                  page === 1
                    ? "cursor-not-allowed text-gray-300 dark:text-gray-700"
                    : "cursor-pointer text-[#09090B] hover:bg-zinc-100 dark:text-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                <span className="text-[18px] leading-none">‹</span>
                <span className="hidden sm:inline">Previous</span>
              </button>

              <div className="flex h-9 items-center gap-0.5 sm:h-10 sm:gap-1">
                <button
                  onClick={() => handlePageChange(page)}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E4E4E7] bg-white text-xs text-black sm:h-10 sm:w-10 sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  {page}
                </button>

                {page + 1 <= totalPages && (
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    className="flex h-9 w-9 items-center justify-center rounded-md text-xs text-[#09090B] transition hover:bg-zinc-100 sm:h-10 sm:w-10 sm:text-sm dark:text-gray-200 dark:hover:bg-gray-800"
                  >
                    {page + 1}
                  </button>
                )}

                {page + 4 < totalPages && (
                  <button
                    disabled
                    className="flex h-9 w-9 cursor-default items-center justify-center rounded-md text-xs text-[#09090B] sm:h-10 sm:w-10 sm:text-sm dark:text-gray-300"
                  >
                    ...
                  </button>
                )}

                {page + 4 <= totalPages && (
                  <button
                    onClick={() => handlePageChange(page + 4)}
                    className="flex h-9 w-9 items-center justify-center rounded-md text-xs text-[#09090B] transition hover:bg-zinc-100 sm:h-10 sm:w-10 sm:text-sm dark:text-gray-200 dark:hover:bg-gray-800"
                  >
                    {page + 4}
                  </button>
                )}
              </div>

              <button
                onClick={handleNext}
                disabled={page === totalPages}
                className={`flex h-9 items-center justify-center gap-1 rounded-md border border-[#E4E4E7] px-2.5 text-xs sm:h-10 sm:px-3 sm:text-sm dark:border-gray-700 ${
                  page === totalPages
                    ? "cursor-not-allowed text-gray-300 dark:text-gray-700"
                    : "cursor-pointer text-[#09090B] hover:bg-zinc-100 dark:text-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                <span className="hidden sm:inline">Next</span>
                <span className="text-[18px] leading-none">›</span>
              </button>
            </div>
          )}
        </>
      )}

      {!loading && !error && movies.length === 0 && (
        <div className="flex min-h-60 items-center justify-center sm:min-h-75">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No movies found.
          </p>
        </div>
      )}
    </section>
  );
};

export default Upcoming;
