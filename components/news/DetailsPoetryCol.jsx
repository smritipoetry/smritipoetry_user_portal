import React from "react";
import Title from "../Title";
import SimpleDetailsPoetryCard from "./items/SimpleDetailsPoetryCard";
import PoetryCard from "./items/PoetryCard";

const DetailsPoetryCol = ({ poetry, category }) => {
  // ✅ Guard clause to prevent crashes
  if (!poetry || poetry.length === 0) {
    return (
      <div className="w-full px-4 py-8 text-gray-600 text-center">
        No poetry available for the category: <strong>{category}</strong>
      </div>
    );
  }

  console.log(poetry[0]?.category); // optional chaining for safety

  return (
    <div className="w-full flex flex-col gap-[14px] pl-2">
      <Title title={category} />
      <div className="grid grid-cols-1 gap-y-6">
        <SimpleDetailsPoetryCard
          poetry={poetry[0]}
          type="details-poetry"
          height={300}
        />
      </div>
      <div className="grid grid-cols-1 gap-y-[14px] mt-4">
        {poetry.slice(0, 4).map((item, i) => (
          <PoetryCard item={item} key={i} />
        ))}
      </div>
    </div>
  );
};

export default DetailsPoetryCol;
