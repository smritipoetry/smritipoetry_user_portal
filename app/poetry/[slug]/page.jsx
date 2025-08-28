"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Breadcrumb from "@/components/BreadCrumb";
import Footer from "@/components/Footer";
import parse from "html-react-parser";
import { base_api_url } from "@/config/Config";
import RatingSection from "@/components/news/Rating";
import CommentSection from "@/components/news/Comment";
import AudioSection from "@/components/audioSection";
import { toast } from "react-hot-toast";

import LikeButton from "@/components/news/LikeButton";

// Share imports
import {
  WhatsappShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookShareButton,
  WhatsappIcon,
  TwitterIcon,
  LinkedinIcon,
  FacebookIcon,
} from "react-share";

import { FaRegCopy } from "react-icons/fa";
import { FaShare } from "react-icons/fa";

const Details = () => {
  const { slug } = useParams();
  const [poetry, setPoetry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const fetchPoetryData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const res = await fetch(`${base_api_url}/api/poetry/details/${slug}`, {
        headers: headers,
      });
      if (!res.ok) throw new Error("Failed to fetch poetry data");
      const data = await res.json();

      // Ensure we update both the poetry object and the favorite state
      const newPoetry = data.poetry;
      const isFav = Boolean(newPoetry?.isFavorited);

      setPoetry(newPoetry);
      setIsFavorited(isFav);
      setConfirmRemove(false);
    } catch (error) {
      console.error("Error fetching poetry details:", error);
      toast.error("Failed to load poetry details.");
    }
  };

  useEffect(() => {
    if (slug) fetchPoetryData();
  }, [slug]);

  const toggleFavorite = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Please login to manage favorites.");
      return;
    }

    if (!poetry?._id) {
      toast.error("Poetry data not loaded yet.");
      return;
    }

    if (loading) return;

    // Reset confirm state if user is adding to favorites
    if (!isFavorited) {
      setConfirmRemove(false);
    }
    // Show confirm dialog when removing from favorites
    else if (isFavorited && !confirmRemove) {
      setConfirmRemove(true);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${base_api_url}/api/favorites/${poetry._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to update favorite status");
      }

      const data = await res.json();

      if (typeof data.isFavorited === "boolean") {
        // Update both states immediately
        const newFavoriteStatus = data.isFavorited;
        setIsFavorited(newFavoriteStatus);
        setConfirmRemove(false);

        // Update the poetry object with the new favorite status
        setPoetry((prev) => ({
          ...prev,
          isFavorited: newFavoriteStatus,
        }));

        // Show success message
        toast.success(
          newFavoriteStatus
            ? `"${poetry.title}" added to favorites`
            : `"${poetry.title}" removed from favorites`
        );
      } else {
        toast.error("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error("Error occurred while updating favorite.");
    } finally {
      setLoading(false);
    }
  };

  if (!poetry)
    return (
      <div className="mt-32 text-center text-gray-600 font-medium">
        Loading...
      </div>
    );

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="mt-20">
      {/* Breadcrumb */}
      <section className="bg-[#dfecde] py-4 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <Breadcrumb one={poetry.category} two={poetry.title} />
        </div>
      </section>

      {/* Main Content */}
      <main className="bg-[#dfecde] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Main Section */}
            <article className="xl:col-span-2">
              <div className="bg-white rounded-xl p-6 shadow-md">
                {/* Share Button */}
                <div className="flex justify-end relative mb-2">
                  <button
                    onClick={() => setShowShareOptions(!showShareOptions)}
                    className="flex items-center gap-1 text-sm text-green-600 hover:underline hover:text-green-800 transition"
                  >
                    <FaShare className="text-2xl" />
                    Share
                  </button>

                  {/* Share Panel */}
                  {showShareOptions && (
                    <div className="absolute top-8 right-0 z-50 bg-white border shadow-lg p-4 rounded-lg grid grid-cols-3 gap-3">
                      <WhatsappShareButton url={shareUrl}>
                        <WhatsappIcon size={32} round />
                      </WhatsappShareButton>

                      <TwitterShareButton url={shareUrl}>
                        <TwitterIcon size={32} round />
                      </TwitterShareButton>

                      <LinkedinShareButton url={shareUrl}>
                        <LinkedinIcon size={32} round />
                      </LinkedinShareButton>

                      <FacebookShareButton url={shareUrl}>
                        <FacebookIcon size={32} round />
                      </FacebookShareButton>

                      <button
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(shareUrl);
                            toast.success("Link copied to clipboard!");
                          } catch {
                            toast.error("Failed to copy link.");
                          }
                        }}
                        className="flex items-center justify-center"
                      >
                        <div className="bg-gray-200 hover:bg-gray-300 rounded-full p-1">
                          <FaRegCopy className="text-md text-gray-700" />
                        </div>
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-center text-center gap-4">
                  <img
                    src={poetry.image}
                    alt={poetry.title}
                    className="h-40 w-40 object-cover rounded-full border-4 border-[#4b2e2e]"
                  />
                  <h3 className="text-sm text-[#4b2e2e] uppercase font-semibold tracking-widest">
                    {poetry.category}
                  </h3>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    {poetry.title}
                  </h1>
                  <p className="text-sm text-slate-500">
                    {poetry.date} &bull; {poetry.writerName}
                  </p>
                  {/* Like Button */}
                  <div className="mt-4">
                    <LikeButton
                      poetryId={poetry._id}
                      initialLikesCount={poetry.likesCount}
                      isInitiallyLiked={poetry.likes?.some(
                        (like) => like.userId === localStorage.getItem("userId")
                      )}
                    />
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={toggleFavorite}
                    disabled={loading}
                    className={`w-full sm:w-auto px-6 py-2 mt-4 rounded-md font-medium transition duration-200 ${
                      isFavorited
                        ? confirmRemove
                          ? "bg-red-600 text-white hover:bg-red-700"
                          : "bg-yellow-500 text-black hover:bg-yellow-600"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {loading
                      ? "Processing..."
                      : isFavorited
                      ? confirmRemove
                        ? "Confirm Remove?"
                        : "Remove from Favorites"
                      : "Add to Favorites"}
                  </button>
                </div>

                {/* Audio Player */}
                {poetry.audio && (
                  <div className="mt-6 flex justify-center">
                    <AudioSection audio={poetry.audio} />
                  </div>
                )}

                {/* Description */}
                <div className="mt-6 text-gray-700 text-base leading-relaxed whitespace-pre-line">
                  {typeof poetry.description === "string"
                    ? parse(poetry.description)
                    : null}
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20 ring-1 ring-white/10">
                <div className="absolute -inset-px rounded-2xl bg-white/20 blur-[1.5px] opacity-30 pointer-events-none"></div>

                <div className="relative z-10 space-y-6 text-gray-100">
                  {/* Logo */}
                  <div className="flex justify-center">
                    <img
                      src="/namesmall.png"
                      alt="Logo"
                      className="h-14 w-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]"
                    />
                  </div>

                  {/* Rating & Comments */}
                  <RatingSection
                    poetryId={poetry._id}
                    initialRating={poetry.averageRating || 0}
                  />
                  <CommentSection
                    poetryId={poetry._id}
                    initialComments={poetry.comments || []}
                  />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Details;
