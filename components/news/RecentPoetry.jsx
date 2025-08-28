"use client";
import { useEffect, useState } from "react";
import PoetryCard from "./items/PoetryCard";
import { base_api_url } from "../../config/Config";

const RecentPoetry = () => {
  const [poems, setPoems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPoetry = async () => {
      try {
        const res = await fetch(`${base_api_url}/api/recent/poetry`);
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setPoems(Array.isArray(data.poetry) ? data.poetry : []);
      } catch (err) {
        console.error("Failed to load recent poems:", err);
        setError("Error loading poems.");
      }
    };

    fetchPoetry();
  }, []);

  return (
    <div className="w-full flex flex-col gap-y-[14px] pt-4">
      {error && <p className="text-red-600 text-center">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {poems && poems.length > 0 ? (
          poems.slice(0, 3).map((item, i) => <PoetryCard key={i} item={item} />)
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No poems found.
          </p>
        )}
      </div>
    </div>
  );
};

export default RecentPoetry;
