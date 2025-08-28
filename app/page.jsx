// pages/index.jsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import Image from "next/image";
import FeaturedPoems from "../components/news/items/FeaturedPoems";
import RecentPoetry from "@/components/news/RecentPoetry";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust delay if needed

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white text-xl font-semibold">
        <div className="animate-pulse text-center">
          <p>Smriti's Poetry is Warming Up...</p>
          <p className="text-sm mt-2 text-gray-300">Just a few seconds 💫</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#fefaf3] dark:bg-gray-900 text-gray-800 dark:text-white transition duration-300 ease-in-out">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center text-center h-screen w-full bg-black">
        {/* Small screen image */}
        <div className="absolute inset-0 z-0 md:hidden">
          <Image
            src="/herosection.jpg"
            alt="Smriti writing poetry"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="opacity-90"
            priority
          />
        </div>

        {/* Large screen image */}
        <div className="absolute inset-0 z-0 hidden md:block">
          <Image
            src="/home.jpg"
            alt="Smriti writing poetry"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="opacity-90"
            priority
          />
        </div>

        {/* Darker Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/50 z-10" />

        {/* Text Content */}
        <div className="relative z-20 px-4">
          <h1 className="text-5xl md:text-6xl font-serif font-normal text-white mb-4 drop-shadow-lg">
            Smriti Jha
          </h1>
          <p className="text-base md:text-xl italic text-gray-100 max-w-3xl mx-auto drop-shadow hidden md:block">
            And one day the girl with the books became the woman writing them.
          </p>
          <Link href="/poetry/allpoetry" passHref>
            <button className="mt-8 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition duration-300">
              Read My Poems
            </button>
          </Link>
        </div>
      </section>
      {/* About Section */}
      <section className="relative bg-[#dfecde] dark:bg-gray-900 py-16 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-y-10 md:gap-x-10 relative z-10">
          {/* Heading (mobile only) */}
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-center md:hidden order-1">
            About Me
          </h2>

          {/* Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-start order-2 md:order-1">
            <Image
              src="/image.jpg"
              alt="About Me"
              width={400}
              height={350}
              className="rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md h-auto mt-4 md:mt-6"
            />
          </div>

          {/* Text + Heading (desktop only) */}
          <div className="w-full md:w-1/2 md:text-left order-3 md:order-2">
            <h2 className="hidden md:block text-3xl sm:text-4xl font-semibold mb-4 text-center ">
              About Me
            </h2>

           <p className="text-gray-700 dark:text-gray-300 mb-6 text-base leading-relaxed text-left">
  I'm Smriti Jha — a poet at heart, a software engineer by profession, and a web developer by passion. Through poetry, I explore emotions, love, loss, and everything in between, giving voice to feelings often left unspoken.
</p>
<p className="text-gray-700 dark:text-gray-300 mb-6 text-base leading-relaxed text-left">
  In my work as a web developer, I craft meaningful, intuitive digital experiences, believing that every line of code has the power to tell a story. For me, both poetry and development are about connection — between people, ideas, and technology.
</p>
<p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed text-left">
  My journey has taught me to embrace contrasts: the precision of code and the fluidity of verse, structure and spontaneity. These seemingly different paths stem from the same creative energy that drives me to explore, express, and create.
</p>

            <Link href="/otherstuffs/about" passHref>
              <button className="mt-6 text-white bg-[#C1440E] hover:bg-[#a6370d] focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-full py-3 px-6 transition duration-300">
                Know More
              </button>
            </Link>
          </div>
        </div>

        {/* Decorative Image */}
        <div className="relative mt-10 md:mt-0">
          <Image
            src="/smritibranch.webp"
            alt="Decorative Branch"
            width={300}
            height={300}
            className="absolute hidden md:block right-0 top-14 opacity-80 z-0"
          />
        </div>
      </section>

      {/* YouTube Poem */}
      <section className="bg-[#dfecde] dark:bg-gray-900 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="grid grid-cols-1 gap-8 items-center">
            <div className="w-full h-[500px] sm:h-[550px]">
              <iframe
                className="w-full h-full rounded-lg shadow-lg"
                src="https://www.youtube.com/embed/xBq1yyiwAwc"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Poem */}
      <section className="bg-[#dfecde] dark:bg-gray-900 py-10 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-black dark:text-amber-200 mb-4 font-serif">
            Featured Poetry
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto text-base sm:text-lg">
            Discover a handpicked poem that speaks to the heart.
          </p>
          <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-xl rounded-2xl p-6 sm:p-8 transition-transform duration-300 hover:scale-[1.01]">
            <div className="flex items-start gap-3 mb-4">
              <div className="text-left w-full">
                <FeaturedPoems />
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 text-sm text-gray-500 dark:text-gray-400 flex justify-between">
              <span>By Smriti Jha</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Poetry */}
      <section className="bg-[#dfecde] dark:bg-gray-900 px-4 sm:px-6 pb-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6 font-serif">
            Recent Poetry
          </h2>
          <RecentPoetry />
        </div>
      </section>

      <Footer />
    </main>
  );
}
