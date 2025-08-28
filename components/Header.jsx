"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaInstagram, FaYoutube, FaLinkedin, FaTwitter } from "react-icons/fa";

import Image from "next/image";
import Link from "next/link";
import { base_api_url } from "../config/Config";
import { useAuth } from "../context/authContext";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [scrolled, setScrolled] = useState(false);

  const isAuthenticated = !!user;
  const isHome = pathname === "/";
  const headerBg = isHome
    ? scrolled
      ? "bg-[#3A6B35]"
      : "bg-transparent"
    : "bg-[#3A6B35]";

  useEffect(() => {
    if (pathname === "/") {
      const handleScroll = () => setScrolled(window.scrollY > 50);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [pathname]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${base_api_url}/api/category/all`);
        const data = await res.json();
        if (res.ok) setCategories(data.categories);
      } catch (error) {
        console.error("Category fetch error:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleProtectedRoute = (path) => {
    isAuthenticated ? router.push(path) : router.push("/loginstuff/auth");
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    router.push("/");
  };

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleCategoryDropdown = () => setCategoryDropdownOpen((prev) => !prev);

  return (
    <div
      className={`${headerBg} fixed top-0 w-full z-50 transition-colors duration-300`}
    >
      <div className="flex justify-between items-center px-5 lg:px-10 py-5 text-white">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img src="/name.png" className="w-32 h-auto" alt="Smriti Jha" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-10 items-center">
          <Link href="/poetry/allpoetry" className="hover:underline text-sm">
            My Poetry
          </Link>
          <button
            onClick={() => handleProtectedRoute("/submit-poetry")}
            className="hover:underline text-sm"
          >
            Submit Your Poetry
          </button>
          <button
            onClick={() => handleProtectedRoute("/otherstuffs/dictionary")}
            className="hover:underline text-sm"
          >
            Dictionary
          </button>
          <div className="relative">
            <button
              onClick={toggleCategoryDropdown}
              className="hover:underline text-sm"
            >
              Categories
            </button>
            {categoryDropdownOpen && (
              <div className="absolute top-10 left-0 bg-white text-black z-50 min-w-[200px] max-h-[300px] overflow-y-auto shadow">
                {categories.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      router.push(`/poetry/category/${cat.category}`);
                      setCategoryDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    {cat.category} ({cat.count})
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* <button
            onClick={() => handleProtectedRoute("/smritis-muse")}
            className="hover:underline text-sm"
          >
            Smriti's Muse
          </button> */}
          <Link href="/otherstuffs/about" className="hover:underline text-sm">
            About Me
          </Link>
        </div>

        {/* Right Auth/Profile */}
        <div className="hidden lg:flex items-center">
          {isAuthenticated ? (
            <button onClick={toggleDropdown} className="ml-3">
              {user?.profilePicture ? (
                <Image
                  src={user.profilePicture}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white"
                />
              ) : (
                <UserCircleIcon className="w-10 h-10 text-white" />
              )}
            </button>
          ) : (
            <button
              onClick={() => router.push("/loginstuff/auth")}
              className="ml-3 px-4 py-1.5 bg-white text-black rounded-full text-sm hover:bg-gray-300 transition"
            >
              Login
            </button>
          )}

          {dropdownOpen && (
            <div className="absolute top-16 right-10 bg-white text-black shadow-lg rounded-lg py-3 w-48 z-50">
              <div className="px-4 py-2 text-center">
                <button
                  onClick={() => {
                    router.push("/loginstuff/dashboardpage/userprofile");
                    setDropdownOpen(false);
                  }}
                  className="w-full text-sm bg-green-700 text-white py-2 rounded hover:bg-green-800"
                >
                  Dashboard
                </button>
              </div>
              <div className="px-4 py-2 text-center">
                <button
                  onClick={handleLogout}
                  className="w-full text-sm bg-red-600 text-white py-2 rounded hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Hamburger Icon */}
        <div className="lg:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <XMarkIcon className="w-8 h-8 text-white" />
            ) : (
              <Bars3Icon className="w-8 h-8 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white text-black z-50 flex flex-col justify-between">
          {/* Top Bar */}
          <div className="flex items-center justify-between p-4 border-b">
            <button onClick={() => setMobileMenuOpen(false)}>
              <XMarkIcon className="w-6 h-6 text-black" />
            </button>

            <Link href="/" className="flex justify-center items-center gap-2">
              <img
                src="/namesmall.png"
                alt="Smriti Jha"
                className="w-32 h-auto"
              />
            </Link>

            {/* Profile Icon */}
            {isAuthenticated ? (
              <button onClick={toggleDropdown}>
                {user?.profilePicture ? (
                  <Image
                    src={user.profilePicture}
                    alt="Profile"
                    width={36}
                    height={36}
                    className="rounded-full border border-black"
                  />
                ) : (
                  <UserCircleIcon className="w-8 h-8 text-black" />
                )}
              </button>
            ) : (
              <div className="w-8" />
            )}
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-6 px-2 py-6 text-base font-medium">
            <Link
              href="/poetry/allpoetry"
              onClick={() => setMobileMenuOpen(false)}
              className="flex justify-between w-full"
            >
              My Poetry <span>→</span>
            </Link>
            <button
              onClick={() => handleProtectedRoute("/submit-poetry")}
              className="flex justify-between w-full"
            >
              Submit Your Poetry <span>→</span>
            </button>
            <button
              onClick={() => handleProtectedRoute("/otherstuffs/dictionary")}
              className="flex justify-between w-full"
            >
              Dictionary <span>→</span>
            </button>

            {/* Categories */}
            <div>
              <button
                onClick={toggleCategoryDropdown}
                className="flex justify-between w-full"
              >
                Categories <span>→</span>
              </button>
              {categoryDropdownOpen && (
                <div className="mt-2 bg-gray-100 rounded p-3 text-sm space-y-1">
                  {categories.map((cat, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        router.push(`/poetry/category/${cat.category}`);
                        setCategoryDropdownOpen(false);
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-2 py-1 hover:bg-gray-200"
                    >
                      {cat.category} ({cat.count})
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* <button
              onClick={() => handleProtectedRoute("/smritis-muse")}
              className="flex justify-between w-full"
            >
              Smriti's Muse <span>→</span>
            </button> */}
            <Link
              href="/otherstuffs/about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex justify-between w-full"
            >
              About Me <span>→</span>
            </Link>
          </div>
          {/* Social Icons */}
          <div className="flex justify-center gap-6 pt-4 text-xl text-black border-t border-gray-200">
            <Link href="https://instagram.com/sjhapoetry" target="_blank">
              <FaInstagram />
            </Link>
            <Link href="https://www.youtube.com/@sjhapoetry" target="_blank">
              <FaYoutube />
            </Link>
            <Link
              href="https://www.linkedin.com/in/smriti-jha-a1210s"
              target="_blank"
            >
              <FaLinkedin />
            </Link>
            <Link href="https://instagram.com/erin.nerte_p" target="_blank">
              <FaTwitter />
            </Link>
          </div>

          {/* Auth + Social Footer */}
          <div className="px-6 py-6 border-t flex flex-col gap-4">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => {
                    router.push("/loginstuff/dashboardpage/userprofile");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 bg-green-700 text-white rounded text-sm"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full py-2 bg-red-600 text-white rounded text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  router.push("/loginstuff/auth");
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 bg-black text-white rounded text-sm"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
