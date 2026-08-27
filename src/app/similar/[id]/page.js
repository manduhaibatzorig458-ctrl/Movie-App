"use client";

import { Header } from "../../../features/Header";
import { Footer } from "../../../features/Footer";
import MoreLikeThis from "../../../features/MoreLikeThis";

export default function SimilarPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <Header />

      <MoreLikeThis />

      <Footer />
    </main>
  );
}