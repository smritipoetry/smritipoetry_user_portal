"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { base_api_url } from "@/config/Config";
import Footer from "@/components/Footer";
import Sidebar from "@/components/dashboardsidebar";
import { FaArrowLeft, FaUser, FaUserEdit } from "react-icons/fa";

const FavoritePoems = () => {
  const router = useRouter();
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("authToken")
          : null;

      if (!token) {
        setError("Authorization token missing");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${base_api_url}/api/favorite-poetry`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to fetch favorites");
        }

        const data = await res.json();
        setFavorites(data.favorites || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleDeleteFavorite = async (poetryId) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

    if (!token) {
      setError("Authorization token missing");
      return;
    }

    setDeletingId(poetryId);

    try {
      const res = await fetch(`${base_api_url}/api/favorites/${poetryId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete favorite");
      }

      const data = await res.json();
      setFavorites(data.favorites || []);
      setError(null);

      // Update favorites status in localStorage to trigger update in other tabs/pages
      localStorage.setItem("favoritesUpdated", Date.now().toString());
      // Dispatch storage event for the current window
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "favoritesUpdated",
          newValue: Date.now().toString(),
        })
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-100 pt-20">
        {/* Mobile Navigation Header */}
        <div className="md:hidden fixed top-20 left-0 right-0 bg-white z-50 border-b shadow-sm">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <FaArrowLeft className="mr-2" /> Back
            </button>
            <div className="flex gap-4">
              <button
                onClick={() =>
                  router.push("/loginstuff/dashboardpage/userprofile")
                }
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <FaUser className="mr-1" /> Profile
              </button>
              <button
                onClick={() =>
                  router.push("/loginstuff/dashboardpage/updateprofile")
                }
                className="flex items-center text-green-600 hover:text-green-800"
              >
                <FaUserEdit className="mr-1" /> Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar + Content layout */}
        <div className="flex flex-col md:flex-row flex-1">
          {/* Sidebar - Only visible on md and larger screens */}
          <aside className="hidden md:block md:w-1/4 lg:w-1/5">
            <Sidebar />
          </aside>

          {/* Main Content */}
          <main className="flex-1 px-4 sm:px-6 md:px-8 py-6 mt-16 md:mt-0">
            {loading ? (
              <p className="text-black text-center mt-20">Loading...</p>
            ) : error ? (
              <p className="text-red-500 text-center mt-20">Error: {error}</p>
            ) : (
              <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-900">
                  Your Favorite Poems
                </h1>

                {favorites.length === 0 ? (
                  <p className="text-gray-700 text-center">
                    No favorites found
                  </p>
                ) : (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((poem) => (
                      <li
                        key={poem._id}
                        className="border p-4 rounded-lg shadow-md bg-white text-center relative"
                      >
                        <Link href={`/poetry/${poem.slug}`}>
                          <img
                            src={poem?.image}
                            alt={poem?.title || "Poetry Image"}
                            className="h-32 w-32 sm:h-36 sm:w-36 mx-auto object-cover rounded-full border-4 border-[#4b2e2e] mb-4 hover:scale-105 transition-transform duration-300 cursor-pointer"
                          />
                        </Link>

                        <h3 className="text-[#4b2e2e] uppercase text-xs font-semibold tracking-widest">
                          {poem?.category}
                        </h3>

                        <Link
                          href={`/poetry/${poem.slug}`}
                          className="text-lg sm:text-xl font-bold text-gray-800 mt-1 block hover:text-[#4b2e2e] transition-colors duration-300"
                        >
                          {poem?.title}
                        </Link>

                        <div className="text-sm text-slate-500 mt-1">
                          {poem?.date} &bull; {poem?.writerName}
                        </div>

                        <button
                          onClick={() => handleDeleteFavorite(poem._id)}
                          disabled={deletingId === poem._id}
                          className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-1 px-3 rounded transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label={`Remove ${poem.title} from favorites`}
                        >
                          {deletingId === poem._id ? "Removing..." : "Remove"}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </main>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default FavoritePoems;
