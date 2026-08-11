import Image from "next/image";
import { Header }  from "./features/Header"
import { Footer } from "./features/Footer"
import { HeroSection } from "./features/HeroSection"



export default function Home() {
  return (
    <div>
      <Header/>
      <HeroSection/>
      <Footer/>
    </div>
  );
}
