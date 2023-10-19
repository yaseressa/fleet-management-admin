import Link from "next/link";

const Card = ({ Icon, count, name, path }: any) => {
  return (
    <Link
      href={path}
      className="h-24 w-60 p-4 m-2 rounded-xl  bg-tertiary bg-opacity-25 backdrop-blur-xl shadow-lg shadow-secondary  border-double border-2 border-secondary gap-3 flex items-center justify-evenly duration-700 transition-all hover:animate-pulse focus:outline-none "
    >
      <Icon
        className={`text-5xl text-secondary  shadow-secondary drop-shadow-[0px_4px_5px_rgba(82,109,130,1)]`}
      />
      <div className="p-2 text-sm font-medium text-center flex flex-col justify-center items-center drop-shadow-[0px_4px_5px_rgba(82,109,130,1)]">
        <div className="flex items-center gap-1">
          <p className="font-bold font-rock text-xl text-secondary  shadow-tertiary">
            {count}
          </p>
        </div>{" "}
        <h5 className="mb-2 text-md font-bold font-rock tracking-widest text-secondary uppercase">
          {name}
        </h5>
      </div>
    </Link>
  );
};

export default Card;
