import React, { useState } from "react";
import { BsPersonFill } from "react-icons/bs";
import { BsFillCaretDownFill } from "react-icons/bs";
import Link from "next/link";
//@ts-ignore
const Header = ({ setdrop, drop }) => {
  return (
    <div
      className={`self-end flex bg-transparent items-center shadow-lg shadow-secondary transition-all duration-100 rounded-xl border-[2px] border-double border-secondary my-4 mr-8 drop-shadow-3xl`}
    >
      <div className="flex justify-between items-center font-poppins whitespace-nowrap w-full">
        <div
          className={`flex items-center gap-1 hover:bg-opacity-40  p-1 px-2 rounded-xl bg-opacity-0 `}
          tabIndex={-1}
          onClick={() => setdrop((prev: boolean) => !prev)}
          onBlur={() => setdrop(false)}
        >
          <BsPersonFill className="text-primary text-2xl" />
          <BsFillCaretDownFill
            className={`text-primary text-sm duration-500 ${
              drop ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
