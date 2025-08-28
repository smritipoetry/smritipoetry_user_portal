import React, { Suspense } from "react";
import Breadcrumb from "../../../components/BreadCrumb";

import Footer from "@/components/Footer";
import SearchPoetry from "../../../components/news/SearchPoetry";

const page = () => {
  return (
    <div>
      <div className="bg-white shadow-sm py-4">
        <div className="px-4 md:px-8 w-full">
          <Breadcrumb one="category" two={"search poetry"} />
        </div>
      </div>
      <div className="bg-slate-200 ">
        <div className="px-4 md:px-8  py-8">
          <div className="flex flex-wrap">
            <div className="w-full mt-5">
              <div className="flex w-full flex-col gap-y-[14px] pl-0 lg:pl-2">
                <Suspense fallback={<div>Loading...</div>}>
                  <SearchPoetry />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
