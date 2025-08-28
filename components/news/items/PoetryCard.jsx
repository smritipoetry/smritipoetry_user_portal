import React from "react";
import Image from "next/legacy/image";
import Link from "next/link";

const PoetryCard = ({ item }) => {
  const defaultImage = "/images/placeholder.jpg"; // Ensure this exists in your public/images folder
  const imageSrc = item?.image?.trim() ? item.image : defaultImage;

  return (
    <div className=" flex flex-col p-4 rounded-lg w-full">
      <div className="relative group overflow-hidden mb-4">
        <div className="group-hover:scale-[1.1] transition-all duration-[1s] max-w-full h-[200px] md:h-[250px] lg:h-[300px] relative">
          <Image
            className="object-cover"
            layout="fill"
            src={imageSrc}
            alt="poetry image"
          />
          <div className="w-full h-full block absolute left-0 top-0 invisible group-hover:visible  cursor-pointer opacity-50 transition-all duration-300"></div>
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <Link
          href={`/poetry/category/${item?.category}`}
          className="text-sm font-semibold text-[#1dc420] hover:text-[#145d0e]"
        >
          {item?.category}
        </Link>
        <Link
          href={`/poetry/${item?.slug}`}
          className="text-lg font-semibold text-[#333333] hover:text-[#306741]"
        >
          {item?.title}
        </Link>
        <div className="flex justify-center items-center gap-x-2 text-xs font-normal text-slate-600 mt-2">
          <span>{item?.date}</span>
          <span>{item?.writerName}</span>
        </div>
      </div>
    </div>
  );
};

export default PoetryCard;
