"use client";

import { Header } from "../features/Header";
import { HeroSection } from "../features/HeroSection";
import { Footer } from "../features/Footer";
import { Upcoming } from "../features/Upcoming";
import { TopRated } from "../features/TopRated";
import { Popular } from "../features/Popular";


export default function UpcomingPage() {
  return (
    <div className="w-full min-h-screen flex flex-col overflow-x-hidden bg-white">
      
      {/* Header */}
      <Header />

      {/* Upcoming Movies */}
      <main className="flex-1">
        <Upcoming />
     
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}


