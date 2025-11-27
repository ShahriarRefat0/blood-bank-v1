import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GoPerson } from "react-icons/go";

export default function DonorCard({ donor }) {

  return (
    <Link href={`/dashboard/donors/${donor._id}`}>
      <div className="max-w-md bg-white shadow-md rounded-lg p-6 flex items-center gap-6 border border-red-500">
        {/* Left Icon */}
        <div className="w-20 bg-gray-100 h-20 flex items-center justify-center border-4 border-red-500 rounded-full">
          { 
            donor.photoURL ? ( <Image
            src={donor.photoURL}
            alt={donor.donorName}
            width={120}
            height={120}
            className="object-cover rounded-full"
            unoptimized
          />) : <GoPerson color="red" size={55} ></GoPerson>
          }
        </div>

        {/* Right Info */}
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Name</span> &nbsp;&nbsp;{" "}
            {donor?.donorName}
          </p>
          <p>
            <span className="font-semibold">Group</span> &nbsp;&nbsp;{" "}
            {donor.bloodGroup}
          </p>
          <p>
            <span className="font-semibold">Location</span> &nbsp;&nbsp;{" "}
            {donor.userDistrict},{donor.userDivision}
          </p>
        </div>
      </div>
    </Link>
  );
}
