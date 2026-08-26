"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import VectorLogo from "../Icons/VectorLogo";
import ChevrondownLogo from "../Icons/ChevrondownLogo";
import SearchLogo from "../Icons/SearchLogo";
import MoonLogo from "../Icons/MoonLogo";

const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzhmMWQ1MDg2ZWRmOTY1NzQ5NjEyODdiZDI3Y2MzZSIsIm5iZiI6MTc4NjU4NTA5MC41NTIsInN1YiI6IjZhN2QyMDAyMTVhZWU3YzFlNmI3YWNhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5kK_xecc4fk2ymkk7RxsglhtFOIlUAlTRU6TWB4Nr5c";

const headerGenres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 53, name: "Thriller" },
];

export const Header = () => {
  const router = useRouter();
  const searchRef = useRef(null);

  const [genreOpen, setGenreOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loading, setLoading] = useState(false);

// SEARCH
  useEffect(() => {
    const value = searchValue.trim();

    if (!value) {
      setSearchResults([]);
      setSearchOpen(false);
      setLoading(false);
      return;
    }

    if (!TOKEN) {
      console.error("TMDB TOKEN NOT FOUND");
      setSearchResults([]);
      setLoading(false);
      return;
    }

    setSearchOpen(true);
    setLoading(true);

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            value
          )}&language=en-US&page=1`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${TOKEN}`,
            },
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          const errorText = await response.text();

          console.error("TMDB SEARCH ERROR:", {
            status: response.status,
            statusText: response.statusText,
            body: errorText,
          });

          throw new Error(`Search failed: ${response.status}`);
        }

        const data = await response.json();

        setSearchResults((data.results || []).slice(0, 5));
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Search error:", error);
          setSearchResults([]);
        }
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [searchValue]);

// CLICK OUTSIDE
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

// SEARCH PAGE
  const handleSearch = () => {
    const value = searchValue.trim();

    if (!value) return;

    setSearchOpen(false);

    router.push(`/search/${encodeURIComponent(value)}`);
  };

// MOVIE DETIAL
  const handleMovieClick = (movieId) => {
    setSearchOpen(false);

    router.push(`/movie/${movieId}`);
  };

