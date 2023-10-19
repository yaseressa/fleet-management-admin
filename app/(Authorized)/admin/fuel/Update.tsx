"use client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
} from "../_components/ui/dialog";
import * as Yup from "yup";
import { Button } from "../_components/ui/button";
import {
  PiCarFill,
  PiPersonFill,
  PiPlusSquareDuotone,
  PiRecycleDuotone,
} from "react-icons/pi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ImUserTie } from "react-icons/im";
import { AiFillCarryOut } from "react-icons/ai";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { useLoadScript } from "@react-google-maps/api";
import Multiselect from "multiselect-react-dropdown";
import { format } from "date-fns";

const Update = ({ id, refetch }) => {
  const [value, setValue] = useState();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_APP_URL + "api/vehicle")
      .then((res) => res.json())
      .then((res) => {
        console.log("Vehicle Data:", res);
        setOptions(
          res.map((vehicle) => ({
            value: vehicle.id,
            label: `${vehicle.vehicleModel}: ${vehicle.vehicleLicensePlate}`,

            ...vehicle,
          }))
        );
        setVehicles(res);
      })
      .catch((error) => {
        console.error("Error fetching vehicle data:", error);
      });
  }, []);

  const get = () => {
    if (id != undefined) {
      fetch(process.env.NEXT_PUBLIC_APP_URL + `api/fuelingrecord/${id}`, {
        next: { revalidate: 0 },
      })
        .then((res) => res.json())
        .then((res) => {
          setValue(res);
          setSelectedOptions([
            {
              value: res.vehicleId,
              label: `${res.Vehicle.vehicleModel}: ${res.Vehicle.vehicleLicensePlate}`,
            },
          ]);
          console.log("jf", selectedOptions);
        });
    }
  };
  const initialValues = value && {
    ...value,
    fuelingDate: value
      ? format(new Date(value.fuelingDate), "yyyy-MM-dd'T'HH:mm")
      : "",
  };
  const onSubmit = (value, id) => {
    fetch(process.env.NEXT_PUBLIC_APP_URL + `api/fuelingrecord/${id}`, {
      method: "put",
      body: JSON.stringify(value),
      next: { revalidate: 0 },
      headers: { "Content-Types": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => toast.success(res.message));
  };
  const oC = () => {
    refetch();
    get();
  };
  return (
    <>
      <Dialog onOpenChange={oC}>
        <DialogTrigger>
          <PiRecycleDuotone className="text-green-800  text-2xl cursor-pointer" />
        </DialogTrigger>
        {value && (
          <DialogContent className="min-w-[650px] drop-shadow-2xl">
            <DialogHeader>
              <DialogTitle className="font-rock text-primary">
                Update Fuel Record
              </DialogTitle>
              <DialogDescription className="font-rock pt-4 flex justify-evenly items-start  w-fit">
                <BsFillFuelPumpFill
                  className={`text-6xl text-secondary m-10`}
                />

                <Formik
                  initialValues={initialValues}
                  validationSchema={Yup.object().shape({
                    fuelingDate: Yup.date().required(
                      "Fueling Date is required"
                    ),
                    fuelingLocation: Yup.string().required(
                      "Fueling Location is required"
                    ),
                    fuelType: Yup.string().required("Fuel Type is required"),
                    vehicleId: Yup.string().required("Vehicle ID is required"),
                    gallonsFilled: Yup.number().required(
                      "Gallons Filled is required"
                    ),
                    totalCost: Yup.number().required("Total Cost is required"),
                  })}
                  onSubmit={(values) => {
                    values["vehicleId"] = selectedOptions[0].id;
                    onSubmit(values, id);
                  }}
                >
                  <Form className="flex flex-col justify-center items-center">
                    <div className="flex flex-col justify-start items-start flex-wrap h-[320px]">
                      <div className="m-3 h-20 w-48">
                        <label>Fueling Date</label>
                        <Field
                          className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                          type="datetime-local"
                          name="fuelingDate"
                        />
                        <ErrorMessage
                          className="text-red-900 text-[10px]"
                          name="fuelingDate"
                          component="div"
                        />
                      </div>
                      <div className="m-3 h-20 w-48">
                        <label>Fueling Location</label>
                        <Field
                          className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                          type="text"
                          name="fuelingLocation"
                        />
                        <ErrorMessage
                          className="text-red-900 text-[10px]"
                          name="fuelingLocation"
                          component="div"
                        />
                      </div>
                      <div className="m-3 h-20 w-48">
                        <label>Fuel Type</label>
                        <Field
                          className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                          type="text"
                          name="fuelType"
                        />
                        <ErrorMessage
                          className="text-red-900 text-[10px]"
                          name="fuelType"
                          component="div"
                        />
                      </div>
                      <div className="m-3 h-20 w-48">
                        <label>Vehicle</label>

                        <Multiselect
                          options={options}
                          selectedValues={selectedOptions}
                          onSelect={setSelectedOptions}
                          onRemove={setSelectedOptions}
                          placeholder="Select Vehicle Plate"
                          displayValue="label"
                          className="font-rock font-thin tracking-wider"
                          selectionLimit={1}
                          style={{
                            multiselectContainer: {
                              borderRadius: "2px",
                              color: "#526D82",
                            },
                            chips: {
                              backgroundColor: "#526D82",
                              fontSize: "0.5em",
                              letterSpacing: "3px",
                            },
                            searchBox: {
                              borderRadius: "7px",
                              border: "1.5px #526D82 double",
                              letterSpacing: "10px",
                              padding: "7px",
                            },
                            option: {
                              borderRadius: "12px",
                              border: "2px #000 double",
                              backgroundColor: "#526D82",
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
                        <p className="text-red-900 text-[10px]">
                          {!selectedOptions[0] && "Select a Vehicle"}
                        </p>
                      </div>
                      <div className="m-3 h-20 w-48">
                        <label>Gallons Filled</label>
                        <Field
                          className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                          type="number"
                          name="gallonsFilled"
                        />
                        <ErrorMessage
                          className="text-red-900 text-[10px]"
                          name="gallonsFilled"
                          component="div"
                        />
                      </div>
                      <div className="m-3 h-20 w-48">
                        <label>Total Cost</label>
                        <Field
                          className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                          type="number"
                          name="totalCost"
                        />
                        <ErrorMessage
                          className="text-red-900 text-[10px]"
                          name="totalCost"
                          component="div"
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="border-double bg-transparent border-secondary border-2 backdrop-blur-3xl flex justify-between gap-2 px-6"
                    >
                      <BsFillFuelPumpFill
                        className={`text-xl text-secondary`}
                      />
                      <PiRecycleDuotone className="text-green-800  text-xl cursor-pointer" />
                    </Button>{" "}
                  </Form>
                </Formik>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default Update;
