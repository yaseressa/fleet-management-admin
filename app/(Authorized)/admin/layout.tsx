"use client";
import { ReactNode, useState } from "react";
import SideBar from "./_components/SideBar";
import Header from "./_components/Header";
import Drop from "./_components/Drop";
// import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const PLayout = ({ children }: { children: ReactNode }) => {
  const [flat, setflat] = useState(true);
  const [drop, setdrop] = useState(false);
  // const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <>
      <div className="overflow-hidden w-full flex justify-stretch items-stretch">
        <SideBar flat={flat} setflat={setflat} />
        <div className="flex flex-col items-start justify-start w-full mx-8">
          <div className="flex justify-between w-full mb-1">
            <h1 className="uppercase font-bold tracking-widest drop-shadow-[0px_3px_10px_rgba(82,109,130,1)] text-secondary bg-clip-text text-center font-rock flex items-center text-4xl">
              Fleet management system
            </h1>
            <Header setdrop={setdrop} drop={drop} />
          </div>
          {children}
        </div>

        <Drop drop={drop} />
      </div>
    </>
  );
};

export default PLayout;
