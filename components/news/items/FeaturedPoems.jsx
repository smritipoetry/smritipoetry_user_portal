"use client";
import { useEffect, useState } from "react";
import { base_api_url } from "../../../config/Config";
import Link from "next/link";

const FeaturedPoems = () => {
  const [featuredPoems, setFeaturedPoems] = useState([]);
  const [error, setError] = useState(null);
  const defaultImage = "/images/placeholder.jpg";

  useEffect(() => {
    fetch(`${base_api_url}/api/featured/poetry`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data.featuredPoetry)) {
          setFeaturedPoems(data.featuredPoetry);
        } else {
          console.warn("Unexpected response structure:", data);
          setFeaturedPoems([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching featured poems:", error);
        setError("Failed to load featured poems.");
      });
  }, []);

  return (
    <section className="w-full py-6 px-4 md:px-8 lg:px-16">
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <div className="grid grid-cols-1 gap-8">
        {featuredPoems.length > 0
          ? featuredPoems.slice(0, 1).map((poem) => {
              const imageSrc = poem?.image?.trim() ? poem.image : defaultImage;

              return (
                <div
                  key={poem._id}
                  className="rounded-xl transition duration-300 p-4"
                >
                  <img
                    src={imageSrc}
                    alt={poem.title}
                    className="w-full h-[300px] sm:h-[500px] md:h-[500px] lg:h-[100vh] object-contain rounded-md mb-4"
                  />
                  <div className="flex flex-col gap-y-1 text-center">
                    <Link
                      href={`/poetry/category/${poem?.category}`}
                      className="text-2xl font-medium text-green-600 hover:text-green-800"
                    >
                      {poem?.category}
                    </Link>
                    <Link
                      href={`/poetry/${poem?.slug}`}
                      className="text-xl font-semibold text-gray-800 hover:text-green-700"
                    >
                      {poem?.title}
                    </Link>
                  </div>
                </div>
              );
            })
          : !error && (
              <p className="text-center text-gray-600 col-span-full">
                No featured poems available at the moment.
              </p>
            )}
      </div>
    </section>
  );
};

export default FeaturedPoems;
