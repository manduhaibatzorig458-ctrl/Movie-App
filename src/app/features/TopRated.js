"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

import StarLogo from "../Icons/StarLogo";
import ArrowrightLogo from "../Icons/ArrowrightLogo";

const url =
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

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

export const TopRated = () => {
  const router = useRouter();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetch(url, options);

        const data = await response.json();

        console.log("TOP RATED STATUS:", response.status);
        console.log("TOP RATED DATA:", data);

        if (!response.ok) {
          throw Error(
            data.status_message || `TMDB Error: ${response.status}`,
          );
        }

        setMovies(data.results.slice(0, 10));
      } catch (error) {
        console.error("TOP RATED ERROR:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  // See more
  const navigateToTopRatedPage = () => {
    router.push("/TopRated");
  };

  // Movie detail
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
          Top Rated
        </h2>

        <button
          className="flex items-center gap-2 text-sm text-[#4338ca] hover:underline"
          onClick={navigateToTopRatedPage}
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
              onClick={()=> handleMovieClick(movie.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default TopRated;