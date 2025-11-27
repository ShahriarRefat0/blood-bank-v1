import Link from "next/link";
import React from "react";
import { MdBloodtype } from "react-icons/md";

export default function RequestCard({ req }) {
  const { patientName, bloodGroup, userDistrict, userCity, _id } = req;
  return (
    <Link href={`/dashboard/blood-requests/${_id}`}>
      <div className="max-w-md h-32 bg-white shadow-md rounded-lg p-6 flex items-center gap-6 border border-red-500">
        {/* Left Icon */}
        <div className="w-20 h-20 flex items-center justify-center border-4 border-red-500 rounded-full">
          <MdBloodtype color="red" size={55} />
        </div>

        {/* Right Info */}
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Name</span> &nbsp;&nbsp;{" "}
            {patientName}
          </p>
          <p>
            <span className="font-semibold">Group</span> &nbsp;&nbsp;{" "}
            {bloodGroup}
          </p>
          <p>
            <span className="font-semibold">District</span> &nbsp;&nbsp;
            {userCity}, {userDistrict}
          </p>
        </div>
      </div>
    </Link>
  );
}
