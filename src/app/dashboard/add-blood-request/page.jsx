"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { MdBloodtype } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddBloodRequest() {
  const [error, setError] = useState("");
  const router = useRouter()
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

  const handleReq = async (formData) => {
    try {
      const response = await axios.post("/api/blood-request", {
        data: formData,
      });
      if (response.data.success) {
        alert('Blood request submitted successfully!')
        router.push('/');
    }
    } catch (e) {
      console.log("error submite boold reque", e)
    }
  };

  return (
    <div className="min-h-screen bg-red-50 flex justify-center items-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl w-full border border-red-200">
        {/* Header */}
        <div className="flex flex-col justify-center items-center mb-6">
          <MdBloodtype color="red" size={65} />
          <h2 className="text-3xl font-bold text-red-600 mt-2">
            Blood Request Form
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Fill the details carefully to request blood
          </p>
        </div>

        {error && <p className="text-red-600 text-center mb-2">{error}</p>}

        <form onSubmit={handleSubmit(handleReq)} className="space-y-5">
          {/* Patient Name */}
          <div>
            <label className="font-semibold text-sm">Patient Name</label>
            <input
              type="text"
              {...register("patientName", {
                required: "Patient name is required",
              })}
              className="input input-bordered w-full mt-1"
              placeholder="Enter patient name"
            />
            {errors.patientName && (
              <p className="text-red-500 text-xs">
                {errors.patientName.message}
              </p>
            )}
          </div>

          {/* Blood Group + Amount */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
              {errors.bloodGroup && (
                <p className="text-red-500 text-xs">
                  {errors.bloodGroup.message}
                </p>
              )}
            </div>

            <div>
              <label className="font-semibold text-sm">Amount (bags)</label>
              <input
                type="number"
                {...register("amount", { required: "Amount is required" })}
                min="1"
                className="input input-bordered w-full mt-1"
                placeholder="How many bags?"
              />
              {errors.amount && (
                <p className="text-red-500 text-xs">{errors.amount.message}</p>
              )}
            </div>
          </div>

          {/* Date Needed */}
          <div>
            <label className="font-semibold text-sm">When Needed?</label>
            <input
              type="date"
              {...register("date", { required: "Date is required" })}
              className="input input-bordered w-full mt-1"
            />
            {errors.date && (
              <p className="text-red-500 text-xs">{errors.date.message}</p>
            )}
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
                  minLength: { value: 11, message: "Must be 11 digits" },
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

          {/* Notes */}
          <div>
            <label className="font-semibold text-sm">Notes</label>
            <textarea
              {...register("notes")}
              className="textarea textarea-bordered w-full mt-1"
              placeholder="Any additional information?"
              rows="3"
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn bg-red-600 hover:bg-red-700 text-white w-full text-lg py-2 rounded-lg"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}
