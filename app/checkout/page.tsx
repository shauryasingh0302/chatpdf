"use client";

import { useEffect } from "react";
import axios from "axios";

export default function CheckoutPage() {
  useEffect(() => {
    const checkout = async () => {
      const res = await axios.get("/api/stripe");
      window.location.href = res.data.url;
    };

    checkout();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-lg font-medium text-black">
        Redirecting to Stripe...
      </p>
    </div>
  );
}