"use client";

import React from "react";
import Image from "next/legacy/image";
import Link from "next/link";
import { convert } from "html-to-text";

const defaultImage = "/images/placeholder.jpg";

const SimpleDetailsPoetryCard = ({ poetry, type, height }) => {
  const imageSrc = poetry?.image?.trim() ? poetry.image : defaultImage;
  const slug = poetry?.slug;

  if (!slug) return null;

  return (
    <div className="bg-white shadow">
      <div className="group relative overflow-hidden">
        <Link href={`/poetry/${slug}`}>
          <div
            style={{ height: `${height}px` }}
            className="w-full relative group-hover:scale-[1.1] transition-all duration-[1s] cursor-pointer"
          >
            <Image
              className="object-cover"
              layout="fill"
              src={imageSrc}
              alt={poetry?.title || "poetry image"}
              priority
            />
            <div className="w-full h-full block absolute left-0 top-0 invisible group-hover:visible bg-white cursor-pointer opacity-5 transition-all duration-300"></div>
          </div>
        </Link>
      </div>

      <div className="p-5">
        <Link
          className="text-[15px] font-semibold text-[#333333] hover:text-[#1c411c]"
          href={`/poetry/${slug}`}
        >
          {poetry?.title}
        </Link>

        <div className="flex gap-x-2 text-xs font-normal text-slate-600 mt-2">
          <span>{poetry?.date}</span>
          <span>{poetry?.writerName}</span>
        </div>

        {type === "details-poetry" && (
          <p className="text-sm text-slate-600 pt-3">
            {convert(poetry?.description || "", {
              wordwrap: false,
            }).slice(0, 200)}
          </p>
        )}
      </div>
    </div>
  );
};

export default SimpleDetailsPoetryCard;
