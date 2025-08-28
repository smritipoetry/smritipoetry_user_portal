"use client";

import { useState } from "react";
import Footer from "../../../components/Footer";

export default function Query() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch(`${base_api_url}/api/send-query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("✅ Your message has been sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      setStatus("❌ Error: Could not send the message.");
    }

    setTimeout(() => setStatus(""), 5000);
  };

  return (
    <>
      <section className="bg-[#dfecde] text-black min-h-screen flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full bg-white shadow-xl rounded-xl p-8 border border-[#E9D8C3]">
          <h2 className="group text-5xl text-center font-bold tracking-wide mb-12 relative z-10 transition-all duration-300 hover:italic before:content-[''] group-hover:before:content-['-'] group-hover:before:mr-2">
            Contact Us
          </h2>

          {status && (
            <p className="text-center text-sm mb-4 font-medium text-[#3A6B35] bg-[#F5EDE4] p-3 rounded-md shadow-sm">
              {status}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 text-sm">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full">
                <label htmlFor="name" className="block mb-1 font-semibold">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full rounded-md bg-[#3A6B35] text-[#F5EDE4] placeholder-[#F5EDE4]/70 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3A6B35]"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="w-full">
                <label htmlFor="email" className="block mb-1 font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full rounded-md bg-[#3A6B35] text-[#F5EDE4] placeholder-[#F5EDE4]/70 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3A6B35]"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block mb-1 font-semibold">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows="5"
                className="w-full rounded-md bg-[#3A6B35] text-[#F5EDE4] placeholder-[#F5EDE4]/70 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3A6B35]"
                placeholder="Your message"
                value={formData.message}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#e7ede6] text-[#3A6B35] font-bold py-2 rounded-md uppercase tracking-wide transition duration-300 hover:opacity-90 hover:shadow-md"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}
