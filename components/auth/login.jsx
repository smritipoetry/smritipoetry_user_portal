"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { base_api_url } from "@/config/Config";
import { useAuth } from "../../context/authContext";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const response = urlParams.get("response");

    if (response) {
      try {
        const parsedResponse = JSON.parse(decodeURIComponent(response));
        if (parsedResponse.success && parsedResponse.token) {
          localStorage.setItem("authToken", parsedResponse.token);
          localStorage.setItem("user", JSON.stringify(parsedResponse.user));
          router.push("/"); // Redirect to the home page or dashboard
        } else {
          console.error("Google login failed: ", parsedResponse.message);
        }
      } catch (error) {
        console.error("Error parsing Google login response: ", error);
      }
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    if (isLogin) {
      // Handle login
      try {
        const response = await fetch(`${base_api_url}/api/user-login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();

        if (data.success) {
          const userData = {
            name: data.data?.user?.fullName || "User",
            email: data.data?.user?.email || email,
            profilePicture: data.data?.user?.profilePicture || null,
          };
          localStorage.setItem("user", JSON.stringify(userData));
          localStorage.setItem("authToken", data.token);
          setProfileImage(userData.profilePicture);

          setSuccessMessage("Login successful!");
          login(userData, data.token);
          router.push("/");
        } else {
          setErrorMessage(data.message || "Login failed. Please try again.");
        }
      } catch (error) {
        setErrorMessage("Error logging in: " + error.message);
      } finally {
        setLoading(false);
      }
    } else {
      // Handle signup
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match.");
        setLoading(false);
        return;
      }

      try {
        const formData = new FormData();
        formData.append("fullName", fullName);
        formData.append("email", email);
        formData.append("password", password);

        if (fileInputRef.current?.files[0]) {
          formData.append("profilePicture", fileInputRef.current.files[0]); // ✅ Attach profile picture
        }

        const signupResponse = await fetch(`${base_api_url}/api/user-signup`, {
          method: "POST",
          body: formData,
        });
        const signupData = await signupResponse.json();

        if (signupData.success) {
          setSuccessMessage(
            "Account created successfully! Please verify your email before logging in."
          );

          setTimeout(() => {
            setIsLogin(true); // Switch to login mode
            setFullName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setProfileImage(null);
          }, 2500); // Wait before switching to login
        } else {
          setErrorMessage(
            signupData.message || "Signup failed. Please try again."
          );
        }
      } catch (error) {
        setErrorMessage("Error signing up: " + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Update profile image preview
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fefaf3] ">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md mt-32">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/namesmall.png" alt="Logo" className="h-20" />
        </div>

        <h2 className="text-xl font-bold mb-6 text-center text-green-800">
          {isLogin ? "Login to your Account" : "Create an Account"}
        </h2>

        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="text-green-600 text-center mb-4">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar upload */}
          {!isLogin && (
            <div className="flex flex-col items-center space-y-2 mb-4">
              <div
                className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden cursor-pointer hover:opacity-80"
                onClick={triggerFileInput}
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 text-3xl">
                    +
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              <p className="text-sm text-gray-500">Upload Profile Picture</p>
            </div>
          )}

          {/* Full Name */}
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          )}

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer text-green-900"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {/* Confirm Password */}
          {!isLogin && (
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 cursor-pointer text-green-900"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-800 text-white py-2 rounded-md hover:bg-green-700 transition duration-300 disabled:opacity-50"
            disabled={loading}
          >
            {loading
              ? isLogin
                ? "Logging in..."
                : "Signing up..."
              : isLogin
              ? "Login"
              : "Sign Up"}
          </button>
        </form>

        {/* Switch */}
        <p className="text-center mt-4 text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-700 cursor-pointer hover:underline"
          >
            {isLogin ? "Sign up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
