"use client";

import Image from "next/image";
import Link from "next/link";

import StarLogo from "../Icons/StarLogo";
import ChevronrightLogo from "../Icons/ChevronrightLogo";
import PlayLogo from "../Icons/PlayLogo";
import ArrowrightLogo from "../Icons/ArrowrightLogo";

/* =====================================================
   MOVIES
===================================================== */

const upcomingMovies = [
  {
    title: "Dear Santa",
    image: "/movies/DearSanta.png",
    rating: "6.9",
  },
  {
    title: "How To Train Your Dragon Live Action",
    image: "/movies/Dragon.png",
    rating: "6.9",
  },
  {
    title: "Alien Romulus",
    image: "/movies/AlienRomulus.png",
    rating: "6.9",
  },
  {
    title: "From the Ashes",
    image: "/movies/FromTheAshes.png",
    rating: "6.9",
  },
  {
    title: "Space Dogg",
    image: "/movies/SpaceDogg.png",
    rating: "6.9",
  },
  {
    title: "The Order",
    image: "/movies/TheOther.png",
    rating: "6.9",
  },
  {
    title: "Y2K",
    image: "/movies/Y2K.png",
    rating: "6.9",
  },
  {
    title: "Solo Leveling: ReAwakening",
    image: "/movies/Y2K.png",
    rating: "6.9",
  },
  {
    title: "Get Away",
    image: "/movies/GetAway.png",
    rating: "6.9",
  },
  {
    title: "Sonic the Hedgehog 3",
    image: "/movies/Sonic3.png",
    rating: "6.9",
  },
];

const popularMovies = [
  {
    title: "Deadpool & Wolverine",
    image: "/movies/DearSanta.png",
    rating: "8.0",
  },
  {
    title: "Inside Out 2",
    image: "/movies/DearSanta.png",
    rating: "7.6",
  },
  {
    title: "Despicable Me 4",
    image: "/movies/DearSanta.png",
    rating: "6.2",
  },
  {
    title: "Moana 2",
    image: "/movies/DearSanta.png",
    rating: "6.9",
  },
  {
    title: "Venom: The Last Dance",
    image: "/movies/DearSanta.png",
    rating: "6.0",
  },
  {
    title: "Gladiator II",
    image: "/movies/DearSanta.png",
    rating: "6.6",
  },
  {
    title: "Wicked",
    image: "/movies/DearSanta.png",
    rating: "7.5",
  },
  {
    title: "The Wild Robot",
    image: "/movies/DearSanta.png",
    rating: "8.2",
  },
  {
    title: "Beetlejuice Beetlejuice",
    image: "/movies/DearSanta.png",
    rating: "6.7",
  },
  {
    title: "Kung Fu Panda 4",
    image: "/movies/DearSanta.png",
    rating: "6.3",
  },
];

const topRatedMovies = [
  {
    title: "The Shawshank Redemption",
    image: "/movies/ShawshankRedemption.png",
    rating: "9.3",
  },
  {
    title: "The Godfather",
    image: "/movies/Y2K.png",
    rating: "9.2",
  },
  {
    title: "The Dark Knight",
    image: "/movies/Y2K.png",
    rating: "9.0",
  },
  {
    title: "12 Angry Men",
    image: "/movies/Y2K.png",
    rating: "9.0",
  },
  {
    title: "Schindler's List",
    image: "/movies/LordOfTheRings.png",
    rating: "9.0",
  },
  {
    title: "The Lord of the Rings",
    image: "/movies/InternStaller.png",
    rating: "8.9",
  },
  {
    title: "Pulp Fiction",
    image: "/movies/se7en.png",
    rating: "8.9",
  },
  {
    title: "Fight Club",
    image: "/movies/WonderfulLife.png",
    rating: "8.8",
  },
  {
    title: "Forrest Gump",
    image: "/movies/SevenSamurai.png",
    rating: "8.8",
  },
  {
    title: "Inception",
    image: "/movies/Lambs.png",
    rating: "8.8",
  },
];

/* =====================================================
   MOVIE CARD
===================================================== */

const MovieCard = ({ movie }) => {
  return (
    <div className="w-full overflow-hidden rounded-lg bg-[#f4f4f4]">
      <div className="aspect-2/3 w-full overflow-hidden bg-gray-200">
        <Image
          src={movie.image}
          alt={movie.title}
          width={250}
          height={350}
          className="block h-full w-full object-cover"
        />
      </div>

      <div className="min-h-25 bg-[#f4f4f4] px-2.5 pb-3.75 pt-3.5">
        <div className="mb-2 flex items-center text-[14px] text-gray-700">
          <StarLogo />

          <span>{movie.rating}</span>

          <span className="text-gray-500">/10</span>
        </div>

        <h3 className="m-0 text-[19px] font-normal leading-[1.4] text-[#151515]">
          {movie.title}
        </h3>
      </div>
    </div>
  );
};

/* =====================================================
   MOVIE SECTION
===================================================== */

const MovieSection = ({ title, movies }) => {
  return (
    <section className="w-full px-17.5 pb-10">
      <div className="my-8 mb-8.75 flex items-center justify-between">
        <h2 className="text-[28px] font-bold text-black">{title}</h2>

        <Link
          href="/upcoming"
          className="flex items-center gap-2 text-sm text-[#4338ca] hover:underline"
        >
          See more
          <ArrowrightLogo />
        </Link>
      </div>

      <div className="grid grid-cols-5 gap-x-8 gap-y-8">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
    </section>
  );
};

/* =====================================================
   HERO SECTION
===================================================== */

export const HeroSection = () => {
  return (
    <main className="w-full">
      {/* ================= HERO ================= */}

      <section className="relative h-160 w-full overflow-hidden">
        {/* Background */}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/20 to-transparent" />

        {/* Content */}
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

            {/* Trailer */}
            <button className="flex items-center gap-3 rounded-lg bg-white px-5 py-3 text-[15px] font-medium text-gray-800 hover:bg-gray-100">
              <PlayLogo />
              Watch Trailer
            </button>
          </div>
        </div>

        {/* Right arrow */}
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

      {/* ================= MOVIES ================= */}

      <MovieSection title="Upcoming" movies={upcomingMovies} />

      <MovieSection title="Popular" movies={popularMovies} />

      <MovieSection title="Top Rated" movies={topRatedMovies} />
    </main>
  );
};

export default HeroSection;
