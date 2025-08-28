import React from "react";
import LoadingSpinner from "react-spinners-components";
import Marquee from "react-fast-marquee";
import Link from "next/link";

const HeadLines = ({ poetry = {} }) => {
  return (
    <div className="bg-[#dfecde] shadow flex flex-wrap">
      <div className="flex md:w-[170px] w-full relative">
        <div className="md:pl-8 pl-4 w-full py-4 flex justify-start items-center gap-x-1">
          <span>
            <LoadingSpinner
              type="Ripple"
              colors={["#d2691e", "#4b2e2e"]}
              size={"30px"}
            />
          </span>
          <h2 className="text-[#333333] font-semibold text-lg">All poetries</h2>
        </div>
      </div>
      <div className="flex md:w-[calc(100%-170px)] w-full">
        <div className="flex w-full justify-start items-center">
          <Marquee>
            {poetry &&
              typeof poetry === "object" &&
              Object.keys(poetry).length > 0 &&
              Object.keys(poetry).map((c) =>
                Array.isArray(poetry[c]) && poetry[c].length > 0
                  ? poetry[c].map((n) => (
                      <Link
                        key={n.slug}
                        className="py-3 block font-semibold hover:text-[#4b2e2e] pr-12 text-sm"
                        href={`/poetry/${n.slug}`}
                      >
                        {n.title}
                      </Link>
                    ))
                  : null
              )}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default HeadLines;
