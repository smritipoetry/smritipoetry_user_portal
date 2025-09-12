"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { AiFillYoutube } from "react-icons/ai";
import { base_api_url } from "../config/Config";
import BuyMeACoffee from "./BuyMeACoffee";

const Footer = () => {
  const [status, setStatus] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("");
  const [privacyError, setPrivacyError] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [privacyChecked, setPrivacyChecked] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    if (!privacyChecked) {
      setPrivacyError(true);
      return;
    }

    setPrivacyError(false);
    setNewsletterStatus("Subscribing...");

    try {
      const response = await fetch(`${base_api_url}/api/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setNewsletterStatus("Subscribed successfully!");
        setNewsletterEmail("");
        setPrivacyChecked(false);
      } else {
        setNewsletterStatus(`Error: ${data.message}`);
      }
    } catch (error) {
      setNewsletterStatus("Error: Could not subscribe.");
    }

    setTimeout(() => {
      setNewsletterStatus("");
    }, 5000);
  };

  return (
    <div className="w-full">
      {/* Newsletter Section */}
      <div className="bg-[#e7ede6] py-10 px-4 md:px-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <img src="/letter.png" />
          </div>

          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-black text-xl font-semibold mb-6">
              Thoughts from my heart to your inbox.
            </h2>
            <p className="text-gray-700 mb-4 max-w-md text-lg">
              Be the first to know what I'm up to
            </p>
          </div>

          <div className="md:w-1/2 w-full">
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex border border-black rounded-sm overflow-hidden"
            >
              <input
                type="email"
                placeholder="Your E-MAIL HERE"
                className="w-full px-4 py-3 outline-none bg-transparent text-black placeholder:text-gray-500"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
              />
              <button
                type="submit"
                className="px-8 text-black hover:text-gray-700"
              >
                →
              </button>
            </form>

            <div className="flex items-start mt-3">
              <input
                type="checkbox"
                id="privacy"
                className="mr-2 mt-1"
                onChange={() => setPrivacyChecked(!privacyChecked)}
                checked={privacyChecked}
              />
              <label htmlFor="privacy" className="text-gray-600 text-[16px]">
                By joining our mailing list , you agree to our{" "}
                <Link
                  href="/otherstuffs/privacy-policy"
                  className="gap-6 underline"
                >
                  Terms of service
                </Link>{" "}
                and{" "}
                <Link href="/otherstuffs/privacy-policy" className="underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {privacyError && (
              <p className="text-red-500 text-sm mt-1">
                Please check the privacy policy agreement before subscribing.
              </p>
            )}
            {newsletterStatus && (
              <p className="mt-4 text-black">{newsletterStatus}</p>
            )}
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="bg-[#3A6B35] py-12 font-sans">
        <div className="px-4 md:px-8 w-full max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          {/* Logo & Socials */}
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-3xl font-medium tracking-wide text-white mb-4">
              SMRITI JHA
            </h1>
            <div className="flex gap-4 text-gray-200 justify-center md:justify-start">
              <a
                href="https://instagram.com/sjhapoetry"
                target="_blank"
                className="hover:text-white"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/smriti-jha-a1210s"
                target="_blank"
                className="hover:text-white"
              >
                <FaLinkedinIn size={24} />
              </a>
              <a
                href="https://www.youtube.com/@sjhapoetry"
                target="_blank"
                className="hover:text-white"
              >
                <AiFillYoutube size={26} />
              </a>
              <a
                href="https://www.twitter.com/@erin_nerte"
                target="_blank"
                className="hover:text-white"
              >
                <FaTwitter size={22} />
              </a>
            </div>
            <BuyMeACoffee />
          </div>

          {/* About Smriti */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-xl font-semibold text-white mb-3">
              About Smriti
            </h2>
            <ul className="space-y-2 text-lg text-gray-200">
              <li>
                <Link href="/otherstuffs/about" className="hover:underline">
                  My Story
                </Link>
              </li>
              <li>
                <Link href="/poetry/allpoetry" className="hover:underline">
                  My Poetry
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-xl font-semibold text-white mb-3">
              All Features
            </h2>
            <ul className="space-y-2 text-lg text-gray-200">
              <li>
                <Link href="/submit-poetry" className="hover:underline">
                  Submit Poetry
                </Link>
              </li>
              <li>
                <Link
                  href="/otherstuffs/dictionary"
                  className="hover:underline"
                >
                  Dictionary
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-xl font-semibold text-white mb-3">Want Help</h2>
            <ul className="space-y-2 text-lg text-gray-200">
              <li>
                <Link href="/otherstuffs/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/otherstuffs/faq" className="hover:underline">
                  FAQ
                </Link>
              </li>
              <li>
                <a
                  href="mailto:smritipoetry@gmail.com"
                  className="hover:underline"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-[#3A6B35] border-t border-white">
        <div className="px-4 py-6 flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 text-center">
          <p className="text-gray-200 text-sm">
            © {new Date().getFullYear()} Smriti Jha | Website designed &
            developed by Smriti Jha
          </p>
          <div className="text-sm flex gap-4 text-white">
            <Link href="/otherstuffs/privacy-policy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
