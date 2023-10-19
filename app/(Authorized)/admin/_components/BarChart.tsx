"use client";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useEffect, useState } from "react";
export default function BarCharter() {
  const [vehicle, setVehicele] = useState([]);
  const [vehicleConsumption, setVehicleConsumption] = useState([]);
  const [fueling, setFueling] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch departments and employees data concurrently using Promise.all
    Promise.all([
      fetch(process.env.NEXT_PUBLIC_APP_URL + "api/fuelingrecord", {
        next: { revalidate: 0 },
      }),
      fetch(process.env.NEXT_PUBLIC_APP_URL + "api/vehicle", {
        next: { revalidate: 0 },
      }),
    ])
      .then(([fuelingResponse, vehicleResponse]) => {
        return Promise.all([fuelingResponse.json(), vehicleResponse.json()]);
      })
      .then(([fuelingData, vehicleData]) => {
        setFueling(fuelingData);
        setVehicele(vehicleData);
        const fuel = vehicleData.map(
          (vehicle) =>
            fuelingData.filter((fuel) => vehicle.vehicleId === vehicle.id)
              .length
        );

        setVehicleConsumption(fuel);
      });
  }, []);

  useEffect(() => {
    const data = vehicle.map((vehicle, index) => {
      return {
        name: vehicle.vehicleType,
        total: vehicleConsumption[index],
      };
    });
    setData(data);
  }, [vehicleConsumption]);
  console.log("d", vehicleConsumption);

  return (
    <>
      {data && (
        <div className="relative flex flex-col break-words mb-6 p-4 m-3 w-[800px]">
          <h1 className="font-rock font-extralight uppercase text-secondary px-2 text-center pb-4 text-lg">
            Fuel Consumptions
          </h1>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data}>
              <XAxis
                dataKey="name"
                stroke="#526d82"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#526d82"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <CartesianGrid
                stroke="#526d82"
                strokeDasharray="10 10"
                vertical={false}
              />
              <Bar dataKey="total" fill="#526d82" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
}
