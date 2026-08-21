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

// =====================================================
// MOVIE CARD
// =====================================================

const MovieCard = ({ movie, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-full cursor-pointer overflow-hidden rounded-lg bg-[#f4f4f4] transition duration-200 hover:scale-[1.02]"
    >
      {/* Poster */}
      <div className="aspect-2/3 w-full overflow-hidden bg-gray-200">
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

      {/* Movie information */}
      <div className="min-h-25 bg-[#f4f4f4] px-2.5 pb-3.75 pt-3.5">
        {/* Rating */}
        <div className="mb-2 flex items-center text-[14px] text-gray-700">
          <StarLogo />

          <span className="ml-1">
            {movie.vote_average
              ? movie.vote_average.toFixed(1)
              : "N/A"}
          </span>

          <span className="ml-1 text-gray-500">
            /10
          </span>
        </div>

        {/* Title */}
        <h3 className="m-0 text-[19px] font-normal leading-[1.4] text-[#151515]">
          {movie.title}
        </h3>
      </div>
    </div>
  );
};

// =====================================================
// POPULAR COMPONENT
// =====================================================

export const Popular = ({ showSeeMore = true }) => {
  const router = useRouter();

  // ===================================================
  // STATE
  // ===================================================

  const [movies, setMovies] = useState([]);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ===================================================
  // GET POPULAR MOVIES
  // ===================================================

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

        // API error
        if (!response.ok) {
          throw new Error(
            data.status_message ||
              "Failed to fetch popular movies"
          );
        }

        // Movies
        setMovies(data.results || []);

        // TMDB total pages
        // 500-аас их page рүү явуулахгүй
        setTotalPages(
          Math.min(data.total_pages || 1, 500)
        );
      } catch (error) {
        console.error("Popular Error:", error);

        setMovies([]);

        setError(
          error.message ||
            "Failed to fetch popular movies"
        );
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [page]);

  // ===================================================
  // SEE MORE
  // ===================================================

  const navigateToPopularPage = () => {
    router.push("/Popular");
  };

  // ===================================================
  // MOVIE DETAIL
  // ===================================================

  const handleMovieClick = (movieId) => {
    console.log("Clicked movie ID:", movieId);

    router.push(`/movie/${movieId}`);
  };

  // ===================================================
  // PAGE CHANGE
  // ===================================================

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

  // ===================================================
  // PREVIOUS
  // ===================================================

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // ===================================================
  // NEXT
  // ===================================================

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
    <section className="w-full px-17.5 pb-10">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="my-8 mb-8.75 flex items-center justify-between">
        {/* Title */}
        <h2 className="text-[28px] font-bold text-black">
          Popular
        </h2>

        {/* See More */}
        {showSeeMore && (
          <button
            onClick={navigateToPopularPage}
            className="flex items-center gap-2 text-sm text-[#4338ca] hover:underline"
          >
            <span>See more</span>

            <ArrowrightLogo />
          </button>
        )}
      </div>

      {/* =================================================
          LOADING
      ================================================= */}

      {loading && (
        <div className="flex min-h-75 items-center justify-center">
          <p className="text-gray-500">
            Loading...
          </p>
        </div>
      )}

      {/* =================================================
          ERROR
      ================================================= */}

      {!loading && error && (
        <div className="flex min-h-75 flex-col items-center justify-center gap-3">
          <p className="text-red-500">
            {error}
          </p>

          <button
            onClick={() =>
              window.location.reload()
            }
            className="rounded-md bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
          >
            Try again
          </button>
        </div>
      )}

      {/* =================================================
          MOVIES
      ================================================= */}

      {!loading &&
        !error &&
        movies.length > 0 && (
          <>
            {/* Movie Grid */}
            <div className="grid grid-cols-5 gap-x-8 gap-y-8">
              {movies
                .slice(0, 10)
                .map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onClick={() =>
                      handleMovieClick(movie.id)
                    }
                  />
                ))}
            </div>

            {/* =================================================
                PAGINATION
            ================================================= */}

            {!showSeeMore && (
              <div className="mt-8 flex h-10 items-center justify-end gap-2 text-[14px]">
                {/* =============================================
                    PREVIOUS BUTTON
                ============================================= */}

                <button
                  onClick={handlePrevious}
                  disabled={page === 1}
                  className={`flex h-10 items-center justify-center gap-1 rounded-md border border-[#E4E4E7] px-3 ${
                    page === 1
                      ? "cursor-not-allowed text-gray-300"
                      : "cursor-pointer text-[#09090B] hover:bg-zinc-100"
                  }`}
                >
                  {/* Left Arrow */}
                  <span className="text-[18px] leading-none">
                    ‹
                  </span>

                  {/* Text */}
                  <span className="font-inter font-medium text-[14px] leading-5">
                    Previous
                  </span>
                </button>

                {/* =============================================
                    PAGE NUMBERS
                ============================================= */}

                <div className="flex h-10 items-center gap-1">
                  {/* CURRENT PAGE */}

                  <button
                    onClick={() =>
                      handlePageChange(page)
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-md border border-[#E4E4E7] bg-white text-black"
                  >
                    {page}
                  </button>

                  {/* NEXT PAGE */}

                  {page + 1 <= totalPages && (
                    <button
                      onClick={() =>
                        handlePageChange(
                          page + 1
                        )
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-md text-[#09090B] hover:bg-zinc-100"
                    >
                      {page + 1}
                    </button>
                  )}

                  {/* DOTS */}

                  {page + 4 < totalPages && (
                    <button
                      disabled
                      className="flex h-10 w-10 cursor-default items-center justify-center rounded-md text-[#09090B]"
                    >
                      ...
                    </button>
                  )}

                  {/* PAGE + 4 */}

                  {page + 4 <= totalPages && (
                    <button
                      onClick={() =>
                        handlePageChange(
                          page + 4
                        )
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-md text-[#09090B] hover:bg-zinc-100"
                    >
                      {page + 4}
                    </button>
                  )}
                </div>

                {/* =============================================
                    NEXT BUTTON
                ============================================= */}

                <button
                  onClick={handleNext}
                  disabled={
                    page === totalPages
                  }
                  className={`flex h-10 items-center justify-center gap-1 rounded-md border border-[#E4E4E7] px-3 ${
                    page === totalPages
                      ? "cursor-not-allowed text-gray-300"
                      : "cursor-pointer text-[#09090B] hover:bg-zinc-100"
                  }`}
                >
                  {/* Text */}
                  <span className="font-inter font-medium text-[14px] leading-5">
                    Next
                  </span>

                  {/* Right Arrow */}
                  <span className="text-[18px] leading-none">
                    ›
                  </span>
                </button>
              </div>
            )}
          </>
        )}

      {/* =================================================
          NO MOVIES
      ================================================= */}

      {!loading &&
        !error &&
        movies.length === 0 && (
          <div className="flex min-h-75 items-center justify-center">
            <p className="text-gray-500">
              No movies found.
            </p>
          </div>
        )}
    </section>
  );
};

export default Popular;


