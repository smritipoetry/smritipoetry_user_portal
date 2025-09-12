"use client";

import React, { useState } from "react";
import axios from "axios";
import Footer from "../../components/Footer";
import { base_api_url } from "@/config/Config";

export default function SubmitPoetryPage() {
  // State to hold form data
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [poetryText, setPoetryText] = useState("");
  const [audio, setAudio] = useState(null);
  const [acknowledged, setAcknowledged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // Message for success or error

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "fullName") setFullName(value);
    if (name === "email") setEmail(value);
    if (name === "category") setCategory(value);
    if (name === "title") setTitle(value);
    if (name === "poetryText") setPoetryText(value);
  };

  const handleFileChange = (e) => {
    setAudio(e.target.files[0]);
  };

  const handleCheckboxChange = (e) => {
    setAcknowledged(e.target.checked);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!acknowledged) {
      setMessage("You must acknowledge the terms.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("category", category);
    formData.append("title", title);
    formData.append("poetryText", poetryText);

    if (audio) {
      formData.append("audio", audio);
    }

    try {
      const response = await axios.post(
        `${base_api_url}/api/submitpoetry`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Required for sending files
          },
        }
      );

      // Clear form fields after successful submission
      setFullName("");
      setEmail("");
      setCategory("");
      setTitle("");
      setPoetryText("");
      setAudio(null);
      setAcknowledged(false);

      setMessage("Poetry submitted successfully!");
      setLoading(false);
    } catch (error) {
      setMessage("Error submitting poetry. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full mx-auto gap-6 bg-[#dfecde] rounded-lg shadow-lg mt-20">
      {/* Main Content - Centered Layout */}
      <div className="flex flex-col lg:flex-row gap-6 justify-center items-center mt-5">
        {/* Left Column - Submission Form */}
        <div className="flex-1 max-w-6xl bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold text-gray-900 mb-4 flex justify-center items-center">
            Submit your work
          </h1>
          <p className="mb-6 text-md text-gray-700 flex justify-center items-center">
            Share your work with us. Upload your Poetry and get a chance to be
            featured on my Website.
          </p>

          {/* Guidelines */}
          <div className="mb-6 space-y-3 text-sm text-gray-800 ">
            <h3 className="text-lg font-semibold text-gray-950 ">
              Guidelines:
            </h3>
            <ul className="list-inside list-disc flex flex-col ">
              <li>
                Poetry submission is preferred in English and Devanagari script.
              </li>
              <li>Only one poetry can be submitted at a time.</li>
              <li>Plagiarized work will not be accepted.</li>
              <li>Sharing inappropriate content is strictly prohibited.</li>
            </ul>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <input
              type="text"
              name="fullName"
              value={fullName}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />

            {/* Poetry Category Dropdown */}
            <div className="mb-6">
              <select
                name="category"
                value={category}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">---Select Category---</option>
                <option value="Love">Love</option>
                <option value="Pain">Pain</option>
                <option value="Hope">Hope</option>
                <option value="Silence">Silence</option>
                <option value="Strength">Strength</option>
                <option value="Heartbreak">Heartbreak</option>
                <option value="Inspiration">Inspiration</option>
                <option value="Reflective">Reflective</option>
                <option value="Devotion">Devotion</option>
                <option value="Loneliness">Loneliness</option>
                <option value="Peace">Peace</option>
                <option value="Freedom">Freedom</option>
              </select>
            </div>

            <input
              type="text"
              name="title"
              value={title}
              onChange={handleInputChange}
              placeholder="Poetry Title"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="poetryText"
              value={poetryText}
              onChange={handleInputChange}
              placeholder="Write your poetry here..."
              rows={5}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />

            {/* Audio File Upload
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            /> */}

            {/* Acknowledgment Checkbox */}
            <label className="text-sm text-gray-600 flex items-start space-x-2 mb-6">
              <input
                type="checkbox"
                checked={acknowledged}
                onChange={handleCheckboxChange}
                className="mt-1"
              />
              <span>
                I acknowledge that Smriti's Echoes reserves the right to
                reproduce, communicate, and use submitted poetry for commercial
                use.
              </span>
            </label>

            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-[#C1440E] hover:bg-[#a6370d] text-white rounded-lg transition duration-200"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Continue Submission"}
            </button>

            {message && (
              <p className="text-center mt-4 text-green-700">{message}</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
