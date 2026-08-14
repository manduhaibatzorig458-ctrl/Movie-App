"use client";

import Image from "next/image";

import StarLogo from "../Icons/StarLogo";
import ChevronrightLogo from "../Icons/ChevronrightLogo";
import PlayLogo from "../Icons/PlayLogo";

import Upcoming from "./Upcoming";
import Popular from "./Popular";
import TopRated from "./TopRated";

export const HeroSection = () => {
  return (
    <main className="w-full">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative h-160 w-full overflow-hidden">
        {/* Background Image */}
        <Image
          src="/movies/Wicked.png"
          alt="Wicked"
          fill
          priority
          className="object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/20 to-transparent" />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto flex h-full max-w-360 items-center px-16">
          <div className="-mt-5 w-97.5 text-white">
            <p className="mb-1 text-lg">Now Playing:</p>

            <h2 className="mb-3 text-[40px] font-bold leading-tight">Wicked</h2>

            {/* Rating */}
            <div className="mb-7 flex items-center gap-2">
              <StarLogo />

              <span className="text-[19px] font-semibold">6.9</span>

              <span className="text-[17px] text-gray-300">/10</span>
            </div>

            {/* Description */}
            <p className="mb-6 text-sm leading-[1.45] text-gray-200">
              Elphaba, a misunderstood young woman because of her green skin,
              and Glinda, a popular girl, become friends at Shiz University in
              the Land of Oz. After an encounter with the Wonderful Wizard of
              Oz, their friendship reaches a crossroads.
            </p>

            {/* Trailer Button */}
            <button className="flex items-center gap-3 rounded-lg bg-white px-5 py-3 text-[15px] font-medium text-gray-800 hover:bg-gray-100">
              <PlayLogo />
              Watch Trailer
            </button>
          </div>
        </div>

        {/* Right Arrow */}
        <button className="absolute right-10 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-800 shadow-md hover:scale-105">
          <ChevronrightLogo />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
          <span className="h-2 w-8 rounded-full bg-white" />

          <span className="h-2 w-2 rounded-full bg-white/60" />

          <span className="h-2 w-2 rounded-full bg-white/60" />
        </div>
      </section>

      {/* =====================================================
          MOVIES
      ===================================================== */}

      <Upcoming />

      <Popular />

      <TopRated />
    </main>
  );
};

export default HeroSection;
