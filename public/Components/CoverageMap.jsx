"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function CoverageMap() {
  const [serviceCenters, setServiceCenters] = useState([]);
  const [searchText, setSearchText] = useState("");

  const position = [23.685, 90.3563]; // Bangladesh center
  const mapRef = useRef(null);

  // ✅ Fetch data from public/data/areas.json
  useEffect(() => {
    fetch("/data/areas.json")
      .then((res) => res.json())
      .then((data) => setServiceCenters(data));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    const location = searchText.trim().toLowerCase();
    if (!location) return;

    const district = serviceCenters.find((c) =>
      c.district.toLowerCase().includes(location)
    );

    if (district) {
      const coord = [district.latitude, district.longitude];
      mapRef.current.flyTo(coord, 12, { duration: 1.5 });
    } else {
      alert("District not found!");
    }
  };

  return (
    <section className="w-11/12 mx-auto my-15">
      <h2 className="text-4xl font-bold text-center text-red-600 mb-4">
        We Are Available in 64 Districts
      </h2>

      <p className="text-center text-gray-600 mb-8">
        Search your district to find blood donation coverage.
      </p>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="max-w-xl mx-auto flex items-center gap-3 mb-8"
      >
        <input
          type="text"
          placeholder="Search district..."
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full border border-red-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Search
        </button>
      </form>

      {/* Map */}
      <div className="w-10/12 mx-auto h-[650px] border rounded-xl overflow-hidden shadow-lg">
        <MapContainer
          ref={mapRef}
          center={position}
          zoom={7}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {serviceCenters?.map((center, i) => (
            <Marker
              key={i}
              position={[Number(center.latitude), Number(center.longitude)]}
            >
              <Popup>
                <strong>{center.district}</strong>
                <br />
                Covered Areas: {center.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
}
