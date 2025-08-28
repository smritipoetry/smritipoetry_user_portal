"use client";
import React from "react";
import Footer from "../../../components/Footer";
import Image from "next/image";
const faqs = [
  {
    question: "How can I submit my own poetry to your website?",
    answer:
      "You can submit your poetry directly through the 'Submit Your Poetry' page on this website. Just fill out the form with your name, title, poem, and audio (optional). I can't wait to read your words!",
  },
  {
    question: "Can I publish my poetry on your website?",
    answer:
      "Absolutely! Submit your poetry through the 'Submit Your Poetry' page on this website. After that, email us at smritipoetry@gmail.com with the subject line: 'I want to publish my poetry on your website'. Please ensure your poem is 100% original, free from plagiarism, and entirely your own.",
  },
  {
    question: "Can I use your poetry for my videos or art?",
    answer:
      "Yes, with proper credit. If you’re planning to use my work in any public project (like a video, short film, or art piece), please contact me first. I genuinely appreciate respectful and creative collaborations.",
  },
  {
    question: "What inspires your writing?",
    answer:
      "Moments that feel like whispers — late-night thoughts, unanswered questions, love, grief, and everything in between. I write when I feel too much and don’t know what else to do.",
  },
  {
    question: "Do you accept guest poems or collaborations?",
    answer:
      "Absolutely! I’m always open to featuring other voices. If your poem aligns with the tone of this space — soft, raw, and reflective — I’d love to read it.",
  },
];

const FAQPage = () => {
  return (
    <>
      <div className="bg-[#fefaf3] min-h-screen text-gray-900 font-serif px-6 md:px-20 py-24 relative overflow-hidden mt-28">
        {/* Decorative background illustrations */}
        <img
          src="/leaf-top-left.png"
          alt=""
          className="absolute top-0 left-0 w-32 opacity-70"
        />
        <img
          src="/lemon-vine-right.png"
          alt=""
          className="absolute top-10 right-0 w-48 opacity-80"
        />
        <img
          src="/leaf-bottom-left.png"
          alt=""
          className="absolute bottom-0 left-0 w-40 opacity-80"
        />
        <img
          src="/leaf-bottom-right.png"
          alt=""
          className="absolute bottom-0 right-0 w-28 opacity-70"
        />

        {/* Title */}
        <h1 className="group text-5xl text-center font-bold tracking-wide mb-12 relative z-10 transition-all duration-300 hover:italic before:content-[''] group-hover:before:content-['-'] group-hover:before:mr-2">
          F.A.Q.
        </h1>

        {/* FAQ Content */}
        <div className="max-w-2xl mx-auto space-y-8 relative z-10">
          {faqs.map((faq, index) => (
            <details key={index} className="border-b pb-4 group cursor-pointer">
              <summary className="text-xl md:text-2xl font-medium flex justify-between items-center">
                {faq.question}
                <span className="ml-2 text-lg transform group-open:rotate-180 transition-transform duration-300">
                  ⌄
                </span>
              </summary>
              <p className="mt-2 text-gray-700 text-base md:text-lg">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
      <Image
        src="/smritibranch.webp"
        alt="Decorative Branch"
        width={400}
        height={400}
        className="hidden md:block absolute right-0 top-150 opacity-80 z-0"
      />
      <Image
        src="/smritibranch.webp"
        alt="Decorative Branch"
        width={400}
        height={400}
        className="hidden md:block absolute left-0 top-70 opacity-80 z-0"
      />
      <div>
        <Footer />
      </div>
    </>
  );
};

export default FAQPage;
