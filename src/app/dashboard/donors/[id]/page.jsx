//import { User, Phone, Calendar, MapPin, FileText, Droplet } from "lucide-react";
import clientPromise from "@/lib/mongoDb";
import { ObjectId } from "mongodb";
import Image from "next/image";
import Link from "next/link";
import { GoPerson } from "react-icons/go";
import {
  MdBloodtype,
  MdPhone,
  MdCalendarMonth,
  MdLocationOn,
  MdOutlineSpeakerNotes,
} from "react-icons/md";

export default async function DonorDetails({ params }) {
  const { id } = await params;

  // Fetch donor from DB
  const client = await clientPromise;
  const db = client.db("blood-bankDB");
  const donor = await db
    .collection("donors")
    .findOne({ _id: new ObjectId(id) });

  if (!donor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-xl font-bold">Donor not found!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-red-50 to-pink-50 flex items-center justify-center py-6 px-4 sm:py-12">
      <div className="w-full max-w-4xl">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header Section with Gradient */}
          <div className="bg-gradient-to-r from-red-500 to-rose-600 px-6 py-8 sm:px-8 sm:py-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-white opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, white 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              ></div>
            </div>

            <div className="relative flex flex-col items-center text-center">
              {/* Profile Photo */}
              <div className="relative">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-white shadow-xl flex items-center justify-center ring-4 ring-white ring-opacity-50">
                  {donor.photoURL ? (
                    <Image
                      src={donor?.photoURL}
                      alt="Donor Photo"
                      width={150}
                      height={150}
                      className="object-cover rounded-full"
                      unoptimized
                    />
                  ) : (
                    <GoPerson size={48} className="text-red-500" />
                  )}
                </div>
                {/* Blood Type Badge */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="bg-white text-red-600 px-4 py-1.5 rounded-full text-sm font-bold shadow-lg flex items-center gap-1.5 border-2 border-red-100">
                    <MdBloodtype size={18} />
                    {donor.bloodGroup}
                  </div>
                </div>
              </div>

              {/* Name */}
              <h1 className="text-3xl sm:text-4xl font-bold mt-8 text-white drop-shadow-md">
                {donor.donorName}
              </h1>
              <p className="text-red-100 mt-2 text-sm sm:text-base">
                Blood Donor
              </p>
            </div>
          </div>

          {/* Content Section */}
          <div className="px-6 py-8 sm:px-8 sm:py-10">
            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {/* Phone */}
              <div className="group">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-red-50 to-rose-50 hover:shadow-md transition-all duration-300 border border-red-100">
                  <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow flex-shrink-0">
                    <MdPhone size={22} className="text-red-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-red-600 uppercase tracking-wide mb-1">
                      Phone
                    </p>
                    <p className="font-semibold text-gray-800 text-sm sm:text-base break-all">
                      {donor.phoneNo}
                    </p>
                  </div>
                </div>
              </div>

              {/* Age */}
              <div className="group">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-red-50 to-rose-50 hover:shadow-md transition-all duration-300 border border-red-100">
                  <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow flex-shrink-0">
                    <MdCalendarMonth size={22} className="text-red-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-red-600 uppercase tracking-wide mb-1">
                      Age
                    </p>
                    <p className="font-semibold text-gray-800 text-sm sm:text-base">
                      {donor.age} years
                    </p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="group sm:col-span-2">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-red-50 to-rose-50 hover:shadow-md transition-all duration-300 border border-red-100">
                  <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow flex-shrink-0">
                    <MdLocationOn size={22} className="text-red-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-red-600 uppercase tracking-wide mb-1">
                      Location
                    </p>
                    <p className="font-semibold text-gray-800 text-sm sm:text-base break-words">
                      {donor.userCity}, {donor.userDistrict},{" "}
                      {donor.userDivision}
                    </p>
                  </div>
                </div>
              </div>

              {/* Last Donation */}
              <div className="group sm:col-span-2">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-red-50 to-rose-50 hover:shadow-md transition-all duration-300 border border-red-100">
                  <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow flex-shrink-0">
                    <MdBloodtype size={22} className="text-red-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-red-600 uppercase tracking-wide mb-1">
                      Last Donation
                    </p>
                    <p className="font-semibold text-gray-800 text-sm sm:text-base">
                      {donor.lastDonation || "Never Donated"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes Section */}
            {donor.notes && (
              <div className="mt-6 sm:mt-8">
                <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <MdOutlineSpeakerNotes
                        size={20}
                        className="text-amber-600"
                      />
                    </div>
                    <h3 className="font-bold text-amber-900 text-lg">Notes</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base ml-11">
                    {donor.notes}
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/dashboard/donors"
                className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold py-3.5 px-6 rounded-xl hover:from-red-700 hover:to-rose-700 transition-all duration-300 text-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Back to Donor List
              </Link>
              <button className="flex-1 bg-white text-red-600 font-semibold py-3.5 px-6 rounded-xl border-2 border-red-600 hover:bg-red-50 transition-all duration-300 text-center shadow-md hover:shadow-lg">
                Contact Donor
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center mt-6 text-sm text-gray-600">
          Thank you for being a life saver!
        </p>
      </div>
    </div>
  );
}
