"use client";

import React from "react";

const BuyMeACoffee = () => {
  return (
    <div className="flex justify-center my-6">
      <a
        href="https://buymeacoffee.com/sjhapoetry"
        target="_blank"
        rel="noopener noreferrer"
        className="relative group"
      >
        {/* Subtle Glow Background */}
        <div className="absolute inset-0 bg-yellow-300 rounded-full blur-md opacity-30 group-hover:opacity-50 transition duration-300"></div>

        {/* Button */}
        <img
          src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
          alt="Buy Me a Coffee"
          className="relative rounded-full shadow-lg transform transition duration-300 group-hover:scale-105 group-hover:rotate-1"
          style={{ height: "55px", width: "220px", filter: "brightness(0.9)" }}
        />

        {/* Optional subtle bounce */}
        <div className="absolute -bottom-2 right-2 animate-bounce text-lg">
          ☕
        </div>
      </a>
    </div>
  );
};

export default BuyMeACoffee;
