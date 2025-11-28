"use client";

import { useEffect, useState } from "react";
import LoadingSpinner from "../../../public/Components/LoadingSpinner";

export default function AboutPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <div className="min-h-screen bg-red-50 flex justify-center items-center px-5 py-10">
      <div className="bg-white max-w-3xl w-full shadow-xl rounded-2xl p-8 border border-red-200">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-red-600 mb-6 text-center">
          About Our Blood Donation Platform
        </h1>

        <p className="text-gray-700 text-lg leading-relaxed mb-5">
          Our Blood Donation Management System is a community-driven platform
          designed to connect{" "}
          <span className="font-semibold text-red-600">blood donors</span>
          with individuals who are in urgent need of blood. We aim to make the
          donation process easier, faster, and more accessible.
        </p>

        <p className="text-gray-700 text-lg leading-relaxed mb-5">
          Through this platform, users can request blood, find donors by blood
          group, and stay connected in emergency situations. Our goal is to save
          lives by reducing the time and effort required to locate the right
          donor.
        </p>

        <p className="text-gray-700 text-lg leading-relaxed mb-5">
          Every drop of blood can bring hope. By becoming a donor or responding
          to a request, you are contributing to the health and happiness of your
          community.
        </p>

        <h2 className="text-2xl font-bold text-red-600 mt-8 mb-3">
          Our Mission
        </h2>
        <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
          <li>Make blood donation easy and accessible for everyone.</li>
          <li>Connect donors and recipients instantly.</li>
          <li>Promote awareness about the importance of blood donation.</li>
          <li>Build a strong community of life-saving volunteers.</li>
        </ul>

        <div className="mt-10 text-center">
          <p className="text-gray-700 text-lg">
            Thank you for being a part of this life-saving initiative. Together,
            we can make a difference.
          </p>
        </div>
      </div>
    </div>
  );
}
