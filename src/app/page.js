"use client";
import Image from "next/image";
import { Header } from "./features/Header";
import { HeroSection } from "./features/HeroSection";
import { Footer } from "./features/Footer";
import { Upcoming } from "./features/Upcoming";
import { TopRated } from "./features/TopRated";
import { Popular } from "./features/Popular";
 
import { MovieDetails } from "./features/MovieDetails"


import { VectorLogo } from "./Icons/VectorLogo";
import { useEffect, useState } from "react";


export default function Main() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const getData = async () => {
    try {
      const response = await fetch(url, options);
      const jsonData = await response.json();

      return jsonData.results;
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    getData()
      .then((result) => setData(result))
      .catch(() => setErrorMessage("MOVIE API ERROR"))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {loading && <div>Loading...</div>}
      {!loading && errorMessage && <div>{errorMessage}</div>}
      {!loading && !errorMessage && (
        <div>
          <Header />

          <HeroSection />

          <Footer />
        </div>
      )}
    </div>
  );
}
