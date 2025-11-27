import Image from "next/image";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Aisha Rahman",
      role: "Blood Recipient",
      message:
        "I received emergency blood during a critical moment. This platform connected me with a donor within minutes. Truly life-saving!",
      avatar: "https://i.pravatar.cc/150?img=47",
    },
    {
      name: "Shamim Ahmed",
      role: "Regular Donor",
      message:
        "Donating blood has never been easier. The system is smooth, fast, and encourages people like me to continue saving lives.",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    {
      name: "Tanisha Ali",
      role: "Volunteer",
      message:
        "I love how this platform helps people in need. The interface is clean and easy, and the mission behind it is truly inspiring.",
      avatar: "https://i.pravatar.cc/150?img=59",
    },
  ];

  return (
    <section className="py-16 px-6 md:px-12 lg:px-20 bg-red-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-6">
          What People Say
        </h2>

        <p className="text-gray-700 max-w-2xl mx-auto mb-12">
          Thousands of lives have been touched through blood donation. Here’s
          what our donors and recipients have to say.
        </p>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl border border-red-100 transition duration-300"
            >
              {/* Avatar */}
              <div className="flex justify-center mb-4">
                <Image
                  src={t.avatar}
                  width={70}
                  height={70}
                  alt={t.name}
                  className="rounded-full border-4 border-red-200"
                />
              </div>

              {/* Message */}
              <p className="text-gray-600 italic mb-4">“{t.message}”</p>

              {/* Name */}
              <h3 className="text-xl font-semibold text-red-700">{t.name}</h3>
              <p className="text-sm text-gray-500">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
