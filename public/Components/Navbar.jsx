"use client";

import Link from "next/link";
import { GoPersonFill } from "react-icons/go";
import { TbBoxModel } from "react-icons/tb";
import { IoLogOut } from "react-icons/io5";
import { IoPersonAddSharp } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { GoPerson } from "react-icons/go";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Navbar() {
  const { user, signOutUser } = useAuth();
  const router = useRouter();

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform logout
        signOutUser()
          .then(() => {
            Swal.fire({
              title: "Logged Out!",
              text: "You have been logged out successfully.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });

            router.push("/");
          })
          .catch((e) => {
            Swal.fire("Error", e.message, "error");
          });
      }
    });
  };

  const links = (
    <>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/about">About</Link>
      </li>
      <li>
        <Link href="/dashboard/donors">Donors</Link>
      </li>
      <li>
        <Link href="/dashboard/blood-requests">Blood Requests</Link>
      </li>
    </>
  );

  return (
    <div className="bg-[#EB2C29] shadow-md">
      <div className="navbar mx-auto w-11/12  text-white font-semibold ">
        {/* LEFT (Logo + Mobile Menu) */}
        <div className="navbar-start">
          {/* Mobile Menu */}
          <div className="dropdown lg:hidden">
            <button tabIndex={0} className="btn btn-ghost p-0 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white text-black rounded-box w-56"
            >
              {links}
            </ul>
          </div>

          {/* LOGO */}
          <Link href="/" className="text-2xl font-extrabold">
            BloodBank
          </Link>
        </div>

        {/* CENTER (Desktop Menu) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">{links}</ul>
        </div>

        {/* RIGHT (User + Login/Register) */}
        <div className="navbar-end flex items-center gap-4">
          {/* Profile Dropdown */}
          {user ? (
            <div className="dropdown dropdown-end  ">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-9 rounded-full border bg-white">
                  {user?.photoURL ? (
                    <Image
                      src={user.photoURL}
                      alt="User"
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="flex items-center justify-center">
                      <GoPerson color="red" size={30} />
                    </div>
                  )}
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white text-gray-600 rounded-box w-56"
              >
                <div className="pb-3 border-b text-gray-600">
                  <p className="font-bold text-sm">{user?.displayName}</p>
                  <p className="text-xs">{user?.email}</p>
                </div>

                <li className="mt-3">
                  <Link href="/profile">
                    <GoPersonFill />
                    My Profile
                  </Link>
                </li>

                <li>
                  <Link href="/dashboard/add-donor">
                    <IoPersonAddSharp /> Add Donor
                  </Link>
                </li>

                <li>
                  <Link href="/dashboard/manage-requests">
                    <MdManageAccounts />
                    Manage Request
                  </Link>
                </li>

                <li>
                  <button
                    onClick={handleLogOut}
                    className="btn btn-xs bg-red-500 text-white w-full mt-2"
                  >
                    <IoLogOut /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-2 text-white text-sm">
              <Link href="/login" className="underline">
                Login
              </Link>
              <span>or</span>
              <Link href="/register" className="underline">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
