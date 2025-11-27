import { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { signInWithGoogle, signInWithEmail } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      const res = await signInWithEmail(data.email, data.password);
      console.log("login", res);

      Swal.fire({
        title: "Login Successful!",
        text: "Welcome back!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      router.push("/");
    } catch (e) {
      console.log("login error", e.message);

      Swal.fire({
        title: "Login Failed",
        text: "Invalid email or password",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleGoogle = async () => {
    try {
      const res = await signInWithGoogle();
      console.log("Google login", res.user);

      Swal.fire({
        title: "Login Successful!",
        text: "Logged in with Google",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      router.push("/");
    } catch (e) {
      console.log(e.message);

      Swal.fire({
        title: "Google Login Failed",
        text: e.message,
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="min-h-screen min-w-screen mx-auto bg-red-50 flex items-center justify-center px-5">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 border border-red-200">
        {/* HEADER */}
        <h1 className="text-3xl font-bold text-center text-red-600">
          BloodBank
        </h1>
        <p className="text-center text-gray-600 mt-1 mb-6">
          Log in to save lives
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          {error && (
            <p className="text-red-600 text-center font-semibold">{error}</p>
          )}

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

          <button
            type="submit"
            className="btn bg-red-600 hover:bg-red-700 w-full text-white"
          >
            Login
          </button>
        </form>

        {/* OR DIVIDER */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px bg-gray-200 w-full"></div>
          <p className="text-sm text-gray-500">OR</p>
          <div className="h-px bg-gray-200 w-full"></div>
        </div>

        {/* GOOGLE LOGIN */}
        <button
          onClick={handleGoogle}
          className="btn btn-outline w-full border-red-400 text-red-600"
        >
          <FcGoogle />
          Continue with Google
        </button>

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-600 mt-5">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-red-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
