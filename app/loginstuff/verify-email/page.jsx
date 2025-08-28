"use client";
export const dynamic = "force-dynamic"; // force client-only rendering

import { Suspense } from "react";
import EmailVerifier from "./EmailVerifier";

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="text-center mt-72">Loading...</div>}>
      <EmailVerifier />
    </Suspense>
  );
}
