"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import VectorLogo from "../Icons/VectorLogo";
import ChevrondownLogo from "../Icons/ChevrondownLogo";
import SearchLogo from "../Icons/SearchLogo";
import MoonLogo from "../Icons/MoonLogo";

export const Header = () => {
  const router = useRouter();

  const [genreOpen, setGenreOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const genres = [
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

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchValue.trim()) {
      router.push(`/search/${encodeURIComponent(searchValue.trim())}`);
    }
  };

  const handleGenre = (genreId) => {
    setGenreOpen(false);
    router.push(`/genre/${genreId}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-20 max-w-300 items-center px-4 md:px-6">
        {/* LOGO */}
        <button
          onClick={() => router.push("/")}
          className="flex shrink-0 items-center gap-2"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg">
            <VectorLogo />
          </div>

          <span className="text-[18px] font-bold tracking-tight text-gray-900">
            Movie Z
          </span>
        </button>

        {/* RIGHT */}
        <div className="ml-auto flex items-center gap-3">
          {/* GENRE */}
          <div className="relative">
            <button
              onClick={() => setGenreOpen(!genreOpen)}
              className="flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <span>Genre</span>

              <div
                className={`transition-transform duration-200 ${
                  genreOpen ? "rotate-180" : ""
                }`}
              >
                <ChevrondownLogo />
              </div>
            </button>

            {genreOpen && (
              <>
                {/* OUTSIDE CLICK */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setGenreOpen(false)}
                />

                {/* DROPDOWN */}
                <div className="absolute right-0 top-12 z-50 w-90 rounded-xl border border-gray-200 bg-white p-3 shadow-xl">
                  <div className="mb-2 px-2">
                    <p className="text-xs font-medium text-gray-400">
                      MOVIE GENRES
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-1">
                    {genres.map((genre) => (
                      <button
                        key={genre.id}
                        onClick={() => handleGenre(genre.id)}
                        className="rounded-lg px-3 py-2 text-left text-xs text-gray-700 transition hover:bg-gray-100"
                      >
                        {genre.name}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* SEARCH */}
          <div className="hidden h-10 w-180 items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 focus-within:bg-white focus-within:ring-2 sm:flex">
            <SearchLogo />

            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search..."
              className="h-full w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
            />
          </div>

          {/* MOBILE SEARCH */}
          <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white sm:hidden">
            <SearchLogo />
          </button>

          {/* DARK MODE */}
          <button
            type="button"
            onClick={() => {
              document.documentElement.classList.toggle("dark");
            }}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50"
          >
            <MoonLogo />
          </button>
        </div>
      </div>
    </header>
  );
};





