import { useEffect, useState } from "react";
import axios from "axios";
import RequestCard from "../../../../public/Components/RequestCard";
import { MdOutlineAdd } from "react-icons/md";
import Link from "next/link";

export default function AllRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get("/api/blood-request").then((res) => {
      console.log("API Response:", res.data);
      setRequests(res.data.requests);
    });
  }, []);

  console.log(requests);
  return (
    <div className="p-5 w-11/12 mx-auto my-8">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-center text-red-500">
          All Blood Requests
        </h1>
      </div>

      <Link href="/dashboard/add-blood-request">
        <button className="flex items-center text-white btn bg-red-500 mb-4">
          <MdOutlineAdd size={25} /> Add Request
        </button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {requests.map((req) => (
          <RequestCard key={req._id} req={req}></RequestCard>
        ))}
      </div>
    </div>
  );
}
