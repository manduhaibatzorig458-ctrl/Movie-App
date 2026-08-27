"use client";

import { Header } from "../../features/Header";
import { Footer } from "../../features/Footer";
import MoreLikeThis from "../../features/MoreLikeThis";

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <MoreLikeThis />

      <Footer />
    </main>
  );
}