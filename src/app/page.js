import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import Categories from "@/components/Categories";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <Navbar />
    <HeroSection />
    <Categories />
    <Footer />
    </>
  );
}