// GENRE
  const handleHeaderGenre = (genreId) => {
    setGenreOpen(false);

    router.push(`/genre/${genreId}`);
  };

  return (
    <header className="relative z-100 h-20 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-full max-w-360 items-center justify-between px-6 md:px-10">

        {/* LOGO */}
        <button
          type="button"
          onClick={() => router.push("/")}
          className="flex items-center gap-2"
        >
          <VectorLogo />

          <span className="text-[20px] font-semibold text-[#4F46E5]">
            Movie Z
          </span>
        </button>

        {/* CENTER */}
        <div className="flex items-center gap-3">

          {/* GENRE */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setGenreOpen((prev) => !prev);
                setSearchOpen(false);
              }}
              className={`flex h-8.5 w-28 items-center justify-center gap-3 rounded-lg border bg-white text-[14px] font-medium transition ${
                genreOpen
                  ? "border-gray-300 shadow-sm"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <ChevrondownLogo
                className={`transition-transform duration-200 ${
                  genreOpen ? "rotate-180" : ""
                }`}
              />

              <span>Genre</span>
            </button>

            {genreOpen && (
              <div
                className="
                  absolute
                  left-0
                  top-9
                  z-200
                  w-160
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  p-4
                  shadow-[0_8px_30px_rgba(0,0,0,0.12)]
                "
              >
                {/* TITLE */}
                <div>
                  <h2 className="text-[14px] font-semibold leading-tight text-gray-900">
                    Genres
                  </h2>

                  <p className="mt-1 text-[14px] text-gray-800">
                    See lists of movies by genre
                  </p>
                </div>

                {/* LINE */}
                <div className="my-2 h-px w-full bg-gray-200" />

                {/* GENRES */}
                <div className="flex flex-wrap gap-x-2 gap-y-2">
                  {headerGenres.map((genre) => (
                    <button
                      key={genre.id}
                      type="button"
                      onClick={() => handleHeaderGenre(genre.id)}
                      className="
                        group
                        flex
                        h-7
                        items-center
                        gap-3
                        rounded-full
                        border
                        border-gray-300
                        bg-white
                        px-3
                        text-[12px]
                        font-medium
                        text-gray-900
                        transition
                        hover:border-gray-500
                        hover:bg-gray-50
                      "
                    >
                      <span>{genre.name}</span>

                      <span className="text-[20px] font-normal leading-none text-gray-700 transition-transform duration-200 group-hover:translate-x-0.5">
                        ›
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SEARCH */}
          <div ref={searchRef} className="relative">

            {/* INPUT */}
            <div
              className={`flex h-8.5 w-180 items-center justify-center gap-3 rounded-lg border bg-white text-[14px] font-medium transition ${
                searchOpen
                  ? "border-gray-300 shadow-sm"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <SearchLogo className="mx-4" />

              <input
                type="text"
                value={searchValue}
                placeholder="Search"
                autoComplete="off"
                onChange={(event) => {
                  setSearchValue(event.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => {
                  if (searchValue.trim()) {
                    setSearchOpen(true);
                  }
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSearch();
                  }

                  if (event.key === "Escape") {
                    setSearchOpen(false);
                  }
                }}
                className="
                  ml-2
                  h-full
                  w-full
                  bg-transparent
                  text-[12px]
                  text-gray-800
                  outline-none
                  placeholder:text-gray-400
                "
              />
            </div>

            {/* DROPDOWN */}
            {searchOpen && searchValue.trim() && (
              <div
                className="
                  absolute
                  right-0
                  top-10.5
                  z-300
                  w-180
                  overflow-hidden
                  rounded-lg
                  border
                  border-gray-200
                  bg-white
                  shadow-[0_8px_30px_rgba(0,0,0,0.12)]
                "
              >
                {/* LOADING */}
                {loading ? (
                  <div className="flex h-20 items-center justify-center">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-200 border-t-gray-600" />
                  </div>
                ) : searchResults.length === 0 ? (
                  /* NO RESULTS */
                  <div className="flex h-17.5 items-center justify-center text-[12px] text-gray-500">
                    No results found.
                  </div>
                ) : (
                  /* RESULTS */
                  <div>
                    {searchResults.map((movie) => (
                      <button
                        key={movie.id}
                        type="button"
                        onClick={() => handleMovieClick(movie.id)}
                        className="
                          flex
                          w-full
                          items-center
                          gap-3
                          border-b
                          border-gray-100
                          px-3
                          py-2.5
                          text-left
                          transition
                          hover:bg-gray-50
                        "
                      >
                        {/* POSTER */}
                        <div className="h-13.75 w-10 shrink-0 overflow-hidden rounded">
                          {movie.poster_path ? (
                            <img
                              src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                              alt={movie.title || "Movie poster"}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center bg-gray-200 text-[8px] text-gray-400">
                              No image
                            </div>
                          )}
                        </div>

                        {/* INFO */}
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[12px] font-medium text-gray-900">
                            {movie.title}
                          </p>

                          <div className="mt-1 flex items-center gap-2">
                            <span className="text-[11px] text-yellow-400">
                              ★
                            </span>

                            <span className="text-[10px] text-gray-500">
                              {movie.vote_average
                                ? movie.vote_average.toFixed(1)
                                : "0.0"}
                            </span>

                            <span className="text-[10px] text-gray-300">
                              •
                            </span>

                            <span className="text-[10px] text-gray-500">
                              {movie.release_date
                                ? movie.release_date.slice(0, 4)
                                : "N/A"}
                            </span>
                          </div>
                        </div>

                        <span className="text-[15px] text-gray-400">
                          ›
                        </span>
                      </button>
                    ))}

                    {/* SEE MORE */}
                    <button
                      type="button"
                      onClick={handleSearch}
                      className="
                        flex
                        w-full
                        items-center
                        justify-end
                        gap-1
                        px-4
                        py-3
                        text-[10px]
                        text-gray-600
                        hover:bg-gray-50
                      "
                    >
                      See more
                      <span>→</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* MOON */}
        <button
          type="button"
          className="
            flex
            h-8.5
            w-8.5
            items-center
            justify-center
            rounded-md
            border
            border-gray-200
            hover:bg-gray-50
          "
        >
          <MoonLogo />
        </button>
      </div>
    </header>
  );
};