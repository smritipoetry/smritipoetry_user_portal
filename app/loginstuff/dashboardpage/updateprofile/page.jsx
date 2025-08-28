"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/dashboardsidebar";
import Footer from "@/components/Footer";
import { base_api_url } from "@/config/Config";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaUser, FaHeart } from "react-icons/fa";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    profilePicture: null,
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const token =
        typeof window !== "undefined" && localStorage.getItem("authToken");
      if (!token) {
        setMessage("⚠️ No token found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${base_api_url}/api/user-profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (data.success) {
          setUser(data.data);
          setFormData((prev) => ({
            ...prev,
            fullName: data.data?.fullName || "",
            email: data.data?.email || "",
            profilePicture: data.data?.profilePicture || null,
          }));
        } else {
          setMessage("❌ Failed to load profile");
        }
      } catch (err) {
        console.error("Error loading profile:", err);
        setMessage("❌ Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture") {
      setFormData({ ...formData, profilePicture: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Updating...");

    const token = localStorage.getItem("authToken");
    if (!token) {
      setMessage("❌ No token found. Please log in again.");
      return;
    }

    const form = new FormData();
    form.append("fullName", formData.fullName);
    form.append("email", formData.email);
    if (formData.password) form.append("password", formData.password);
    if (formData.profilePicture) {
      form.append("profilePicture", formData.profilePicture);
    }

    try {
      const res = await fetch(`${base_api_url}/api/update-profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      const data = await res.json();
      if (data.success) {
        setMessage("✅ Profile updated successfully!");
        setUser(data.data);
        setFormData((prev) => ({ ...prev, password: "" }));
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error("Update error:", err);
      setMessage("❌ Error updating profile");
    }
  };

  if (loading) return <p className="p-8 text-center">Loading...</p>;

  return (
    <>
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
                router.push("/loginstuff/dashboardpage/favouritepoetry")
              }
              className="flex items-center text-green-600 hover:text-green-800"
            >
              <FaHeart className="mr-1" /> Favorites
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 pt-20 md:pt-20">
        {/* Sidebar */}
        <aside
          className={`fixed top-20 left-0 h-[calc(100%-5rem)] w-64 bg-white z-40 shadow-lg transform transition-transform duration-300 md:relative md:translate-x-0 md:top-0 md:h-auto ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar closeSidebar={() => setSidebarOpen(false)} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-4 sm:px-6 md:px-8 py-8 mt-16 md:mt-0">
          <h1 className="text-3xl font-bold text-center mb-8">
            Update Profile
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LEFT: Profile Info */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-center mb-4 mt-4">
                {user?.profilePicture && (
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border shadow"
                  />
                )}
              </div>
              <p className="text-center text-lg">
                <strong>Name:</strong> {user?.fullName}
              </p>
              <p className="text-center text-lg">
                <strong>Email:</strong> {user?.email}
              </p>
            </div>

            {/* RIGHT: Update Form */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 text-center">
                Update Profile
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full border rounded px-4 py-2"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full border rounded px-4 py-2"
                />

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="New Password (optional)"
                  className="w-full border rounded px-4 py-2"
                />

                <input
                  type="file"
                  name="profilePicture"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full"
                />

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
                >
                  Update Profile
                </button>
              </form>

              {message && (
                <p className="text-center text-sm text-gray-700 mt-3">
                  {message}
                </p>
              )}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
