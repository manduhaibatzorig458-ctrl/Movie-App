"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzhmMWQ1MDg2ZWRmOTY1NzQ5NjEyODdiZDI3Y2MzZSIsIm5iZiI6MTc4NjU4NTA5MC41NTIsInN1YiI6IjZhN2QyMDAyMTVhZWU3YzFlNmI3YWNhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5kK_xecc4fk2ymkk7RxsglhtFOIlUAlTRU6TWB4Nr5c",
  },
};

export default function MovieDetails() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id;

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    if (!id) return;

    const getMovie = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US&append_to_response=credits,videos,recommendations,release_dates`,
          options,
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.status_message || `Failed to fetch movie: ${response.status}`,
          );
        }

        setMovie(data);
      } catch (error) {
        console.error("Movie error:", error);

        setError(
          error instanceof Error ? error.message : "Something went wrong",
        );
      } finally {
        setLoading(false);
      }
    };

    getMovie();
  }, [id]);

  // NAVIGATION
  const goToMovie = (movieId) => {
    router.push(`/movie/${movieId}`);
  };

  const goToSimilar = () => {
    router.push(`/movie/${id}/similar`);
  };

  const goToGenre = (genreId) => {
    router.push(`/genre/${genreId}`);
  };

  // LOADING
  if (loading) {
    return (
      <main className="min-h-screen bg-[#f8f8f8] dark:bg-[#111111]">
        <section className="mx-auto w-full max-w-300 px-4 pb-5 pt-7 md:px-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="h-8 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

              <div className="mt-3 h-4 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
            </div>

            <div className="h-12 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          </div>
        </section>

        <section className="mx-auto w-full max-w-300 px-4 md:px-8">
          <div className="flex gap-4 md:gap-5">
            <div className="hidden h-70 w-46.25 shrink-0 animate-pulse rounded bg-gray-200 dark:bg-gray-800 md:block" />

            <div className="h-70 flex-1 animate-pulse rounded bg-gray-300 dark:bg-gray-800 md:h-105" />
          </div>
        </section>
      </main>
    );
  }

  // ERROR
  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#f8f8f8] px-5 dark:bg-[#111111]">
        <p className="mb-5 text-center text-red-500">{error}</p>

        <button
          type="button"
          onClick={() => router.push("/")}
          className="rounded-lg bg-[#4435d4] px-5 py-3 text-sm font-medium text-white"
        >
          Back to Home
        </button>
      </main>
    );
  }

  if (!movie) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#f8f8f8] px-5 dark:bg-[#111111]">
        <p className="mb-5 text-gray-500 dark:text-gray-400">Movie not found</p>

        <button
          type="button"
          onClick={() => router.push("/")}
          className="rounded-lg bg-[#4435d4] px-5 py-3 text-sm font-medium text-white"
        >
          Back to Home
        </button>
      </main>
    );
  }

  // MOVIE INFORMATION
  const year = movie.release_date ? movie.release_date.substring(0, 4) : "N/A";

  const runtimeHours = movie.runtime ? Math.floor(movie.runtime / 60) : 0;

  const runtimeMinutes = movie.runtime ? movie.runtime % 60 : 0;

  const runtime =
    movie.runtime > 0 ? `${runtimeHours}h ${runtimeMinutes}m` : "N/A";

  // CERTIFICATION
  const usRelease = movie.release_dates?.results?.find(
    (country) => country.iso_3166_1 === "US",
  );

  const certification =
    usRelease?.release_dates?.find((release) => release.certification)
      ?.certification || "NR";

  // TRAILER
  const trailer =
    movie.videos?.results?.find(
      (video) =>
        video.site === "YouTube" &&
        video.type === "Trailer" &&
        video.official === true,
    ) ||
    movie.videos?.results?.find(
      (video) => video.site === "YouTube" && video.type === "Trailer",
    ) ||
    movie.videos?.results?.find(
      (video) => video.site === "YouTube" && video.type === "Teaser",
    );

  // DIRECTOR
  const director = movie.credits?.crew?.find(
    (person) => person.job === "Director",
  );

  // WRITERS
  const writers =
    movie.credits?.crew
      ?.filter(
        (person) =>
          person.job === "Writer" ||
          person.job === "Screenplay" ||
          person.job === "Story",
      )
      ?.slice(0, 3) || [];

  // STARS
  const stars = movie.credits?.cast?.slice(0, 3) || [];

  // RECOMMENDATIONS
  const recommendations =
    movie.recommendations?.results
      ?.filter((item) => item.poster_path)
      ?.slice(0, 5) || [];

  // VOTE COUNT
  const voteCount = movie.vote_count
    ? movie.vote_count >= 1000
      ? `${(movie.vote_count / 1000).toFixed(0)}k`
      : movie.vote_count
    : "0";

  return (
    <main className="min-h-screen bg-[#f8f8f8] text-[#1f2937] transition-colors duration-300 dark:bg-[#111111] dark:text-white">
      {/*  TITLE + RATING */}
      <section className="mx-auto w-full max-w-300 px-4 pb-5 pt-7 md:px-8">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-[24px] font-bold md:text-[30px]">
              {movie.title}
            </h1>

            <div className="mt-2 text-[13px] text-gray-600 dark:text-gray-400 md:text-sm">
              {year}

              <span className="mx-1">·</span>

              {certification}

              <span className="mx-1">·</span>

              {runtime}
            </div>
          </div>

          {/* RATING */}
          <div className="shrink-0 text-right">
            <p className="mb-1 text-[10px] text-gray-500 dark:text-gray-400">
              Rating
            </p>

            <div className="flex items-center justify-end">
              <span className="mr-1 text-[25px] text-yellow-400">★</span>

              <span className="text-sm font-semibold">
                {movie.vote_average?.toFixed(1) || "0.0"}
              </span>

              <span className="text-xs text-gray-500 dark:text-gray-400">
                /10
              </span>
            </div>

            <p className="text-[11px] text-gray-400 dark:text-gray-500">
              {voteCount}
            </p>
          </div>
        </div>
      </section>

      {/* DESKTOP:
          POSTER + BACKDROP */}
      <section className="mx-auto hidden w-full max-w-300 gap-5 px-4 md:flex md:px-8">
        {/* POSTER */}
        <div className="relative h-100 w-70 shrink-0 overflow-hidden rounded-sm bg-gray-200 dark:bg-gray-800">
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title || "Movie poster"}
              fill
              sizes="185px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-gray-500 dark:text-gray-400">
              No Image
            </div>
          )}
        </div>

        {/* BACKDROP */}
        <div className="relative h-100 flex-1 overflow-hidden rounded-sm bg-black">
          {movie.backdrop_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title || "Movie backdrop"}
              fill
              priority
              sizes="(max-width: 1200px) 70vw, 900px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              No Backdrop
            </div>
          )}

          <div className="absolute inset-0 bg-black/30" />

          {trailer && (
            <button
              type="button"
              onClick={() => setShowTrailer(true)}
              className="absolute bottom-5 left-5 flex items-center gap-3 text-white transition hover:opacity-80"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm text-gray-700 shadow-lg">
                ▶
              </span>

              <span className="text-sm font-medium">Play trailer</span>
            </button>
          )}
        </div>
      </section>

      {/* MOBILE BACKDROP */}
      <section className="relative h-70 w-full overflow-hidden bg-black md:hidden">
        {movie.backdrop_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title || "Movie backdrop"}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            No Backdrop
          </div>
        )}

        <div className="absolute inset-0 bg-black/30" />

        {trailer && (
          <button
            type="button"
            onClick={() => setShowTrailer(true)}
            className="absolute bottom-5 left-4 flex items-center gap-3 text-white"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-sm text-gray-700 shadow-lg">
              ▶
            </span>

            <span className="text-sm font-medium">Play trailer</span>
          </button>
        )}
      </section>

      {/* CONTENT */}
      <section className="mx-auto w-full max-w-300 px-4 py-6 md:px-8">
        {/* MOBILE: POSTER + INFO */}
        <div className="flex items-start gap-4 md:block">
          <div className="relative h-50 w-32.5 shrink-0 overflow-hidden rounded-sm bg-gray-200 dark:bg-gray-800 md:hidden">
            {movie.poster_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title || "Movie poster"}
                fill
                sizes="130px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                No Image
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1 md:max-w-225">
            {/* GENRES */}
            {movie.genres?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <button
                    type="button"
                    key={genre.id}
                    onClick={() => goToGenre(genre.id)}
                    className="rounded-full border border-gray-300 bg-white px-2.5 py-1 text-[10px] text-gray-700 transition hover:border-[#4435d4] hover:text-[#4435d4] dark:border-gray-600 dark:bg-[#1e1e1e] dark:text-gray-200 md:text-[11px]"
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
            )}

            {/* OVERVIEW */}
            <p className="mt-4 text-[13px] leading-6 text-gray-700 dark:text-gray-300 md:max-w-212.5 md:text-[15px]">
              {movie.overview || "No overview available."}
            </p>
          </div>
        </div>

        {/* DIRECTOR / WRITERS / STARS */}
        <section className="mt-6 max-w-225">
          <div className="grid grid-cols-[80px_1fr] border-b border-gray-300 py-4 dark:border-gray-700 md:grid-cols-[95px_1fr]">
            <span className="text-[13px] font-semibold md:text-sm">
              Director
            </span>

            <span className="text-[13px] text-gray-600 dark:text-gray-300 md:text-sm">
              {director?.name || "N/A"}
            </span>
          </div>

          <div className="grid grid-cols-[80px_1fr] border-b border-gray-300 py-4 dark:border-gray-700 md:grid-cols-[95px_1fr]">
            <span className="text-[13px] font-semibold md:text-sm">
              Writers
            </span>

            <span className="text-[13px] leading-5 text-gray-600 dark:text-gray-300 md:text-sm">
              {writers.length > 0
                ? writers.map((writer, index) => (
                    <span key={`${writer.id}-${index}`}>
                      {writer.name}

                      {index < writers.length - 1 && (
                        <span className="mx-1">·</span>
                      )}
                    </span>
                  ))
                : "N/A"}
            </span>
          </div>

          <div className="grid grid-cols-[80px_1fr] border-b border-gray-300 py-4 dark:border-gray-700 md:grid-cols-[95px_1fr]">
            <span className="text-[13px] font-semibold md:text-sm">Stars</span>

            <span className="text-[13px] leading-5 text-gray-600 dark:text-gray-300 md:text-sm">
              {stars.length > 0
                ? stars.map((star, index) => (
                    <span key={`${star.id}-${index}`}>
                      {star.name}

                      {index < stars.length - 1 && (
                        <span className="mx-1">·</span>
                      )}
                    </span>
                  ))
                : "N/A"}
            </span>
          </div>
        </section>

        {/* MORE LIKE THIS */}
        {recommendations.length > 0 && (
          <section className="mt-8 pb-5">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-[20px] font-bold md:text-[21px]">
                More like this
              </h2>

              <button
                type="button"
                onClick={goToSimilar}
                className="flex items-center gap-2 text-[12px] text-gray-700 transition hover:text-[#4435d4] dark:text-gray-300 dark:hover:text-[#8b7cff]"
              >
                See more
                <span className="text-lg">→</span>
              </button>
            </div>

            {/* MOBILE = 2
                DESKTOP = 5 */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
              {recommendations.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => goToMovie(item.id)}
                  className="overflow-hidden rounded-md bg-[#eeeeee] text-left transition hover:-translate-y-1 hover:shadow-md dark:bg-[#1e1e1e]"
                >
                  <div className="relative aspect-2/3 overflow-hidden">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt={item.title || "Movie poster"}
                      fill
                      sizes="(max-width: 767px) 50vw, 200px"
                      className="object-cover"
                    />
                  </div>

                  <div className="p-2">
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-yellow-400">★</span>

                      <span className="text-xs font-medium">
                        {item.vote_average?.toFixed(1) || "0.0"}
                      </span>

                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        /10
                      </span>
                    </div>

                    <p className="mt-1 line-clamp-2 text-[12px] text-gray-700 dark:text-gray-200">
                      {item.title}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}
      </section>

      {/* TRIALER MODAL */}
      {showTrailer && trailer && (
        <div
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black/70 px-4"
          onClick={() => setShowTrailer(false)}
        >
          <div
            className="relative w-full max-w-225 overflow-hidden rounded-lg bg-black"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3">
              <h2 className="text-sm font-medium text-white">
                {movie.title} Trailer
              </h2>

              <button
                type="button"
                onClick={() => setShowTrailer(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-xl text-white transition hover:bg-white/20"
                aria-label="Close trailer"
              >
                ×
              </button>
            </div>

            <div className="relative aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0`}
                title={`${movie.title} Trailer`}
                className="absolute inset-0 h-full w-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
