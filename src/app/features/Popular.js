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
      className="w-full cursor-pointer overflow-hidden rounded-lg bg-[#f4f4f4] transition duration-200 hover:scale-[1.02] dark:bg-gray-900"
    >
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
          sizes="(max-width: 639px) 45vw, (max-width: 767px) 30vw, (max-width: 1023px) 22vw, (max-width: 1279px) 18vw, 16vw"
          className="block h-full w-full object-cover"
        />{" "}
      </div>

      <div className="min-h-25 bg-[#f4f4f4] px-2.5 pb-3.75 pt-3.5 dark:bg-gray-900">
        <div className="mb-2 flex items-center text-[14px] text-gray-700 dark:text-gray-300">
          <StarLogo />

          <span className="ml-1">
            {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
          </span>

          <span className="ml-1 text-gray-500 dark:text-gray-500">/10</span>
        </div>

        <h3 className="m-0 line-clamp-2 text-[19px] font-normal leading-[1.4] text-[#151515] dark:text-white">
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

        const response = await fetch(url, options);
        const data = await response.json();

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
    <section className="w-full bg-white px-4 pb-10 transition-colors duration-300 sm:px-6 md:px-8 lg:px-10 xl:px-17.5 dark:bg-gray-950">
      {" "}
      <div className="my-8 mb-8.75 flex items-center justify-between">
        {" "}
        <h2 className="text-[28px] font-bold text-black dark:text-white">
          Popular{" "}
        </h2>
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
      {loading && (
        <div className="flex min-h-75 items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      )}
      {!loading && error && (
        <div className="flex min-h-75 flex-col items-center justify-center gap-3">
          <p className="text-red-500 dark:text-red-400">{error}</p>

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
            <div className="mt-6 flex min-h-10 flex-wrap items-center justify-center gap-1.5 sm:mt-8 sm:justify-end sm:gap-2">
              <button
                onClick={handlePrevious}
                disabled={page === 1}
                className={`flex h-9 items-center justify-center gap-1 rounded-md border border-[#E4E4E7] px-2 sm:h-10 sm:px-3 dark:border-zinc-700 ${page === 1 ? "cursor-not-allowed text-gray-300 dark:text-zinc-600" : "cursor-pointer text-[#09090B] hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-800"}`}
              >
                <span className="text-[18px] leading-none">‹</span>
                <span className="hidden text-[13px] font-medium sm:block sm:text-[14px]">
                  Previous
                </span>
              </button>

              <div className="flex h-9 items-center gap-1 sm:h-10">
                <button
                  onClick={() => handlePageChange(page)}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E4E4E7] bg-white text-sm text-black sm:h-10 sm:w-10 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                >
                  {page}
                </button>

                {page + 1 <= totalPages && (
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    className="flex h-9 w-9 items-center justify-center rounded-md text-sm text-[#09090B] hover:bg-zinc-100 sm:h-10 sm:w-10 dark:text-white dark:hover:bg-zinc-800"
                  >
                    {page + 1}
                  </button>
                )}

                {page + 4 < totalPages && (
                  <button
                    disabled
                    className="flex h-9 w-9 items-center justify-center text-sm sm:h-10 sm:w-10 dark:text-white"
                  >
                    ...
                  </button>
                )}

                {page + 4 <= totalPages && (
                  <button
                    onClick={() => handlePageChange(page + 4)}
                    className="hidden h-9 w-9 items-center justify-center rounded-md text-sm text-[#09090B] hover:bg-zinc-100 sm:flex sm:h-10 sm:w-10 dark:text-white dark:hover:bg-zinc-800"
                  >
                    {page + 4}
                  </button>
                )}
              </div>

              <button
                onClick={handleNext}
                disabled={page === totalPages}
                className={`flex h-9 items-center justify-center gap-1 rounded-md border border-[#E4E4E7] px-2 sm:h-10 sm:px-3 dark:border-zinc-700 ${page === totalPages ? "cursor-not-allowed text-gray-300 dark:text-zinc-600" : "cursor-pointer text-[#09090B] hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-800"}`}
              >
                <span className="hidden text-[13px] font-medium sm:block sm:text-[14px]">
                  Next
                </span>
                <span className="text-[18px] leading-none">›</span>
              </button>
            </div>
          )}
        </>
      )}
      {!loading && !error && movies.length === 0 && (
        <div className="flex min-h-75 items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">No movies found.</p>
        </div>
      )}
    </section>
  );
};

export default Popular;
