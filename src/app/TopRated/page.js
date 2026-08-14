"use client";

import { Header } from "../features/Header";
import { HeroSection } from "../features/HeroSection";
import { Footer } from "../features/Footer";
import { Upcoming } from "../features/Upcoming";
import { TopRated } from "../features/TopRated";
import { Popular } from "../features/Popular";

export default function TopRatedPage () {
    return(
    <div className=" w-full min-h-screen flex flex-col items-center overflow-x-hidden">
     <main>
       {/* Header */}
      <Header />

      {/* TopRated Movies */}
      <main className="flex-1">
        <TopRated />
     
      </main>

      {/* Footer */}
      <Footer />
    </main>
    </div>
    )
}