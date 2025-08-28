"use client";

import React, { useState, useEffect } from "react";
import { base_api_url } from "../../config/Config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { useRouter } from "next/navigation";

const RatingSection = ({ poetryId, initialRating, userRating }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasRated, setHasRated] = useState(false);
  const [averageRating, setAverageRating] = useState(initialRating || 0);
  const router = useRouter();

  const fetchAverageRating = async () => {
    try {
      const res = await fetch(`${base_api_url}/api/poetry/rating/${poetryId}`);
      if (res.ok) {
        const data = await res.json();
        setAverageRating(data.averageRating || 0);
      }
    } catch (error) {
      console.error("Error fetching average rating:", error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      const hasUserRated = localStorage.getItem(`hasRated-${poetryId}`);
      const savedRating = localStorage.getItem(`rating-${poetryId}`);

      fetchAverageRating();

      setIsAuthenticated(!!token);

      if (hasUserRated === "true" && savedRating) {
        setHasRated(true);
        setRating(savedRating);
      } else {
        setHasRated(false);
        setRating(0);
      }

      if (userRating) {
        setRating(userRating);
      }
    }
  }, [userRating, poetryId]);

  const handleRatingSubmit = async () => {
    if (!isAuthenticated) {
      alert("Please log in to submit a rating.");
      return;
    }

    if (hasRated) {
      alert("You have already submitted a rating.");
      return;
    }

    if (rating === 0) {
      alert("Please select a rating before submitting.");
      return;
    }

    try {
      const res = await fetch(`${base_api_url}/api/add-rating/${poetryId}`, {
        method: "POST",
        body: JSON.stringify({ star: rating }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            typeof window !== "undefined"
              ? localStorage.getItem("authToken")
              : ""
          }`,
        },
      });

      const data = await res.json();
      if (data.message === "Rating added successfully") {
        localStorage.setItem(`hasRated-${poetryId}`, "true");
        localStorage.setItem(`rating-${poetryId}`, rating);
        setHasRated(true);
        await fetchAverageRating();
        alert("Thank you for your rating!");
      } else {
        alert("There was an error while submitting your rating.");
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("Something went wrong while submitting your rating.");
    }
  };

  return (
    <div className="w-full px-4 mt-10">
      <div className="rounded-2xl p-6 shadow-2xl  border border-black text-black max-w-md mx-auto transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.1)]">
        <h3 className="text-black text-2xl  font-serif mb-4 tracking-wide">
          User Ratings
        </h3>

        {/* Rating Summary */}
        <div className="flex items-center gap-6 mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center text-yellow-500 text-3xl font-light ">
              {averageRating.toFixed(1)}
              <FontAwesomeIcon icon={solidStar} className="ml-1" />
            </div>
            <div className="text-sm text-gray-600 mt-1">out of 5</div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex gap-1 mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FontAwesomeIcon
                  key={star}
                  icon={solidStar}
                  className={`text-xl ${
                    averageRating >= star
                      ? "text-yellow-500"
                      : averageRating >= star - 0.5
                      ? "text-yellow-400"
                      : "text-gray-500"
                  }`}
                />
              ))}
            </div>
            <div className="text-xs text-gray-600">
              {hasRated
                ? `You rated ${rating} star${rating > 1 ? "s" : ""}`
                : "Rate this poem"}
            </div>
          </div>
        </div>

        {/* Star Rating Input */}
        <div className="flex justify-center gap-3 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <div
              key={star}
              className={`cursor-pointer text-3xl transition-all duration-200 transform hover:scale-110 ${
                star <= (hoveredRating || rating)
                  ? "text-yellow-400"
                  : "text-gray-600"
              }`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
            >
              <FontAwesomeIcon
                icon={
                  star <= (hoveredRating || rating) ? solidStar : regularStar
                }
              />
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleRatingSubmit}
          className={`w-full py-2 rounded-lg text-center font-medium transition duration-300 ${
            hasRated
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
          disabled={rating === 0 || hasRated}
        >
          {hasRated ? "Rating Submitted" : "Submit Rating"}
        </button>

        {/* Feedback Message */}
        {hasRated && (
          <div className="mt-3 text-sm text-green-600 text-center">
            You rated this {rating} star{rating > 1 ? "s" : ""}.
          </div>
        )}
        {!isAuthenticated && !hasRated && (
          <div className="mt-3 text-sm text-red-400 text-center">
            Please log in to submit your rating.
          </div>
        )}
      </div>
    </div>
  );
};

export default RatingSection;
