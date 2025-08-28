"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SimpleDetailsPoetryCard from "./items/SimpleDetailsPoetryCard";
import { base_api_url } from "../../config/Config";

const SearchPoetry = () => {
  const [poetry, setPoetry] = useState([]);
  const searchValue = useSearchParams();
  const value = searchValue.get("value");

  const get_poetry = async () => {
    try {
      const res = await fetch(
        `${base_api_url}/api/search/poetry?value=${value}`
      );
      const { poetry } = await res.json();
      setPoetry(poetry);
    } catch (error) {
      console.error("Error fetching poetry:", error);
    }
  };

  useEffect(() => {
    if (value) {
      get_poetry();
    }
  }, [value]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {poetry &&
        poetry.length > 0 &&
        poetry.map((item, i) => (
          <SimpleDetailsPoetryCard
            key={item._id || item.slug || i}
            poetry={item}
            type="details-poetry"
            height={200}
          />
        ))}
    </div>
  );
};

export default SearchPoetry;
