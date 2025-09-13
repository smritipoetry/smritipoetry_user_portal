"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { base_api_url } from "@/config/Config";
import Footer from "@/components/Footer";
import Sidebar from "@/components/dashboardsidebar";
import axios from "axios";
import { useAuth } from "../../../../context/authContext";

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "Your Name",
    email: "you@example.com",
    profilePicture: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleNavigate = (path) => {
    router.push(path);
  };

  const { logout } = useAuth(); // get logout from context

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "⚠️ Are you sure you want to permanently delete your account? This action cannot be undone!"
      )
    ) {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          alert("No token found. Please log in again.");
          return;
        }

        await axios.delete(`${base_api_url}/api/delete-account`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        alert("✅ Your account has been permanently deleted.");

        // 🔹 Clear state + localStorage at once
        logout();

        // 🔹 Redirect
        router.push("/");
      } catch (error) {
        console.error(
          "❌ Delete Account Error:",
          error.response?.data || error
        );
        alert("Failed to delete account. Please try again later.");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 pt-20">
      <div className="flex flex-col md:flex-row flex-1 w-full">
        {/* Sidebar - Only visible on md and larger screens */}
        <aside className="hidden md:block md:w-1/4 lg:w-1/5">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-4 sm:px-6 md:px-8 py-6 md:mt-28">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 ">
            Your Profile
          </h1>

          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-center mb-4">
                {user?.profilePicture && (
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-amber-950 object-cover shadow"
                  />
                )}
              </div>
              <p className="text-center text-base sm:text-lg">
                <strong>Name:</strong> {user?.name}
              </p>
              <p className="text-center text-base sm:text-lg">
                <strong>Email:</strong> {user?.email}
              </p>
              {/* 🔹 Delete Account Button */}
              <button
                onClick={handleDeleteAccount}
                className="flex items-center space-x-3 text-red-600 hover:text-red-800 font-medium mt-10"
              >
                <FaTrash className="text-xl" />
                <span>Delete Account</span>
              </button>
            </div>
          </div>
        </main>
      </div>
      {/* Quick Actions for Mobile */}
      <div className="md:hidden bg-white shadow-sm mb-4 p-4">
        <div className="flex justify-around gap-4">
          <button
            onClick={() =>
              handleNavigate("/loginstuff/dashboardpage/updateprofile")
            }
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            Update Profile
          </button>
          <button
            onClick={() =>
              handleNavigate("/loginstuff/dashboardpage/favouritepoetry")
            }
            className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            Favorite Poems
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
