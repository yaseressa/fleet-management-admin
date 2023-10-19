import Link from "next/link";
import { PiMaskSadDuotone } from "react-icons/pi";
const NotFound = () => {
  return (
    <div className="bg-gradient-to-tl to-tertiary from-secondary font-rock font-extrabold uppercase backdrop-blur-lg text-primary">
      <div className="flex flex-col justify-center items-center h-screen w-full drop-shadow-4xl animate-pulse">
        <p className="text-2xl font-semibold tracking-wider font-rock text-tertiary border-b-2 mx-2 border-b-tertiary">
          page not found
        </p>
        <PiMaskSadDuotone className="text-tertiary text-[300px]" />
        <br />
        {/* <Link
          href={"/p/dash"}
          className="font-thin font-rock px-3 border-b-2 mx-2 border-b-tertiary text-tertiary"
        >
          {" "}
          home
        </Link> */}
      </div>
    </div>
  );
};

export default NotFound;
