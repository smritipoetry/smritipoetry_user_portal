"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";

import Footer from "@/components/Footer";
import Sidebar from "@/components/dashboardsidebar";

const Dashboard = () => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState({
    name: "Your Name",
    email: "you@example.com",
    profilePicture: "",
  });

  // Handle user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  // Prevent scroll when sidebar is open on mobile
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
  }, [sidebarOpen]);

  const handleNavigate = (path) => {
    router.push(path);
  };

  return (
    <div className="flex flex-col min-h-screen pt-20 bg-gray-100">
      {/* Mobile Toggle Button */}
      <div className="fixed top-36 left-4 z-50 md:hidden">
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-2xl text-gray-800"
        >
          <FaBars />
        </button>
      </div>

      {/* Layout */}
      <div className="flex flex-1 relative bg-white">
        {/* Sidebar */}
        <aside
          className={`fixed top-20 left-0 h-[calc(100%-5rem)] w-64 bg-white z-50 shadow-lg transform transition-transform duration-300 md:relative md:translate-x-0 md:top-0 md:h-auto ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar closeSidebar={() => setSidebarOpen(false)} />
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 bg-white px-4 sm:px-8 md:px-10 py-6 md:ml-64 transition-all duration-300">
          <div className="bg-white shadow-md rounded-xl p-6 sm:p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Welcome to Dashboard
            </h1>
            <p className="text-gray-600">
              This is your personalized dashboard. Use the sidebar to update
              your profile or view your favorite poems.
            </p>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default Dashboard;
