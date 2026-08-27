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

  // GET MOVIE DETAILS
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

        console.log("Movie ID:", id);
        console.log("Movie data:", data);

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

  // GO TO POPULAR
  const goToPopular = () => {
    router.push("/popular");
  };

  // GO TO MOVIE
  const goToMovie = (movieId) => {
    router.push(`/movie/${movieId}`);
  };

  // GO TO SIMILAR
  const goToSimilar = () => {
    router.push(`/movie/${id}/similar`);
  };

  // LOADING
  if (loading) {
    return (
      <main className="min-h-screen bg-white transition-colors duration-300 dark:bg-gray-950">
        <div className="mx-auto max-w-275 px-6 py-10">
          <div className="h-10 w-60 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

          <div className="mt-8 grid grid-cols-1 gap-7 md:grid-cols-[250px_1fr]">
            <div className="aspect-2/3 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />

            <div className="aspect-video animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
          </div>

          <div className="mt-8 h-20 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
        </div>
      </main>
    );
  }

  // ERROR
  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-white transition-colors duration-300 dark:bg-gray-950">
        <p className="mb-5 text-center text-red-500">{error}</p>

        <button
          onClick={goToPopular}
          className="
            rounded-lg
            bg-black
            px-5 py-3
            text-sm font-medium text-white
            transition
            hover:bg-gray-800

            dark:bg-white
            dark:text-black
            dark:hover:bg-gray-200
          "
        >
          Back to Popular
        </button>
      </main>
    );
  }

  // MOVIE NOT FOUND
  if (!movie) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-white transition-colors duration-300 dark:bg-gray-950">
        <p className="mb-5 text-gray-500 dark:text-gray-400">Movie not found</p>

        <button
          onClick={goToPopular}
          className="
            rounded-lg
            bg-black
            px-5 py-3
            text-sm font-medium text-white
            transition
            hover:bg-gray-800

            dark:bg-white
            dark:text-black
            dark:hover:bg-gray-200
          "
        >
          Back to Popular
        </button>
      </main>
    );
  }

  // INFORMATION
  const year = movie.release_date ? movie.release_date.substring(0, 4) : "0";

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

  // RATING COUNT
  const voteCount = movie.vote_count
    ? movie.vote_count >= 1000
      ? `${(movie.vote_count / 1000).toFixed(0)}k`
      : movie.vote_count
    : "0";

  return (
    <main
      className="
        min-h-screen
        bg-white
        text-gray-900
        transition-colors duration-300

        dark:bg-gray-950
        dark:text-white
      "
    >
      <div className="mx-auto max-w-275 px-6 py-7 md:py-10">
        {/* BACK BUTTON */}
        <button
          onClick={() => router.back()}
          className="
            mb-6 flex items-center gap-2
            text-sm font-medium
            text-gray-600
            transition
            hover:text-black

            dark:text-gray-400
            dark:hover:text-white
          "
        >
          <span className="text-lg">←</span>
          Back
        </button>

        {/* TITLE + RATING */}
        <div className="mb-6 flex items-start justify-between gap-5">
          <div>
            <h1 className="text-[30px] font-bold leading-tight md:text-[34px]">
              {movie.title}
            </h1>

            <div className="mt-1 text-[15px] text-gray-700 dark:text-gray-400">
              {movie.release_date || year}

              <span className="mx-2">•</span>

              <span>{certification}</span>

              <span className="mx-2">•</span>

              <span>{runtime}</span>
            </div>
          </div>

          {/* RATING */}
          <div className="hidden text-right sm:block">
            <p className="text-xs text-gray-600 dark:text-gray-400">Rating</p>

            <div className="mt-1 flex items-center justify-end">
              <span className="mr-1 text-[27px] leading-none text-yellow-400">
                ★
              </span>

              <span className="text-[17px] font-semibold">
                {movie.vote_average?.toFixed(1)}
              </span>

              <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                /10
              </span>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-500">
              {voteCount}
            </p>
          </div>
        </div>

        {/* POSTER + BACKDROP */}
        <div className="grid grid-cols-1 gap-7 md:grid-cols-[250px_1fr]">
          {/* POSTER */}
          <div className="relative aspect-2/3 overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800">
            {movie.poster_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title || "Movie poster"}
                fill
                sizes="250px"
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-500 dark:text-gray-400">
                No Image
              </div>
            )}
          </div>

          {/* BACKDROP */}
          <div className="relative min-h-75 overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800 md:min-h-0">
            {movie.backdrop_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title || "Movie backdrop"}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-500 dark:text-gray-400">
                No Backdrop
              </div>
            )}

            <div className="absolute inset-0 bg-black/10" />

            {/* PLAY TRAILER */}
            {trailer && (
              <button
                onClick={() => setShowTrailer(true)}
                className="
                  absolute bottom-5 left-5
                  flex items-center gap-3
                  text-white
                  transition
                  hover:scale-[1.02]
                "
              >
                <span
                  className="
                    flex h-10 w-10
                    items-center justify-center
                    rounded-full
                    bg-white
                    text-black
                    shadow-lg
                  "
                >
                  ▶
                </span>

                <span className="text-sm font-medium">Play trailer</span>
              </button>
            )}
          </div>
        </div>

        {/* GENRES */}
        {movie.genres?.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="
                  rounded-full
                  border
                  border-gray-300
                  px-3 py-1
                  text-xs font-medium

                  dark:border-gray-600
                  dark:bg-gray-900
                  dark:text-gray-200
                "
              >
                {genre.name}
              </span>
            ))}
          </div>
        )}

        {/* OVERVIEW */}
        <p className="mt-5 max-w-262.5 text-[15px] leading-6 text-gray-800 dark:text-gray-300">
          {movie.overview || "No overview available."}
        </p>

        {/* DIRECTOR / WRITERS / STARS */}
        <div className="mt-5">
          {/* DIRECTOR */}
          <div className="grid grid-cols-[90px_1fr] border-b border-gray-200 py-4 dark:border-gray-800">
            <span className="font-semibold">Director</span>

            <span className="text-gray-800 dark:text-gray-300">
              {director?.name || "N/A"}
            </span>
          </div>

          {/* WRITERS */}
          <div className="grid grid-cols-[90px_1fr] border-b border-gray-200 py-4 dark:border-gray-800">
            <span className="font-semibold">Writers</span>

            <span className="text-gray-800 dark:text-gray-300">
              {writers.length > 0
                ? writers.map((writer, index) => (
                    <span key={`${writer.id}-${index}`}>
                      {writer.name}

                      {index < writers.length - 1 && (
                        <span className="mx-2">·</span>
                      )}
                    </span>
                  ))
                : "N/A"}
            </span>
          </div>

          {/* STARS */}
          <div className="grid grid-cols-[90px_1fr] border-b border-gray-200 py-4 dark:border-gray-800">
            <span className="font-semibold">Stars</span>

            <span className="text-gray-800 dark:text-gray-300">
              {stars.length > 0
                ? stars.map((star, index) => (
                    <span key={`${star.id}-${index}`}>
                      {star.name}

                      {index < stars.length - 1 && (
                        <span className="mx-2">·</span>
                      )}
                    </span>
                  ))
                : "N/A"}
            </span>
          </div>
        </div>

        {/* MORE LIKE THIS */}
        {recommendations.length > 0 && (
          <section className="mt-8 pb-12">
            {/* HEADER */}
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold">More like this</h2>

              {/* SEE MORE */}
              <button
                type="button"
                onClick={goToSimilar}
                className="
                  flex items-center gap-2
                  text-sm font-medium
                  text-gray-700
                  transition
                  hover:text-gray-950
                  hover:underline

                  dark:text-gray-300
                  dark:hover:text-white
                "
              >
                See more
                <span className="text-lg">→</span>
              </button>
            </div>

            {/* CARDS */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
              {recommendations.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => goToMovie(item.id)}
                  className="
                    group overflow-hidden
                    rounded-lg
                    bg-gray-100
                    text-left
                    transition
                    hover:-translate-y-1
                    hover:shadow-lg

                    dark:bg-gray-900
                  "
                >
                  {/* POSTER */}
                  <div className="relative aspect-2/3 overflow-hidden">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt={item.title || "Movie poster"}
                      fill
                      sizes="(max-width: 768px) 50vw, 180px"
                      className="
                        object-cover
                        transition
                        duration-300
                        group-hover:scale-105
                      "
                    />
                  </div>

                  {/* CARD INFO */}
                  <div className="px-2 py-2">
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-yellow-400">★</span>

                      <span className="font-medium">
                        {item.vote_average?.toFixed(1)}
                      </span>

                      <span className="text-gray-500 dark:text-gray-400">
                        /10
                      </span>
                    </div>

                    <p className="mt-1 line-clamp-2 text-sm font-medium text-gray-900 dark:text-white">
                      {item.title}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* TRAILER MODAL */}
      {showTrailer && trailer && (
        <div
          className="
            fixed inset-0 z-9999
            flex items-center justify-center
            bg-black/60
            px-4
          "
          onClick={() => setShowTrailer(false)}
        >
          <div
            className="
              relative w-full max-w-225
              overflow-hidden
              rounded-lg
              bg-black
              shadow-2xl
            "
            onClick={(event) => event.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className="flex h-12 items-center justify-between bg-black px-4">
              <h2 className="text-sm font-medium text-white md:text-base">
                {movie.title}: Trailer
              </h2>

              {/* CLOSE */}
              <button
                type="button"
                onClick={() => setShowTrailer(false)}
                className="
                  flex h-7 w-7
                  items-center justify-center
                  rounded-full
                  text-xl leading-none
                  text-white
                  transition
                  hover:bg-white/20
                "
                aria-label="Close trailer"
              >
                ×
              </button>
            </div>

            {/* YOUTUBE VIDEO */}
            <div className="relative aspect-video w-full bg-black">
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



















