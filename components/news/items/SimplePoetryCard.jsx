import React from "react";
import Image from "next/legacy/image";
import Link from "next/link";

const SimplePoetryCard = ({ item, type }) => {
  const slug = item?.slug;

  if (!slug) {
    console.warn("Missing slug for item:", item);
    return null;
  }

  return (
    <div className="group">
      <Link href={`/poetry/${slug}`}>
        <div className="overflow-hidden relative mt-[1rem] cursor-pointer">
          <div
            className={`relative w-full ${
              type ? "h-[270px] sm:h-[470px]" : "h-[228px]"
            } group-hover:scale-[1.05] transition-all duration-700 mt-3`}
          >
            <Image
              layout="fill"
              objectFit="cover"
              src={item.image}
              alt={item.title || "poetry image"}
              priority
            />
          </div>
        </div>
      </Link>

      <div className="mt-3 flex flex-col gap-y-1 text-black font-semibold ml-8">
        <Link
          href={`/poetry/${slug}`}
          className="text-xl hover:text-[#4b2e2e] transition-colors duration-300"
        >
          {item.title}
        </Link>
        <div className="flex gap-x-2 text-sm font-normal text-gray-700">
          <span>{item.date}</span>
          <span>{item.writerName}</span>
        </div>
      </div>
    </div>
  );
};

export default SimplePoetryCard;
