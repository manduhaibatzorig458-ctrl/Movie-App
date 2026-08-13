"use client";

import { useState, useEffect } from "react";
import StarLogo from "../Icons/StarLogo";

const url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzhmMWQ1MDg2ZWRmOTY1NzQ5NjEyODdiZDI3Y2MzZSIsIm5iZiI6MTc4NjU4NTA5MC41NTIsInN1YiI6IjZhN2QyMDAyMTVhZWU3YzFlNmI3YWNhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5kK_xecc4fk2ymkk7RxsglhtFOIlUAlTRU6TWB4Nr5c",
  },
};
<div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
  {loading && <div>Loading...</div>}

  {!loading && errorMessage && <div>{errorMessage}</div>}

  {!loading &&
    !errorMessage &&
    data.map((movie) => {
      return (
        <div
          className="w-full h-110 flex flex-col rounded-lg gap-1 bg-[#F4F4F5] overflow-hidden"
          key={movie.id}
        >
          <div
            className="w-full h-85 bg-[url(`https://image.tmdb.org/t/p/original/${movie.poster_path}`)] bg-cover bg-center"
          >
          </div>

          <div className="w-full h-23.75 flex flex-col py-2 px-2">
            <div className="w-full h-5.75 flex gap-1">
              <StarLogo />

              <p className="w-full h-5.75 flex font-inter font-medium text-[14px] text-[#09090B] leading-5 items-center">
                {Math.floor(movie.vote_average)}

                <span className="font-inter font-normal text-[14px] text-[#71717A]">
                </span>


              </p>
            </div>

            <div className="w-full h-14 flex">
              <p className="font-inter font-normal text-[18px] text-[#09090B] leading-7">
                {movie.title}
              </p>
            </div>
          </div>
        </div>
      );
    })}
</div>