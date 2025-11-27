import { MdBloodtype, MdLocalHospital, MdPeople } from "react-icons/md";

export default function FeaturesSection() {
  const features = [
    {
      title: "Easy Blood Request",
      description:
        "Submit a blood request in minutes. We connect you with available donors instantly.",
      icon: <MdLocalHospital size={40} className="text-red-600" />,
    },
    {
      title: "Verified Donors",
      description:
        "All donors are verified and their information is kept up-to-date for fast response.",
      icon: <MdPeople size={40} className="text-red-600" />,
    },
    {
      title: "All Blood Groups",
      description:
        "Search donors from all blood groups across various districts and upazilas.",
      icon: <MdBloodtype size={40} className="text-red-600" />,
    },
  ];

  return (
    <section className="py-16 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-6">
          Why Choose Our Blood Bank?
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          We make blood donation simple, fast, and reliable — helping people
          connect with life-saving donors when they need it the most.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl shadow-md border border-red-100 hover:shadow-xl transition bg-red-50"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-red-700 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
