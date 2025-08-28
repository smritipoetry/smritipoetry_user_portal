"use client";

import React, { useState, useEffect } from "react";
import { base_api_url } from "../../config/Config";

const CommentSection = ({ poetryId, initialComments }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(initialComments);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  // Fetch auth details every time component re-renders
  const fetchAuthDetails = () => {
    const token = localStorage.getItem("authToken");
    const fullName = localStorage.getItem("fullName");

    if (token) {
      setIsAuthenticated(true);
      setUserName(fullName || "");
    } else {
      setIsAuthenticated(false);
      setUserName("");
    }
  };

  useEffect(() => {
    fetchAuthDetails();

    const handleStorageChange = () => {
      fetchAuthDetails();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleCommentSubmit = async () => {
    fetchAuthDetails();

    if (!comment.trim()) {
      alert("Please enter your comment.");
      return;
    }

    if (!isAuthenticated) {
      alert("You must be logged in to submit a comment.");
      return;
    }

    try {
      const res = await fetch(`${base_api_url}/api/add-comment/${poetryId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ name: userName, comment }),
      });

      const data = await res.json();
      if (data.message === "Comment added") {
        setComments((prevComments) => [
          ...prevComments,
          { name: userName, text: comment },
        ]);
        setComment("");
        alert("Comment added successfully!");
      } else {
        alert("There was an error adding your comment.");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Error adding comment. Please try again.");
    }
  };

  return (
    <div className="w-full pb-4 mt-5">
      <div className="flex flex-col w-full gap-y-3">
        <h2 className="text-lg font-semibold text-gray-700">Comments</h2>

        {/* Comment submission section */}
        <div className="mt-3">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            rows={3}
            className="w-full p-1.5 border rounded-md mb-2 text-sm text-gray-800"
          />
          <button
            onClick={handleCommentSubmit}
            className="w-full py-2 bg-blue-600 text-white rounded-md text-sm"
          >
            Submit Comment
          </button>
        </div>

        {/* Not Authenticated Warning */}
        {!isAuthenticated && (
          <p className="text-red-500 mt-2">
            You must be logged in to submit a comment.
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
