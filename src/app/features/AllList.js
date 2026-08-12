import React from "react";

import StarLogo from "../Icons/StarLogo";
import ArrowrightLogo from "../Icons/ArrowrightLogo";

import Image from "next/image";

/* =====================================================
   UPCOMING MOVIES
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

/* =====================================================
   POPULAR MOVIES
===================================================== */

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
    image:"/movies/DearSanta.png",
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

/* =====================================================
   TOP RATED MOVIES
===================================================== */

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
      {/* Poster */}
      <div className="w-full aspect-2/3 overflow-hidden bg-gray-200">
        <Image
          src={movie.image}
          alt={movie.title}
          width={250}
          height={350}
          className="w-full h-full object-cover block"
        />
      </div>

      {/* Movie Info */}
      <div className="min-h-25 bg-[#f4f4f4] px-2.5 pt-3.5 pb-3.75">
        {/* Rating */}
        <div className="flex items-center mb-2 text-[14px] text-gray-700">
          <StarLogo />

          <span>{movie.rating}</span>

          <span className="text-gray-500">/10</span>
        </div>

        {/* Title */}
        <h3 className="m-0 text-[19px] leading-[1.4] font-normal text-[#151515]">
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
      {/* Header */}
      <div className="flex items-center justify-between mb-8.75 my-8">
        <h2 className="text-[28px] font-bold text-black">{title}</h2>

        <button className="flex items-center gap-3 text-[16px] text-black">
          <span>See more</span>

          <ArrowrightLogo />
        </button>
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-5 gap-x-8 gap-y-8">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
    </section>
  );
};

/* =====================================================
   ALL LIST
===================================================== */

export const AllList = () => {
  return (
    <div className="w-full">
      {/* Upcoming */}
      <MovieSection title="Upcoming" movies={upcomingMovies} />

      {/* Popular */}
      <MovieSection title="Popular" movies={popularMovies} />

      {/* Top Rated */}
      <MovieSection title="Top Rated" movies={topRatedMovies} />
    </div>
  );
};

export default AllList;
