"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

import StarLogo from "../Icons/StarLogo";
import ArrowrightLogo from "../Icons/ArrowrightLogo";

const url =
  "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer YOUR_TMDB_BEARER_TOKEN`,
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

          <span>
            {movie.vote_average?.toFixed(1)}
          </span>

          <span className="text-gray-500">
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

export const Upcoming = () => {
  const router = useRouter();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // GET UPCOMING MOVIES
  // =========================
  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(url, options);

        const data = await response.json();

        console.log(
          "Upcoming status:",
          response.status
        );

        console.log(
          "Upcoming response:",
          data
        );

        if (!response.ok) {
          throw new Error(
            data.status_message ||
              "Failed to fetch upcoming movies"
          );
        }

        setMovies(data.results.slice(0, 10));
      } catch (error) {
        console.error(
          "Upcoming Error:",
          error
        );

        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  // =========================
  // SEE MORE
  // =========================
  const navigateToUpcomingPage = () => {
    router.push("/Upcoming");
  };

  // =========================
  // MOVIE DETAIL
  // =========================
  const navigateToMovieDetail = (movieId) => {
    router.push(`/movie/${movieId}`);
  };

  const handleMovieClick = (id) => {
    router.push(`/movie/${id}`);
  }
  return (
    <section className="w-full px-17.5 pb-10">

      {/* Header */}
      <div className="my-8 mb-8.75 flex items-center justify-between">

        <h2 className="text-[28px] font-bold text-black">
          Upcoming
        </h2>

        <button
          className="flex items-center gap-2 text-sm text-[#4338ca] hover:underline"
          onClick={navigateToUpcomingPage}
        >
          See more

          <ArrowrightLogo />
        </button>

      </div>

      {/* Loading */}
      {loading && (
        <p className="text-gray-500">
          Loading...
        </p>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-500">
          {error}
        </p>
      )}

      {/* Movies */}
      {!loading && !error && (
        <div className="grid grid-cols-5 gap-x-8 gap-y-8">

          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() =>
                handleMovieClick(movie.id)
              }
            />
          ))}

        </div>
      )}

    </section>
  );
};

export default Upcoming;