"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import StarLogo from "../Icons/StarLogo";
import ChevronrightLogo from "../Icons/ChevronrightLogo";
import PlayLogo from "../Icons/PlayLogo";

import Upcoming from "./Upcoming";
import Popular from "./Popular";
import TopRated from "./TopRated";

const API_URL =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzhmMWQ1MDg2ZWRmOTY1NzQ5NjEyODdiZDI3Y2MzZSIsIm5iZiI6MTc4NjU4NTA5MC41NTIsInN1YiI6IjZhN2QyMDAyMTVhZWU3YzFlNmI3YWNhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5kK_xecc4fk2ymkk7RxsglhtFOIlUAlTRU6TWB4Nr5c`,
  },
};

export const HeroSection = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(API_URL, options);

        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }

        const data = await response.json();

        // Эхний 3 кино ашиглана
        setMovies(data.results.slice(0, 3));
      } catch (error) {
        console.error("Now Playing Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // NEXT MOVIE
  const handleNext = () => {
    if (movies.length === 0) return;

    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  // CURRENT MOVIE
  const currentMovie = movies[currentIndex];

  return (
    <main className="w-full">
      {/*HERO*/}

      <section className="relative h-160 w-full overflow-hidden bg-gray-300">
        {/*BACKGROUND IMAGE*/}

        {currentMovie?.backdrop_path && (
          <Image
            src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`}
            alt={currentMovie.title}
            fill
            priority
            className="object-cover"
          />
        )}

        {/*DARK GRADIENT*/}

        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" />

        <div className="absolute inset-0 bg-black/10" />

        {/*HERO CONTENT*/}

        <div className="relative z-10 mx-auto flex h-full max-w-360 items-center px-16">
          <div className="-mt-5 w-97.5 text-white">



             {/* tailbar */}



          </div>
        </div>

        {/*RIGHT ARROW*/}

        <button
          onClick={handleNext}
          disabled={movies.length === 0}
          className="absolute right-10 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-800 shadow-md transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronrightLogo />
        </button>

        {/*DOTS*/}

        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
          {movies.map((movie, index) => (
            <button
              key={movie.id}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? "w-8 bg-white" : "w-2 bg-white/60"
              }`}
            />
          ))}
        </div>
      </section>

      {/*MOVIES*/}

      <Upcoming />

      <Popular />

      <TopRated />
    </main>
  );
};

export default HeroSection;
