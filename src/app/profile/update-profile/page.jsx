"use client";

import { useAuth } from "@/context/AuthContext";
import { useForm, useWatch } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function UpdateProfile() {
  const { user } = useAuth() || [];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { data: areas = [] } = useQuery({
    queryKey: ["areas"],
    queryFn: async () => {
      const res = await fetch("/data/areas.json");
      return res.json();
    },
  });

  const divisions = [...new Set(areas.map((a) => a.region))];
  const userDivision = useWatch({ control, name: "userDivision" });
  const userDistrict = useWatch({ control, name: "userDistrict" });

  const districtsByDivision = (division) => {
    return areas.filter((a) => a.region === division).map((d) => d.district);
  };

  const city =
    areas.find((a) => a.region === userDivision && a.district === userDistrict)
      ?.covered_area || [];

  const handleUpdate = async (data) => {
    console.log(data);
    try {
      const response = await axios.post("/api/user", { data });

      if (response.data.success) {
        alert("Profile updated!");
        console.log("dataUpdate", response.data);
      }
    } catch (e) {
      console.log("Error:", e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-100 to-red-50 flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 border border-red-200">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-red-600">
            Update Profile
          </h1>
          <p className="text-gray-600 mt-3 text-sm">
            Update your account information
          </p>
        </div>

        <form onSubmit={handleSubmit(handleUpdate)} className="space-y-5">
          {/* Name + DOB */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-sm">Full Name</label>
              <input
                type="text"
                readOnly
                defaultValue={user?.displayName}
                {...register("name")}
                className="input input-bordered w-full mt-1"
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="font-semibold text-sm">Date of Birth</label>
              <input
                type="date"
                {...register("dob", { required: "Date of birth is required" })}
                className="input input-bordered w-full mt-1"
              />
              {errors.dob && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.dob.message}
                </p>
              )}
            </div>
          </div>

          {/* Email + Blood Group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-sm">Email</label>
              <input
                type="email"
                readOnly
                defaultValue={user?.email}
                {...register("email")}
                placeholder="example@email.com"
                className="input input-bordered w-full mt-1"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="font-semibold text-sm">Blood Group</label>
              <select
                {...register("bloodGroup", {
                  required: "Blood group is required",
                })}
                className="select select-bordered w-full mt-1"
              >
                <option value="">Select Blood Group</option>
                {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
              {errors.bloodGroup && (
                <p className="text-red-500 text-xs">
                  {errors.bloodGroup.message}
                </p>
              )}
            </div>
          </div>

          {/* Division + District */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-sm">Division</label>
              <select
                {...register("userDivision", {
                  required: "Division is required",
                })}
                className="select select-bordered w-full mt-1"
              >
                <option value="">Select Division</option>
                {divisions.map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              {errors.userDivision && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.userDivision.message}
                </p>
              )}
            </div>

            <div>
              <label className="font-semibold text-sm">District</label>
              <select
                {...register("userDistrict", {
                  required: "District is required",
                })}
                className="select select-bordered w-full mt-1"
              >
                <option value="">Select District</option>
                {districtsByDivision(userDivision)?.map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              {errors.userDistrict && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.userDistrict.message}
                </p>
              )}
            </div>
          </div>

          {/* Upazila + Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-sm">Upazila</label>
              <select
                {...register("userCity", {
                  required: "City / Upazila is required",
                })}
                className="select select-bordered w-full mt-1"
              >
                <option value="">Select Upazila</option>
                {city.map((c, i) => (
                  <option key={i} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              {errors.userCity && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.userCity.message}
                </p>
              )}
            </div>

            <div>
              <label className="font-semibold text-sm">Phone No.</label>
              <input
                type="text"
                {...register("phoneNo", {
                  required: "Phone number is required",
                })}
                className="input input-bordered w-full mt-1"
                placeholder="01XXXXXXXX"
              />
              {errors.phoneNo && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phoneNo.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn bg-red-600 hover:bg-red-700 w-full text-white py-2 rounded-lg"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
