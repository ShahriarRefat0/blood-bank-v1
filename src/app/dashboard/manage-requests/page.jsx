import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { MdDelete, MdVisibility } from "react-icons/md";
import Swal from "sweetalert2";
import { useAuth } from "@/context/AuthContext";

export default function ManageRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    axios
      .get(`/api/blood-request?user=${user?.email}`)
      .then((res) => {
        setRequests(res.data?.requests || []);
      })
      .catch((err) => console.log("Fetch error", err))
      .finally(() => setLoading(false));
  }, []);

  // Delete request handler
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/blood-request/${id}`);
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          if (res.data.success) {
            setRequests(requests.filter((r) => r._id !== id));
            Swal.fire({
              title: "Deleted!",
              text: "Your request has been deleted.",
              icon: "success",
            });
          }
        }
      });
    } catch (e) {
      console.log("Delete error:", e);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-xl font-bold">
          Loading your requests...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-red-50 px-6 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-6 text-center">
        Manage Your Blood Requests
      </h1>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full bg-white shadow-lg rounded-xl border border-red-200">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Patient</th>
              <th className="py-3 px-4 text-left">Blood Group</th>
              <th className="py-3 px-4 text-left">District</th>
              <th className="py-3 px-4 text-left">Date Needed</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req) => (
              <tr key={req._id} className="border-b">
                <td className="py-3 px-4">{req.patientName}</td>
                <td className="py-3 px-4 font-bold text-red-600">
                  {req.bloodGroup}
                </td>
                <td className="py-3 px-4">
                  {req.userDistrict}, {req.userDivision}
                </td>
                <td className="py-3 px-4">{req.date}</td>

                <td className="py-3 px-4 text-center flex gap-3 justify-center">
                  <Link
                    href={`/dashboard/blood-requests/${req._id}`}
                    className=" hover:underline flex items-center gap-1"
                  >
                    <MdVisibility /> View
                  </Link>

                  <button
                    onClick={() => handleDelete(req._id)}
                    className="text-red-600 hover:underline flex items-center gap-1"
                  >
                    <MdDelete /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="grid md:hidden grid-cols-1 gap-6 mt-6">
        {requests.map((req) => (
          <div
            key={req._id}
            className="bg-white p-6 rounded-xl shadow-md border border-red-200"
          >
            <h2 className="text-xl font-semibold text-red-600">
              {req.patientName}
            </h2>

            <p className="text-gray-600 mt-1">
              Blood: <strong>{req.bloodGroup}</strong>
            </p>
            <p className="text-gray-600">
              Location: {req.userCity}, {req.userDistrict}
            </p>
            <p className="text-gray-600">Needed: {req.date}</p>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-4">
              <Link
                href={`/dashboard/blood-requests/${req._id}`}
                className="bg-gray-200 text-black px-4 py-2 rounded-lg flex items-center gap-1"
              >
                <MdVisibility /> View
              </Link>

              <button
                onClick={() => handleDelete(req._id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-1"
              >
                <MdDelete /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
