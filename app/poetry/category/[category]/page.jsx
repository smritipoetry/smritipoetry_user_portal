import Breadcrumb from "../../../../components/BreadCrumb";
import SimpleDetailsPoetryCard from "@/components/news/items/SimpleDetailsPoetryCard";
import React from "react";
import { base_api_url } from "../../../../config/Config";
import Footer from "@/components/Footer";

const CategoryPoetry = async ({ params }) => {
  const { category } = await params;

  const res = await fetch(`${base_api_url}/api/category/poetry/${category}`, {
    next: {
      revalidate: 1,
    },
  });
  const { poetry } = await res.json();

  return (
    <div>
      <div className=" bg-[#dfecde] shadow-lg py-4 mt-20">
        <div className="px-4 md:px-8 w-full ">
          <Breadcrumb one="category" two={category} />
        </div>
      </div>
      <div className="bg-[#dfecde] ">
        <div className="px-4 md:px-8  py-8">
          <div className="flex flex-wrap">
            <div className="w-full mt-5">
              <div className="flex w-full flex-col gap-y-[14px] pl-0 lg:pl-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-[14px] width={200}">
                  {poetry &&
                    poetry.length > 0 &&
                    poetry.map((item, i) => (
                      <SimpleDetailsPoetryCard
                        key={item.id || i}
                        poetry={item}
                        type="details-poetry"
                        height={200}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPoetry;
