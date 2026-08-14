"use client";

import { Header } from "../features/Header";
import { HeroSection } from "../features/HeroSection";
import { Footer } from "../features/Footer";
import { Upcoming } from "../features/Upcoming";
import { TopRated } from "../features/TopRated";
import { Popular } from "../features/Popular";

export default function PopularPage() {
  return (
   <main>
      {/* Header */}
      <Header />

      {/* Popular Movies */}
      <main className="flex-1">
       <Popular showSeeMore={false} />
      </main>
 
         {/* Footer */}
      <Footer />
     </main>
  )
}
