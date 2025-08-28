"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineSearch } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { BsList } from "react-icons/bs";
import { base_api_url } from "../config/Config";
import { useRouter } from "next/navigation";

const Header_Category = () => {
  const router = useRouter();
  const path = usePathname();
  const [state, setState] = useState("");
  const [categories, set_categories] = useState([]);
  const [show, setShow] = useState(false);
  const [cate_show, set_cate_show] = useState(false);

  const get_categories = async () => {
    try {
      const res = await fetch(`${base_api_url}/api/category/all`);
      const data = await res.json();
      set_categories(data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get_categories();
  }, []);

  const search = (e) => {
    e.preventDefault();
    router.push(`/search/poetry?value=${state}`);
    setState("");
    setShow(false);
  };

  return (
    <div className="w-full relative">
      {/* Top Bar */}
      <div className="bg-green-800 w-full text-white uppercase font-semibold relative">
        <div className="px-8 flex justify-between items-center relative h-[48px]">
          {/* Hamburger icon */}
          <div
            onClick={() => set_cate_show(!cate_show)}
            className={`text-3xl flex lg:hidden font-bold h-full w-[48px] cursor-pointer justify-center items-center ${
              cate_show ? "bg-[#00000026]" : ""
            } hover:bg-[#00000026]`}
          >
            <BsList />
          </div>

          {/* Desktop Links */}
          <div className="flex-wrap hidden lg:flex">
            <Link
              className={`px-6 font-medium py-[13px] ${
                path === "/" ? "bg-[#00000026]" : ""
              }`}
              href={"/"}
            >
              Home
            </Link>
            {categories.length > 0 &&
              categories.map((c, i) => (
                <Link
                  key={i}
                  className={`px-6 font-medium py-[13px] ${
                    path === `/poetry/category/${c.category}`
                      ? "bg-[#00000026]"
                      : ""
                  }`}
                  href={`/poetry/category/${c.category}`}
                >
                  {c.category}
                </Link>
              ))}
          </div>

          {/* Search icon */}
          <div className="h-full w-[48px]">
            <div
              onClick={() => {
                setShow(!show);
              }}
              className={`text-xl ${
                show ? "bg-[#00000026]" : ""
              } font-bold h-full w-full cursor-pointer justify-center flex items-center hover:bg-[#00000026]`}
            >
              {show ? <IoClose /> : <AiOutlineSearch />}
            </div>

            {/* Search dropdown */}
            <div
              className={`absolute transition-all text-slate-700 z-20 shadow-lg lg:right-10 top-[50px] w-full lg:w-[300px] right-0 ${
                show ? "visible" : "invisible"
              }`}
            >
              <div className="p-3 bg-white">
                <form onSubmit={search} className="flex">
                  <div className="w-[calc(100%-45px)] h-[40px]">
                    <input
                      value={state}
                      required
                      onChange={(e) => setState(e.target.value)}
                      type="text"
                      placeholder="search"
                      className="h-full w-full p-2 border border-slate-300 outline-none bg-slate-100"
                    />
                  </div>
                  <button className="w-[45px] hover:bg-green-700 cursor-pointer h-[40px] flex justify-center outline-none items-center bg-red-600 text-white text-xl">
                    <AiOutlineSearch />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {cate_show && (
        <div className="absolute top-[48px] left-0 w-full bg-green-900 text-white z-50 flex flex-col shadow-md lg:hidden transition-all duration-300">
          <Link
            className={`py-3 px-6 hover:bg-green-800 ${
              path === "/" ? "bg-green-800" : ""
            }`}
            href={"/"}
          >
            Home
          </Link>
          {categories.map((c, i) => (
            <Link
              key={i}
              className={`py-3 px-6 hover:bg-green-800 ${
                path === `/poetry/category/${c.category}` ? "bg-green-800" : ""
              }`}
              href={`/poetry/category/${c.category}`}
            >
              {c.category}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Header_Category;
