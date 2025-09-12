"use client";
import React from "react";
import Image from "next/image";
import BuyMeACoffee from "../../../components/buymeacoffee";
import {
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import Footer from "@/components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#dfecde] text-gray-800 mt-20">
      {/* Flex Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 flex flex-col md:flex-row gap-20 items-start">
        {/* Left: Artistic Image */}
        <div className="w-full md:w-[100vh] flex justify-center ">
          <div className="relative w-full h-auto max-w-full border-4 border-white shadow-lg md:mt-16">
            <Image
              src="/about1.jpg"
              alt="Smriti Jha"
              width={800}
              height={900} // Or aspect ratio that works
              className="object-cover w-full h-auto"
              priority
            />
          </div>
        </div>

        {/* Right: Content */}
        <div className="w-full md:w-[200vh] text-left">
          {/* Artistic Brush Effect */}
          <div className="inline-block relative mb-4">
            <div className="absolute -top-2 -left-2 w-full h-full bg-blue-200 rounded rotate-2 z-0"></div>
            <h1 className="relative text-5xl md:text-6xl font-serif font-bold text-gray-900 z-10">
              Smriti Jha
            </h1>
          </div>

          {/* About Content */}
          <p className="text-lg leading-relaxed mb-4">
            A curious mind in the world of code, and a tender heart in the world
            of verse — I’m <span className="font-semibold">Smriti Jha</span>, a{" "}
            <span className="text-blue-700 font-medium">Software Engineer</span>{" "}
            by profession and a{" "}
            <span className="text-pink-700 font-medium">poet</span> by soul.
          </p>

          <p className="text-lg leading-relaxed mb-4">
            With one hand in logic and the other in lyricism, I walk the line
            between technology and creativity — building with precision and
            expressing with passion.
          </p>

          <p className="text-lg leading-relaxed mb-4">
            This space is my canvas. Here you’ll find thoughtful projects,
            heartfelt poems, and glimpses of a journey that honors both
            structure and spontaneity.
          </p>

          <p className="text-lg leading-relaxed mb-4">
            With a foundation in computer science and a soul deeply connected to
            expression, I walk the fine line between structure and spontaneity.
            Writing code teaches me discipline, precision, and problem-solving —
            while poetry grants me freedom, reflection, and emotional clarity.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            I started writing poetry as a reflection of someone else's affection
            — what began as an echo of their presence slowly became a voice of
            my own. Over time, that affection turned into inspiration, and the
            words that once belonged to someone else became the way I found
            myself.
          </p>

          <p className="text-lg leading-relaxed mb-4">
            My journey began with curiosity — about how machines think and how
            hearts feel. Today, that curiosity drives every project I build and
            every poem I pen. From crafting user experiences that feel intuitive
            and meaningful to capturing fleeting moments in carefully chosen
            words, I strive to create with both purpose and passion.
          </p>

          <p className="text-lg leading-relaxed mb-4">
            Beyond the screen and the page, I’m someone who believes in
            continuous growth, meaningful connections, and the magic of little
            things. Whether it’s a line of JavaScript or a line from a poem, my
            goal is the same: to make someone pause, reflect, and feel.
          </p>

          <p className="italic text-gray-600 mt-6 text-lg">
            “Let technology build the future — and poetry remind us why it's
            worth building.”
          </p>

          {/* Social Icons */}
          <div className="flex justify-start gap-6 mt-10 text-2xl">
            <a
              href="https://instagram.com/sjhapoetry"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-pink-600"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/smriti-jha-a1210s"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-400"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://www.youtube.com/@sjhapoetry"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-red-600"
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.twitter.com/@erin_nerte"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black"
            >
              <FaTwitter />
            </a>
          </div>

          {/* Buy Me a Coffee Button */}
          <BuyMeACoffee />
        </div>
        <Image
          src="/smritibranch.webp"
          alt="Decorative Branch"
          width={400}
          height={400}
          className="hidden md:block absolute left-20 top-[105vh] opacity-100 z-0"
        />
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
