
import Image from "next/image";
import { Header } from "./features/Header";
import { HeroSection } from "./features/HeroSection";
import { AllList } from "./features/AllList"
import { Footer } from "./features/Footer";


import { VectorLogo } from "./Icons/VectorLogo"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <AllList/>
      <Footer/>
    </div>
  );
}