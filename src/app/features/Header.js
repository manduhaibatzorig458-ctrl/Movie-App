"use client";
import VectorLogo  from "../Icons/VectorLogo"
import ChevrondownLogo  from "../Icons/ChevrondownLogo"
import SearchLogo from "../Icons/SearchLogo"
import MoonLogo from "../Icons/MoonLogo"

export const Header = () => {
  return (
    <header className="h-23.5 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-full max-w-360 items-center justify-between px-10">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-6 w-6 items-center justify-center text-indigo-600">
            <VectorLogo/>
          </div>

          <h1 className="text-xl font-bold italic text-indigo-600">
            Movie Z
          </h1>
        </div>

        {/* Genre + Search */}
        <div className="flex items-center gap-3">

          {/* Genre */}
          <button className="flex h-10 items-center gap-3 rounded-lg border border-gray-200 bg-white px-5 text-sm text-gray-700 shadow-sm hover:bg-gray-50">
           <ChevrondownLogo/>
            Genre
          </button>

          {/* Search */}
          <div className="flex h-10 w-105 items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 shadow-sm">
            <SearchLogo/>
            <input
              type="text"
              placeholder="Search.."
              className="w-full bg-transparent text-base outline-none placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Theme button */}
        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm hover:bg-gray-50">
          <MoonLogo/>
        </button>

      </div>
    </header>
  );
}