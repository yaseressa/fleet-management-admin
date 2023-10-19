"use client";
import { usePathname } from "next/navigation";
import DataTable from "../_components/DataTable";
import { useEffect, useState } from "react";
import Create from "./Create";
import Update from "./Update";

const Vehicle = () => {
  const path = usePathname();
  const [vehicleData, setVehicleData] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const [vehicleColumns, setVehicleCols] = useState([
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "vehicleType",
      header: "Vehicle Type",
    },
    {
      accessorKey: "vehicleMake",
      header: "Made By",
    },
    {
      accessorKey: "vehicleModel",
      header: "Model",
    },
    {
      accessorKey: "vehicleLicensePlate",
      header: "License Plate",
    },
    {
      accessorKey: "currentLocation",
      header: "Location",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "actions",
      header: "Actions",
    },
  ]);

  const refetch = () => {
    fetch(process.env.NEXT_PUBLIC_APP_URL + "api/vehicle", {
      next: { revalidate: 0 },
    })
      .then((res) => res.json())
      .then((res) => {
        setVehicleData(res);
      });
  };
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_APP_URL + "api/vehicle", {
      next: { revalidate: 0 },
    })
      .then((res) => res.json())
      .then((res) => {
        setVehicleData(res);
      });
  }, []);
  function deleteData(id) {
    return fetch(process.env.NEXT_PUBLIC_APP_URL + `api/vehicle/${id}`, {
      method: "delete",
      headers: { "Content-Types": "application/json" },
    }).then();
  }
  return (
    <div className="w-full rounded-2xl border-double border-secondary border-2 backdrop-blur-3xl shadow-md shadow-secondary p-7 pt-3">
      <div className="flex justify-between w-full">
        <h1 className="font-rock text-secondary tracking-widest space-x-10 uppercase m-3">
          {path.split("/").join(" > ").substring(2)}
        </h1>
        <Create refetch={refetch} />
      </div>

      <DataTable
        data={vehicleData}
        columns={vehicleColumns}
        deleteData={deleteData}
        cns={
          "shadow-lg !border-double border-secondary border-2 p-4 rounded-lg shadow-secondary drop-shadow-[0px_3px_10px_rgba(82,109,130,1)]"
        }
        name={"Vehicles"}
        refetch={refetch}
        Update={Update}
      />
    </div>
  );
};

export default Vehicle;
