import React from "react";
import Title from "../Title";
import SimpleDetailsPoetryCard from "@/components/news/items/SimpleDetailsPoetryCard";

const DetailsPoetry = ({ category, poetry }) => {
  // Check if poetry is defined and has at least two items
  if (!poetry || poetry.length < 2) {
    return (
      <div className="w-full px-4 py-8 text-gray-600 text-center">
        No sufficient poetry available for the category:{" "}
        <strong>{category}</strong>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-[14px] pr-2 py-8">
      <Title title={category} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 lg:gap-x-3">
        <SimpleDetailsPoetryCard
          poetry={poetry[0]}
          type="details-poetry"
          height={300}
        />
        <SimpleDetailsPoetryCard
          poetry={poetry[1]}
          type="details-poetry"
          height={300}
        />
      </div>
    </div>
  );
};

export default DetailsPoetry;
