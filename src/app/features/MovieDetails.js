"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function MovieDetail({ params }) {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${params.movieId}?language=en-US`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzhmMWQ1MDg2ZWRmOTY1NzQ5NjEyODdiZDI3Y2MzZSIsIm5iZiI6MTc4NjU4NTA5MC41NTIsInN1YiI6IjZhN2QyMDAyMTVhZWU3YzFlNmI3YWNhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5kK_xecc4fk2ymkk7RxsglhtFOIlUAlTRU6TWB4Nr5c`,
          },
        }
      );

      const data = await response.json();

      setMovie(data);
    };

    getMovie();
  }, [params.movieId]);

  if (!movie) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-300 px-6 py-8">

      {/* TITLE */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            {movie.title}
          </h1>

          <p className="mt-2">
            {movie.release_date} · PG · {movie.runtime} min
          </p>
        </div>

        {/* RATING */}
        <div>
          <p className="text-sm">Rating</p>

          <div className="flex items-center">
            <span className="text-3xl text-yellow-400">
              ★
            </span>

            <span className="text-xl font-bold">
              {movie.vote_average?.toFixed(1)}
            </span>

            <span>/10</span>
          </div>

          <p className="text-sm text-gray-500">
            {movie.vote_count}
          </p>
        </div>
      </div>

      {/* POSTER + BACKDROP */}
      <div className="mt-6 grid grid-cols-[250px_1fr] gap-7">

        {/* POSTER */}
        <div className="relative h-92.5">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        {/* BACKDROP */}
        <div className="relative h-92.5">
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            fill
            className="rounded-lg object-cover"
          />

          <button className="absolute bottom-5 left-5 rounded-full bg-white px-5 py-3">
            ▶ Play trailer
          </button>
        </div>
      </div>

      {/* GENRES */}
      <div className="mt-6 flex gap-2">
        {movie.genres?.map((genre) => (
          <span
            key={genre.id}
            className="rounded-full border px-3 py-1 text-sm"
          >
            {genre.name}
          </span>
        ))}
      </div>

      {/* DESCRIPTION */}
      <p className="mt-5 leading-6">
        {movie.overview}
      </p>

    </main>
  );
}