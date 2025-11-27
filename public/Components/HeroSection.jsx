import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className="relative w-full h-[70vh] bg-cover bg-center flex items-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1572470468728-1b2277637d30?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
          Donate Blood, <br /> Save a Life ❤️
        </h1>

        <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-xl drop-shadow-md">
          Your small act of kindness can bring hope and save someone’s life.
          Become a donor today and make a difference.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <Link
            href="/dashboard/donors"
            className="bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 shadow-lg"
          >
            Become a Donor
          </Link>

          <Link
            href="/dashboard/blood-requests"
            className="bg-white text-red-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-100 shadow-lg"
          >
            Request Blood
          </Link>
        </div>
      </div>
    </section>
  );
}
