"use client"; // if it ever needs hooks later

import React from "react";
import Image from "next/legacy/image";
import Link from "next/link";

const SimpleBlogCard = ({ item }) => {
  const slug = item?.slug;

  if (!slug) {
    console.warn("Missing slug for blog:", item);
    return null;
  }

  return (
    <div className="group">
      <Link href={`/blog/${slug}`}>
        <div className="overflow-hidden relative mt-[1rem] cursor-pointer">
          <div
            className={`relative w-full h-[250px] sm:h-[350px] group-hover:scale-[1.05] transition-all duration-700 mt-3`}
          >
            <Image
              layout="fill"
              objectFit="cover"
              src={item.image}
              alt={item.title || "blog image"}
              priority
            />
          </div>
        </div>
      </Link>

      <div className="mt-3 flex flex-col gap-y-1 text-black font-semibold ml-4">
        <Link
          href={`/blog/${slug}`}
          className="text-lg hover:text-green-700 transition-colors duration-300"
        >
          {item.title}
        </Link>

        <div className="flex gap-x-2 text-sm font-normal text-gray-600">
          <span>{item.date}</span>
          <span>•</span>
          <span>{item.writerName}</span>
        </div>

        {item.description && (
          <p className="text-sm text-gray-700 mt-1 line-clamp-2">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default SimpleBlogCard;
