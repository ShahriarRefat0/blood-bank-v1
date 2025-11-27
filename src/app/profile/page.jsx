import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GoPerson } from "react-icons/go";

export default function ProfilePage() {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!user?.email) return;
    const loadUser = async () => {
      try {
        const res = await fetch(`/api/user?email=${user?.email}`);
        const data = await res.json();
        setUserInfo(data.user);
      } catch (e) {
        console.log(e);
      }
    };
    loadUser();
  }, [user]);

  return (
    <div className="min-h-screen bg-red-50 flex justify-center items-center px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full border border-red-200">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
          My Profile
        </h2>

        <div className="flex justify-center mb-5">
          <div className="w-28 h-28 border rounded-full flex items-center justify-center overflow-hidden bg-white shadow">
            {user?.photoURL ? (
              <Image
                src={user.photoURL}
                alt="User Profile"
                width={120}
                height={120}
                className="object-cover rounded-full"
                unoptimized
              />
            ) : (
              <GoPerson size={60} className="text-red-500" />
            )}
          </div>
        </div>

        <div className="space-y-3 text-center">
          <p className="text-xl font-semibold text-gray-700">
            {user?.displayName || "No Name"}
          </p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>

        {/* Extra Details (Optional) */}
        {/* Extra Details */}
        <div className="mt-6 space-y-3 text-gray-700">
          <p>
            <span className="font-semibold">Blood Group:</span>{" "}
            {userInfo?.bloodGroup || "Not Added"}
          </p>

          <p>
            <span className="font-semibold">Division:</span>{" "}
            {userInfo?.userDistrict || "Not Added"}
          </p>

          <p>
            <span className="font-semibold">District:</span>{" "}
            {userInfo?.userDistrict || "Not Added"}
          </p>

          <p>
            <span className="font-semibold">City:</span>{" "}
            {userInfo?.userCity || "Not Added"}
          </p>

          <p>
            <span className="font-semibold">Phone:</span>{" "}
            {userInfo?.phoneNo || "Not Added"}
          </p>

          <p>
            <span className="font-semibold">Date of birth:</span>{" "}
            {userInfo?.dob || "Not Added"}
          </p>
        </div>

        {/* BUTTON */}
        <Link href="/profile/update-profile">
          <button className="btn bg-red-600 hover:bg-red-700 mt-5 text-white w-full">
            Update Profile
          </button>
        </Link>
      </div>
    </div>
  );
}
