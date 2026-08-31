"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import StarLogo from "../Icons/StarLogo";
import ChevronrightLogo from "../Icons/ChevronrightLogo";
import PlayLogo from "../Icons/PlayLogo";

import Upcoming from "./Upcoming";
import TopRated from "./TopRated";
import Popular from "./Popular";

import { SectionSkeleton } from "./Skeleton";

const API_URL =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";

const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzhmMWQ1MDg2ZWRmOTY1NzQ5NjEyODdiZDI3Y2MzZSIsIm5iZiI6MTc4NjU4NTA5MC41NTIsInN1YiI6IjZhN2QyMDAyMTVhZWU3YzFlNmI3YWNhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5kK_xecc4fk2ymkk7RxsglhtFOIlUAlTRU6TWB4Nr5c";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
};

export const HeroSection = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [trailerLoading, setTrailerLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(API_URL, options);

        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }

        const data = await response.json();

        setMovies((data.results || []).slice(0, 6));
      } catch (error) {
        console.error("Now Playing Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleNext = () => {
    if (movies.length === 0) return;

    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [movies.length]);

  const handleTrailer = async () => {
    if (!currentMovie?.id) return;

    try {
      setTrailerLoading(true);

      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${currentMovie.id}/videos?language=en-US`,
        options,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch trailer");
      }

      const data = await response.json();

      let trailer = data.results?.find(
        (video) =>
          video.site === "YouTube" &&
          video.type === "Trailer" &&
          video.official === true,
      );

      if (!trailer) {
        trailer = data.results?.find(
          (video) => video.site === "YouTube" && video.type === "Trailer",
        );
      }

      if (!trailer) {
        trailer = data.results?.find(
          (video) => video.site === "YouTube" && video.type === "Teaser",
        );
      }

      if (trailer?.key) {
        window.open(`https://www.youtube.com/watch?v=${trailer.key}`, "_blank");
      } else {
        alert("Trailer олдсонгүй.");
      }
    } catch (error) {
      console.error("Trailer Error:", error);
      alert("Trailer авахад алдаа гарлаа.");
    } finally {
      setTrailerLoading(false);
    }
  };

  const currentMovie = movies[currentIndex];

  return (
    <main className="w-full bg-white transition-colors duration-300 dark:bg-gray-950">
      {" "}
      <section className="relative h-125 w-full overflow-hidden bg-gray-300 sm:h-135 md:h-145 lg:h-160 xl:h-170 dark:bg-gray-900">
        {!loading && currentMovie?.backdrop_path && (
          <Image
            src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`}
            alt={currentMovie.title || "Movie"}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        )}

        {loading && (
          <div className="absolute inset-0 animate-pulse bg-gray-300 dark:bg-gray-800" />
        )}

        {!loading && (
          <>
            <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/55 to-black/10 md:from-black/80 md:via-black/40 md:to-transparent" />

            <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black/50 to-transparent md:h-48" />
          </>
        )}

        <div className="relative z-10 mx-auto flex h-full w-full max-w-360 items-center px-5 sm:px-8 md:px-10 lg:px-16 xl:px-20">
          <div className="-mt-4 w-full max-w-85 text-white sm:max-w-105 md:-mt-8 md:max-w-117.5 lg:max-w-125">
            {loading ? (
              <div className="animate-pulse">
                <div className="mb-3 h-5 w-28 rounded bg-white/30 sm:h-6 sm:w-32" />
                <div className="mb-4 h-10 w-11/12 rounded bg-white/30 sm:h-12 md:h-14" />
                <div className="mb-6 h-5 w-24 rounded bg-white/30" />
                <div className="mb-2 h-3.5 w-full rounded bg-white/20" />
                <div className="mb-2 h-3.5 w-11/12 rounded bg-white/20" />
                <div className="mb-6 h-3.5 w-9/12 rounded bg-white/20" />

                <div className="h-11 w-36 rounded-lg bg-white/30 sm:h-12 sm:w-40" />
              </div>
            ) : currentMovie ? (
              <>
                <p className="mb-1 text-sm sm:text-base md:text-lg">
                  Now Playing:
                </p>

                <h2 className="mb-3 line-clamp-2 text-[30px] font-bold leading-[1.1] sm:text-[36px] md:text-[42px] lg:text-[48px]">
                  {currentMovie.title}
                </h2>

                <div className="mb-5 flex items-center gap-2 sm:mb-6 md:mb-7">
                  <StarLogo />

                  <span className="text-base font-semibold sm:text-lg md:text-[19px]">
                    {currentMovie.vote_average?.toFixed(1)}
                  </span>

                  <span className="text-sm text-gray-300 sm:text-base md:text-[17px]">
                    /10
                  </span>
                </div>

                <p className="mb-5 line-clamp-4 text-[13px] leading-normal text-gray-200 sm:text-sm md:mb-6">
                  {currentMovie.overview}
                </p>

                <button
                  onClick={handleTrailer}
                  disabled={trailerLoading}
                  className="flex h-10 items-center gap-2 rounded-lg bg-white px-4 text-[13px] font-medium text-gray-800 transition hover:bg-gray-100 active:scale-[0.98] sm:h-11 sm:gap-3 sm:px-5 sm:text-sm md:h-12 md:text-[15px] disabled:cursor-not-allowed disabled:opacity-70 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white"
                >
                  <PlayLogo />

                  {trailerLoading ? "Loading..." : "Watch Trailer"}
                </button>
              </>
            ) : (
              <p className="text-white">Movie not found.</p>
            )}
          </div>
        </div>

        {!loading && (
          <button
            onClick={handleNext}
            disabled={movies.length === 0}
            aria-label="Next movie"
            className="absolute right-4 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-800 shadow-md transition hover:scale-105 active:scale-95 sm:right-6 sm:h-10 sm:w-10 md:right-8 md:h-11 md:w-11 lg:right-10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronrightLogo />
          </button>
        )}

        {!loading && (
          <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 sm:bottom-6 sm:gap-2">
            {movies.map((movie, index) => (
              <button
                key={movie.id}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to movie ${index + 1}`}
                className={`h-1.5 rounded-full transition-all sm:h-2 ${
                  index === currentIndex
                    ? "w-6 bg-white sm:w-8"
                    : "w-1.5 bg-white/60 sm:w-2"
                }`}
              />
            ))}
          </div>
        )}
      </section>
      <div className="w-full bg-white transition-colors duration-300 dark:bg-gray-950">
        {loading ? (
          <>
            <SectionSkeleton />
            <SectionSkeleton />
            <SectionSkeleton />
          </>
        ) : (
          <>
            <Upcoming />
            <Popular />
            <TopRated />
          </>
        )}
      </div>
    </main>
  );
};

export default HeroSection;
