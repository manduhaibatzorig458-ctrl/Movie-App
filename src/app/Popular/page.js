"use client";

import { Header } from "../features/Header";
import { Footer } from "../features/Footer";
import { Popular } from "../features/Popular";

export default function PopularPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="flex-1">
        <Popular showSeeMore={false} />
      </main>

      <Footer />
    </div>
  );
}