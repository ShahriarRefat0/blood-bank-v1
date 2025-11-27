"use client";

import { useNavigate } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/context/AuthContext"; 
import { useForm } from "react-hook-form";
import { redirect, useRouter } from "next/navigation";


export default function RegisterPage() {
  const router = useRouter()
  const { user, signInWithGoogle, createUser, updateUser } = useAuth();
  const { register,
    handleSubmit, formState: {errors}, } = useForm()  
  
   const handleGoogle = () => {
     signInWithGoogle()
       .then((res) => {
         //console.log(res.user);
         router.push('/')
       })
       .catch((e) => {
         console.log(e.message);
       });
  };
  
  const handleCreateUer = async (data) => {

    try {
      const res = await createUser(data.email, data.password)
      await updateUser({
        displayName: data.name,
        photoURL: data.photoURL,
        
      })
      //console.log('user created:', res.user)
      router.push('/')
    } catch (e) {
      console.log('error', e.message)
    }
  }

  
  return (
    <div className="min-h-screen bg-linier-to-b from-red-100 to-red-50 flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 border border-red-200">
        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-red-600 tracking-wide">
            BloodBank
          </h1>
          <p className="text-gray-600 mt-1 text-sm">Join & Help Saving Lives</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(handleCreateUer)} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="font-semibold text-sm">Full Name</label>
            <input
              type="text"
              {...register("name", {
                required: "Name is required",
                minLength: { value: 3, message: "Minimum 3 characters" },
              })}
              className="input input-bordered w-full mt-1 focus:outline-red-500"
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="font-semibold text-sm">Photo URL</label>
            <input
              type="url"
              {...register("photoURL", {
                required: "Photo URL is required",
                // pattern: {
                //   value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|svg|webp|gif))$/i,
                //   message: "Enter a valid image URL (jpg, png, svg, webp)",
                // },
              })}
              className="input input-bordered w-full mt-1 focus:outline-red-500"
              placeholder="https://example.com/photo.jpg"
            />

            {errors.photoURL && (
              <p className="text-red-500 text-xs mt-1">
                {errors.photoURL.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="font-semibold text-sm">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Valid email required",
                },
              })}
              placeholder="example@email.com"
              className="input input-bordered w-full mt-1 focus:outline-red-500"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="font-semibold text-sm">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              placeholder="Enter password"
              className="input input-bordered w-full mt-1 focus:outline-red-500"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="btn bg-red-600 hover:bg-red-700 w-full text-white py-2 mt-3 rounded-lg shadow-md"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px bg-gray-300 w-full"></div>
          <p className="text-sm text-gray-500">OR</p>
          <div className="h-px bg-gray-300 w-full"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogle}
          className="btn btn-outline w-full border-red-400 text-red-600 hover:bg-red-50"
        >
          <FcGoogle size={22} />
          Continue with Google
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-5">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-red-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
