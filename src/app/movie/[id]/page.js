"use client";

import { Header } from "../../features/Header";
import { Footer } from "../../features/Footer";
import MovieDetails from "../../features/MovieDetails";

export default function MoviePage() {
  return (
    <main className="min-h-screen bg-black">
      <Header />

      <MovieDetails />

      <Footer />
    </main>
  );
}