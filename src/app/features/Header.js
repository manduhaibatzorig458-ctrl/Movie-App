"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import VectorLogo from "../Icons/VectorLogo";
import ChevrondownLogo from "../Icons/ChevrondownLogo";
import SearchLogo from "../Icons/SearchLogo";
import MoonLogo from "../Icons/MoonLogo";
import ChevrondownWhiteLogo from "../Icons/ChevrondownWhiteLogo"
import MoonWhiteLogo from "../Icons/MoonWhiteLogo"

const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzhmMWQ1MDg2ZWRmOTY1NzQ5NjEyODdiZDI3Y2MzZSIsIm5iZiI6MTc4NjU4NTA5MC41NTIsInN1YiI6IjZhN2QyMDAyMTVhZWU3YzFlNmI3YWNhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5kK_xecc4fk2ymkk7RxsglhtFOIlUAlTRU6TWB4Nr5c";

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
  const genreRef = useRef(null);

  const [genreOpen, setGenreOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // MOBILE SEARCH MODE
  const [mobileSearch, setMobileSearch] = useState(false);
  // DARK MODE
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newDark = !dark;

    setDark(newDark);

    if (newDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    const value = searchValue.trim();

    if (!value) {
      setSearchResults([]);
      setSearchOpen(false);
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
            value,
          )}&language=en-US&page=1`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${TOKEN}`,
            },
            signal: controller.signal,
          },
        );

        if (!response.ok) {
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
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }

      if (genreRef.current && !genreRef.current.contains(event.target)) {
        setGenreOpen(false);
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
    setGenreOpen(false);
    setMobileSearch(false);

    router.push(`/search/${encodeURIComponent(value)}`);
  };

  // MOVIE DETIAL
  const handleMovieClick = (movieId) => {
    setSearchOpen(false);
    setGenreOpen(false);
    setMobileSearch(false);

    router.push(`/movie/${movieId}`);
  };

  // GENRE PAGE
  const handleHeaderGenre = (genreId) => {
    setGenreOpen(false);
    setSearchOpen(false);
    setMobileSearch(false);

    router.push(`/genre/${genreId}`);
  };

  // CLOSE SEARCH
  const closeMobileSearch = () => {
    setMobileSearch(false);
    setSearchOpen(false);
    setGenreOpen(false);
    setSearchValue("");
    setSearchResults([]);
  };

  return (
    <header className="relative z-100 h-17 w-full border-b border-gray-200 bg-white transition-colors duration-300 dark:border-gray-700 dark:bg-gray-950">
      {/* NORMAL HEADER */}

      {!mobileSearch && (
        <div className="mx-auto flex h-full w-full max-w-360 items-center px-5 sm:px-6 md:px-10">
          {/* LOGO */}

          <button
            type="button"
            onClick={() => router.push("/")}
            className="flex shrink-0 items-center gap-2"
          >
            <VectorLogo />

            <span className="text-[16px] font-semibold text-[#4F46E5] sm:text-[20px]">
              Movie Z
            </span>
          </button>

          {/* RIGHT SIDE */}
          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            {/* SEARCH-GENRE-IIN URD */}

            {/* MOBILE SEARCH BUTTON */}
            <button
              type="button"
              onClick={() => {
                setMobileSearch(true);
                setGenreOpen(false);
              }}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white transition hover:bg-gray-50 lg:hidden dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
              aria-label="Open search"
            >
              <SearchLogo />
            </button>

            {/* DESKTOP SEARCH */}
            <div ref={searchRef} className="relative hidden lg:block">
              <div
                className={`flex h-10 w-64 items-center rounded-lg border bg-white transition xl:w-80 ${
                  searchOpen
                    ? "border-gray-300 shadow-sm dark:border-gray-600"
                    : "border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                } dark:bg-gray-900`}
              >
                <SearchLogo className="ml-4 shrink-0" />

                <input
                  type="text"
                  value={searchValue}
                  placeholder="Search"
                  autoComplete="off"
                  onChange={(event) => {
                    setSearchValue(event.target.value);
                    setSearchOpen(true);
                    setGenreOpen(false);
                  }}
                  onFocus={() => {
                    if (searchValue.trim()) {
                      setSearchOpen(true);
                    }

                    setGenreOpen(false);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleSearch();
                    }

                    if (event.key === "Escape") {
                      setSearchOpen(false);
                    }
                  }}
                  className="h-full w-full bg-transparent px-3 text-[14px] text-gray-800 outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-gray-500"
                />
              </div>

              {/* DESKTOP SEARCH RESULT */}
              {searchOpen && searchValue.trim() && (
                <SearchDropdown
                  loading={loading}
                  searchResults={searchResults}
                  handleMovieClick={handleMovieClick}
                  handleSearch={handleSearch}
                />
              )}
            </div>

            {/* GENRE-SEARCH-IIN DARAА */}
            <div ref={genreRef} className="relative hidden shrink-0 md:block">
              <button
                type="button"
                onClick={() => {
                  setGenreOpen((prev) => !prev);
                  setSearchOpen(false);
                }}
                className={`flex h-10 items-center justify-center gap-2 rounded-lg border px-4 text-[14px] font-medium transition ${
                  genreOpen
                    ? "border-gray-300 bg-white shadow-sm dark:border-gray-600 dark:bg-gray-900"
                    : "border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
                } dark:text-white`}
              >
                <span>Genre</span>

                <ChevrondownLogo
                  className={`transition-transform duration-200 ${
                    genreOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* GENRE DROPDOWN */}
              {genreOpen && (
                <div className="absolute right-0 top-12 z-300 w-[calc(100vw-32px)] max-w-160 rounded-xl border border-gray-200 bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:border-gray-700 dark:bg-gray-900">
                  <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white">
                    Genres
                  </h2>

                  <p className="mt-1 text-[13px] text-gray-500 dark:text-gray-400">
                    See lists of movies by genre
                  </p>

                  <div className="my-4 h-px w-full bg-gray-200 dark:bg-gray-700" />

                  <div className="flex max-h-[55vh] flex-wrap gap-2 overflow-y-auto">
                    {headerGenres.map((genre) => (
                      <button
                        key={genre.id}
                        type="button"
                        onClick={() => handleHeaderGenre(genre.id)}
                        className="group flex h-8 items-center gap-2 rounded-full border border-gray-300 bg-white px-3 text-[12px] font-medium text-gray-900 transition hover:border-gray-500 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                      >
                        <span>{genre.name}</span>

                        <span className="text-[17px] leading-none transition-transform duration-200 group-hover:translate-x-0.5">
                          ›
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* DARK MODE */}
            <button
              type="button"
              onClick={toggleDarkMode}
              className="flex h-9 w-9 shrink-0 items-center px-2.5 justify-centers rounded-lg border border-gray-200 bg-white transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
              aria-label="Toggle dark mode"
            >
              <MoonLogo />
            </button>
          </div>
        </div>
      )}

      {/* MOBILE SEARCH MODE = GENRE → SEARCH → X */}
      {mobileSearch && (
        <div
          ref={searchRef}
          className="relative flex h-full w-full items-center gap-3 px-4 sm:px-6"
        >
          {/* GENRE BUTTON = BACK BUTTON-IIN OROND */}
          <div ref={genreRef} className="relative shrink-0">
            <button
              type="button"
              onClick={() => {
                setGenreOpen((prev) => !prev);
                setSearchOpen(false);
              }}
              className="flex h-9 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-[13px] font-medium text-gray-800 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
            >
              <ChevrondownLogo
                className={`transition-transform duration-200 ${
                  genreOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* MOBILE GENRE DROPDOWN */}
            {genreOpen && (
              <div className="absolute left-0 top-11 z-400 w-[calc(100vw-32px)] max-w-160 rounded-xl border border-gray-200 bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:border-gray-700 dark:bg-gray-900">
                <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white">
                  Genres
                </h2>

                <p className="mt-1 text-[13px] text-gray-500 dark:text-gray-400">
                  See lists of movies by genre
                </p>

                <div className="my-4 h-px bg-gray-200 dark:bg-gray-700" />

                <div className="flex max-h-[55vh] flex-wrap gap-2 overflow-y-auto">
                  {headerGenres.map((genre) => (
                    <button
                      key={genre.id}
                      type="button"
                      onClick={() => handleHeaderGenre(genre.id)}
                      className="group flex h-8 items-center gap-2 rounded-full border border-gray-300 bg-white px-3 text-[12px] font-medium text-gray-900 transition hover:border-gray-500 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                    >
                      <span>{genre.name}</span>

                      <span className="text-[17px] leading-none transition-transform duration-200 group-hover:translate-x-0.5">
                        ›
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SEARCH INPUT*/}
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <SearchLogo className="shrink-0" />

            <input
              autoFocus
              type="text"
              value={searchValue}
              placeholder="Search"
              autoComplete="off"
              onChange={(event) => {
                setSearchValue(event.target.value);
                setSearchOpen(true);
                setGenreOpen(false);
              }}
              onFocus={() => {
                if (searchValue.trim()) {
                  setSearchOpen(true);
                }

                setGenreOpen(false);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }

                if (event.key === "Escape") {
                  closeMobileSearch();
                }
              }}
              className="h-10 min-w-0 flex-1 bg-transparent text-[14px] text-gray-900 outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-gray-500"
            />
          </div>

          {/* CLOSE BUTTON */}
          <button
            type="button"
            onClick={closeMobileSearch}
            className="flex h-9 w-9 shrink-0 items-center justify-center text-[22px] text-gray-700 transition hover:text-black dark:text-gray-300 dark:hover:text-white"
            aria-label="Close"
          >
            ×
          </button>

          {/* MOBILE SEARCH RESULT */}
          {searchOpen && searchValue.trim() && (
            <SearchDropdown
              loading={loading}
              searchResults={searchResults}
              handleMovieClick={handleMovieClick}
              handleSearch={handleSearch}
              mobile
            />
          )}
        </div>
      )}
    </header>
  );
};

/* SEARCH DROPDOWN */
const SearchDropdown = ({
  loading,
  searchResults,
  handleMovieClick,
  handleSearch,
  mobile = false,
}) => {
  return (
    <div
      className={`absolute z-500 overflow-hidden border border-gray-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:border-gray-700 dark:bg-gray-900 ${
        mobile
          ? "left-0 top-17 w-full rounded-b-xl"
          : "right-0 top-12 w-80 rounded-xl xl:w-96"
      }`}
    >
      {loading ? (
        <div className="flex h-20 items-center justify-center">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-200 border-t-gray-700 dark:border-gray-700 dark:border-t-white" />
        </div>
      ) : searchResults.length === 0 ? (
        <div className="flex h-20 items-center justify-center px-4 text-center text-[13px] text-gray-500 dark:text-gray-400">
          No results found.
        </div>
      ) : (
        <div>
          {searchResults.map((movie) => (
            <button
              key={movie.id}
              type="button"
              onClick={() => handleMovieClick(movie.id)}
              className="flex w-full min-w-0 items-center gap-3 border-b border-gray-100 px-4 py-3 text-left transition hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
            >
              {/* POSTER */}
              <div className="h-14 w-10 shrink-0 overflow-hidden rounded">
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                    alt={movie.title || "Movie poster"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-200 text-[8px] text-gray-400 dark:bg-gray-700">
                    No image
                  </div>
                )}
              </div>

              {/* MOVIE INFO */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium text-gray-900 dark:text-white">
                  {movie.title}
                </p>

                <div className="mt-1 flex items-center gap-2">
                  <span className="text-[11px] text-yellow-400">★</span>

                  <span className="text-[11px] text-gray-500 dark:text-gray-400">
                    {movie.vote_average ? movie.vote_average.toFixed(1) : "0.0"}
                  </span>

                  <span className="text-gray-300">•</span>

                  <span className="text-[11px] text-gray-500 dark:text-gray-400">
                    {movie.release_date
                      ? movie.release_date.slice(0, 4)
                      : "N/A"}
                  </span>
                </div>
              </div>

              {/* ARROW */}
              <span className="shrink-0 text-[18px] text-gray-400">›</span>
            </button>
          ))}

          {/* SEE MORE */}
          <button
            type="button"
            onClick={handleSearch}
            className="flex w-full items-center justify-end gap-2 px-4 py-3 text-[12px] text-gray-600 transition hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"
          >
            See more
            <span>→</span>
          </button>
        </div>
      )}
    </div>
  );
};
