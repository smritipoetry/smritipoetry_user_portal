import React from "react";
import Title from "../Title";
import SimpleDetailsPoetryCard from "./items/SimpleDetailsPoetryCard";

const RelatedPoetry = ({ poetry, type }) => {
  return (
    <div className="w-full pb-8 mt-5">
      <div className="flex flex-col w-full gap-y-[14px]">
        <Title title="Related poetry" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-3 sm:gap-3 lg:gap-x-3">
          {poetry.length > 0 &&
            poetry.map((item, i) => {
              if (i < 4) {
                return (
                  <SimpleDetailsPoetryCard
                    poetry={item}
                    type={type}
                    item={item}
                    key={i}
                    height={230}
                  />
                );
              }
            })}
        </div>
      </div>
    </div>
  );
};

export default RelatedPoetry;
