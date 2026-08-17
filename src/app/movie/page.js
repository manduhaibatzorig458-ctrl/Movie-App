"use client"

import { useParams } from "next/navigation";


import { Header } from "../features/Header";
import { HeroSection } from "../features/HeroSection";
import { Footer } from "../features/Footer";
import { Upcoming } from "../features/Upcoming";
import { TopRated } from "../features/TopRated";
import { Popular } from "../features/Popular";

export default function movie() {
   const { id } = useParams;  
}