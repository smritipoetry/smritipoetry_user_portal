import React, { useEffect, useState } from "react";
import Link from "next/link";
import { base_api_url } from "../config/Config";

const Category = async ({ titleStyle }) => {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const header = document.querySelector("header");
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }
  }, []);

  const res = await fetch(`${base_api_url}/api/category/all`, {
    next: {
      revalidate: 5,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Failed to fetch categories:", errorText);
    return <div className="text-green-500">Failed to load categories.</div>;
  }

  const { categories } = await res.json();

  return (
    <div
      className="w-full flex flex-col gap-y-[14px]"
      style={{ marginTop: `${headerHeight}px` }}
    >
      <div
        className={`text-xl font-bold ${titleStyle} relative before:absolute before:w-[4px] before:bg-[#c80000] before:h-full before:-left-0 pl-3`}
      >
        Category
      </div>
      <div
        className={`flex flex-col justify-start items-start text-sm gap-y-3 ${titleStyle} pt-3`}
      >
        {categories?.map((item, i) => (
          <li className="list-none" key={i}>
            <Link href={`/poetry/category/${item.category}`}>
              {item.category} ({item.count})
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Category;
