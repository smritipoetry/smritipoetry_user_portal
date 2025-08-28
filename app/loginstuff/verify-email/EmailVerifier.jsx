"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EmailVerifier() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [message, setMessage] = useState("Verifying...");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) return;

      try {
        const res = await fetch(
          `https://smriti-s-echo-admin.onrender.com/api/verify-email?token=${token}`
        );
        const data = await res.json();

        if (data.success) {
          setMessage("✅ Email verified successfully! You can now log in.");
          setIsSuccess(true);
        } else {
          setMessage(`❌ Verification failed: ${data.message}`);
        }
      } catch (error) {
        setMessage("❌ An error occurred during verification.");
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="p-8 text-center mt-72">
      <h1 className="text-xl font-semibold mb-4">{message}</h1>
      {isSuccess && (
        <button
          onClick={() => router.push("/loginstuff/auth")}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go to Login
        </button>
      )}
    </div>
  );
}
