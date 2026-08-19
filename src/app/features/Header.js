"use client";

import { useState } from "react";
import VectorLogo from "../Icons/VectorLogo";
import ChevrondownLogo from "../Icons/ChevrondownLogo";
import SearchLogo from "../Icons/SearchLogo";
import MoonLogo from "../Icons/MoonLogo";

export const Header = () => {
  const [genreOpen, setGenreOpen] = useState(false);

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

  return (
    <header className="h-23.5 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-full max-w-360 items-center justify-between px-10">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-6 w-6 items-center justify-center text-indigo-600">
            <VectorLogo />
          </div>

          <h1 className="text-xl font-bold italic text-indigo-600">Movie Z</h1>
        </div>

        {/* Genre + Search */}
        <div className="flex items-center gap-3">
          {/* Genre */}
          <div className="relative">
            <button
              onClick={() => setGenreOpen(!genreOpen)}
              className="flex h-10 items-center gap-3 rounded-lg border border-gray-200 bg-white px-5 text-sm text-gray-700 shadow-sm hover:bg-gray-50"
            >
              <ChevrondownLogo />
              Genre
            </button>

            {/* Genre dropdown */}
            {genreOpen && (
              <div className="absolute left-0 top-12 z-50 w-52 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => {
                      console.log(genre);
                      setGenreOpen(false);
                    }}
                    className="w-full rounded-md px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {genre}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search */}
          <div className="flex h-10 w-105 items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 shadow-sm">
            <SearchLogo />

            <input
              type="text"
              placeholder="Search.."
              className="w-full bg-transparent text-base outline-none placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Theme button */}
        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm hover:bg-gray-50">
          <MoonLogo />
        </button>
      </div>
    </header>
  );
};
   