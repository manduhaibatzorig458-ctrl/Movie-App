"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import VectorLogo from "../Icons/VectorLogo";
import ChevrondownLogo from "../Icons/ChevrondownLogo";
import SearchLogo from "../Icons/SearchLogo";
import MoonLogo from "../Icons/MoonLogo";

const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzhmMWQ1MDg2ZWRmOTY1NzQ5NjEyODdiZDI3Y2MzZSIsIm5iZiI6MTc4NjU4NTA5MC41NTIsInN1YiI6IjZhN2QyMDAyMTVhZWU3YzFlNmI3YWNhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5kK_xecc4fk2ymkk7RxsglhtFOIlUAlTRU6TWB4Nr5c";

export const Header = () => {
  const router = useRouter();

  // Genre
  const [genreOpen, setGenreOpen] = useState(false);

  // Search
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "Horror",
    "Music",
    "Mystery",
    "Romance",
    "Science Fiction",
    "Thriller",
  ];

  useEffect(() => {
    if (!searchValue.trim()) {
      setSearchResults([]);
      setSearchOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setSearchOpen(true);

        const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          searchValue.trim()
        )}&language=en-US&page=1`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch search results");
        }

        const data = await response.json();

        setSearchResults(data.results || []);
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue]);

// SEARCH PAGE
  const handleSearch = () => {
    const value = searchValue.trim();

    if (!value) return;

    setSearchOpen(false);

    router.push(`/search/${encodeURIComponent(value)}`);
  };

  // MOVIE DETAIL
  const handleMovieClick = (movieId) => {
    setSearchOpen(false);
    setSearchValue("");

    router.push(`/movie/${movieId}`);
  };

// LOGO
  const handleLogoClick = () => {
    setSearchOpen(false);
    setSearchValue("");
    router.push("/");
  };

  return (
    <header className="h-23.5 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-full max-w-360 items-center justify-between px-10">
{/* LOGO */}
        <button
          onClick={handleLogoClick}
          className="flex items-center gap-3"
        >
          <div className="flex h-6 w-6 items-center justify-center text-indigo-600">
            <VectorLogo />
          </div>

          <h1 className="text-xl font-bold italic text-indigo-600">
            Movie Z
          </h1>
        </button>

{/* GENRE+SEARCH */}
        <div className="flex items-center gap-3">

{/* GENRE */}
          <div className="relative">
            <button
              onClick={() => {
                setGenreOpen(!genreOpen);
                setSearchOpen(false);
              }}
              className="flex h-10 items-center gap-3 rounded-lg border border-gray-200 bg-white px-5 text-sm text-gray-700 shadow-sm hover:bg-gray-50"
            >
              <ChevrondownLogo />
              Genre
            </button>

{/* GENRE DROPDOWN */}
            {genreOpen && (
              <div className="absolute left-0 top-12 z-50 w-52 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">

                {genres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => {
                      setGenreOpen(false);

                      router.push(
                        `/genre?name=${encodeURIComponent(genre)}`
                      );
                    }}
                    className="w-full rounded-md px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {genre}
                  </button>
                ))}

              </div>
            )}
          </div>

{/*SEARCH*/}
          <div className="relative">

{/* SEARCH INPUT*/}
            <div className="flex h-10 w-105 items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 shadow-sm">

              <SearchLogo />

              <input
                type="text"
                value={searchValue}
                placeholder="Search.."
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  setGenreOpen(false);
                }}
                onFocus={() => {
                  if (searchValue.trim()) {
                    setSearchOpen(true);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                className="w-full bg-transparent text-base outline-none placeholder:text-gray-500"
              />

{/*LOADING SPINNER*/}
              {loading && (
                <div className="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600" />
              )}
            </div>

{/*SEARCH DROPDOWN*/}
            {searchOpen && searchValue.trim() && (
              <div className="absolute left-0 top-12 z-50 w-105 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl">

{/*LOADING*/}
                {loading && (
                  <div className="flex h-24 items-center justify-center">
                    <div className="h-7 w-7 animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600" />
                  </div>
                )}

{/*SEARCH RESULT*/}
                {!loading && searchResults.length > 0 && (
                  <div>

                    {searchResults.slice(0, 5).map((movie) => (
                      <div
                        key={movie.id}
                        onClick={() => handleMovieClick(movie.id)}
                        className="flex cursor-pointer gap-3 border-b border-gray-100 px-3 py-3 transition hover:bg-gray-50"
                      >

{/*POSTER*/}
                        <div className="h-16 w-11 flex-shrink-0 overflow-hidden rounded">
                          {movie.poster_path ? (
                            <img
                              src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                              alt={movie.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gray-200 text-[8px] text-gray-500">
                              No Image
                            </div>
                          )}
                        </div>

{/*MOVIE INFORMATION*/}
                        <div className="min-w-0 flex-1">

                          <h3 className="truncate text-sm font-semibold text-gray-900">
                            {movie.title}
                          </h3>

                          <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                            <span className="text-yellow-400">
                              ★
                            </span>

                            <span>
                              {movie.vote_average
                                ? movie.vote_average.toFixed(1)
                                : "N/A"}
                            </span>
                          </div>

                          <p className="mt-1 text-xs text-gray-500">
                            {movie.release_date
                              ? movie.release_date.substring(0, 4)
                              : "N/A"}
                          </p>

                        </div>

                        {/* See more */}
                        <div className="flex items-center">
                          <span className="whitespace-nowrap text-xs text-gray-700">
                            See more →
                          </span>
                        </div>

                      </div>
                    ))}

{/*SEE ALL RESULT*/}
                    <button
                      onClick={handleSearch}
                      className="w-full border-t border-gray-200 px-4 py-3 text-left text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
                    >
                      See all results for `{searchValue}`
                    </button>

                  </div>
                )}

                {/*NO RESULTS*/}
                {!loading && searchResults.length === 0 && (
                  <div className="flex h-20 items-center justify-center text-sm text-gray-500">
                    No results found.
                  </div>
                )}

              </div>
            )}

          </div>
        </div>

{/*MOON BUTTON*/}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm hover:bg-gray-50"
        >
          <MoonLogo />
        </button>

      </div>
    </header>
  );
};