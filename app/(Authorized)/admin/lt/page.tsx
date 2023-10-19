"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import MultiSelect from "multiselect-react-dropdown";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import dt from "dotenv";
dt.config();
const containerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "10px",
  border: "3px double #526D82",
};

const Track = () => {
  const path = usePathname();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState();
  const [options, setOptions] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const customMarker = {
    path: "M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759   c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z    M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713   v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336   h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805",
    fillColor: "#526D82",
    fillOpacity: 2,
    strokeWeight: 1,
    rotation: 0,
    scale: 1,
  };

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_APP_URL + "api/vehicle")
      .then((res) => res.json())
      .then((res) => {
        console.log("Vehicle Data:", res);
        setOptions(
          res.map((vehicle) => ({
            value: vehicle.id,
            label: vehicle.vehicleLicensePlate,
            ...vehicle,
          }))
        );
        setVehicles(res);
      })
      .catch((error) => {
        console.error("Error fetching vehicle data:", error);
      });
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GMAPS_API,
  });
  return (
    <div className="w-full rounded-2xl border-double border-secondary border-2 backdrop-blur-3xl shadow-md shadow-secondary p-7 pt-3">
      <div className="flex justify-between w-full">
        <h1 className="font-rock text-secondary tracking-widest space-x-10 uppercase m-3">
          {path.split("/").join(" > ").substring(2)}
        </h1>
      </div>
      <div>
        <MultiSelect
          options={options}
          selectedValues={selectedOptions}
          onSelect={setSelectedOptions}
          onRemove={setSelectedOptions}
          placeholder="Select Vehicle Plate"
          displayValue="label"
          className="font-rock font-thin py-3 tracking-wider"
          selectionLimit={1}
          style={{
            multiselectContainer: {
              borderRadius: "2px",
              color: "#526D82",
            },
            chips: {
              backgroundColor: "#526D82",
            },
            searchBox: {
              borderRadius: "12px",
              border: "2px #526D82 double",
              letterSpacing: "10px",
              padding: "10px",
            },
            option: {
              borderRadius: "12px",
              border: "2px #526D82 double",
              backgroundColor: "#000",
            },
            highlightOption: {
              backgroundColor: "#000",
            },
            notFound: {
              fontSize: "16px",
              borderRadius: "12px",
              border: "2px #526D82 double",
              backgroundColor: "#000",
            },
            optionContainer: {
              backgroundColor: "#000",
            },
          }}
        />

        {isLoaded && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={
              selectedOptions[0]
                ? {
                    lat: Number(
                      selectedOptions[0].currentLocation?.split(" ")[0]
                    ),
                    lng: Number(
                      selectedOptions[0].currentLocation?.split(" ")[1]
                    ),
                  }
                : { lat: 9.559889155679574, lng: 44.06769661433115 }
            }
            zoom={10}
          >
            {vehicles.map((vehicle) => (
              <MarkerF
                key={vehicle.id}
                position={{
                  lat: Number(vehicle.currentLocation?.split(" ")[0]),
                  lng: Number(vehicle.currentLocation?.split(" ")[1]),
                }}
                onClick={() => setSelectedVehicle(vehicle)}
                icon={customMarker}
                opacity={vehicle.isSelected ? 1 : 0.5}
              />
            ))}
            {selectedVehicle && (
              <InfoWindow
                position={{
                  lat: Number(selectedVehicle.currentLocation?.split(" ")[0]),
                  lng: Number(selectedVehicle.currentLocation?.split(" ")[1]),
                }}
                zIndex={1}
                onCloseClick={() => setSelectedVehicle(undefined)}
              >
                <div className="flex text-lg flex-col font-rock justify-center items-start p-3 rounded-2xl bg-tertiary text-secondary font-thin">
                  <h1 className="p-2">
                    {" "}
                    <span className="font-bold">Vehicle: </span>
                    {selectedVehicle.vehicleModel}
                  </h1>
                  <h1 className="p-2">
                    <span className="font-bold">Plate: </span>
                    {selectedVehicle.vehicleLicensePlate}
                  </h1>
                  <h1 className="p-2">
                    <span className="font-bold">GPS: </span>{" "}
                    {selectedVehicle.currentLocation}
                  </h1>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        )}
      </div>
    </div>
  );
};

export default Track;
