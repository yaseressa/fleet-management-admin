import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import dt from "dotenv";
dt.config();
const containerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "10px",
  border: "3px double #526D82",
};

function DashMap() {
  const [selectedVehicle, setSelectedVehicle] = useState();
  const [options, setOptions] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [current, setCurrent] = useState({ lat: 0, lng: 0 });
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
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GMAPS_API}`,
  });
  console.log(process.env.NEXT_PUBLIC_GMAPS_API);
  useEffect(() => {
    if ("geolocation" in window.navigator) {
      window.navigator.geolocation.getCurrentPosition(function (position) {
        setCurrent({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not available in this browser.");
    }
  }, []);

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={current}
          zoom={10}
        >
          {vehicles.map((vehicle) => (
            <Marker
              key={vehicle.id}
              position={{
                lat: Number(vehicle.currentLocation?.split(" ")[0]),
                lng: Number(vehicle.currentLocation?.split(" ")[1]),
              }}
              onClick={() => setSelectedVehicle(vehicle)}
              icon={customMarker}
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
    </>
  );
}

export default DashMap;
