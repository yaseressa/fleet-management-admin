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
import { toast } from "react-toastify";
import { ImUserTie } from "react-icons/im";
import { AiFillCarryOut } from "react-icons/ai";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { BiSolidCarMechanic } from "react-icons/bi";
import { useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";
const Create = ({ refetch }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState([]);

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
      })
      .catch((error) => {
        console.error("Error fetching vehicle data:", error);
      });
  }, []);
  const onSubmit = (value) => {
    fetch(process.env.NEXT_PUBLIC_APP_URL + `api/maintenancerecord`, {
      method: "post",
      body: JSON.stringify(value),
      headers: { "Content-Types": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => toast.success(res.message));
  };
  return (
    <Dialog onOpenChange={refetch}>
      <DialogTrigger>
        <Button className="border-double bg-transparent border-secondary border-2 backdrop-blur-3xl flex justify-between gap-2">
          <BiSolidCarMechanic className={`text-xl text-secondary`} />
          <PiPlusSquareDuotone className="text-lg text-secondary" />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[650px] drop-shadow-2xl">
        <DialogHeader>
          <DialogTitle className="font-rock text-primary">
            Create Maintenance Record
          </DialogTitle>
          <DialogDescription className="font-rock pt-4 flex justify-evenly items-start  w-fit">
            <BiSolidCarMechanic className={`text-6xl text-secondary m-10`} />

            <Formik
              initialValues={{
                maintenanceType: "",
                maintenanceDate: "",
                maintenanceCost: "",
                notes: "",
              }}
              validationSchema={Yup.object().shape({
                maintenanceType: Yup.string().required(
                  "Maintenance Type is required"
                ),
                maintenanceDate: Yup.date().required(
                  "Maintenance Date is required"
                ),
                maintenanceCost: Yup.number().required(
                  "Maintenance Cost is required"
                ),
                notes: Yup.string(),
              })}
              onSubmit={(values) => {
                values["vehicleId"] = selectedOptions[0].id;

                onSubmit(values);
              }}
            >
              <Form className="flex flex-col justify-center items-center">
                <div className="flex flex-col justify-start items-start flex-wrap h-[320px]">
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
                          color: "#000",
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
                    <label>Maintenance Type</label>
                    <Field
                      className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                      type="text"
                      name="maintenanceType"
                    />
                    <ErrorMessage
                      className="text-red-900 text-[10px]"
                      name="maintenanceType"
                      component="div"
                    />
                  </div>
                  <div className="m-3 h-20 w-48">
                    <label>Maintenance Date</label>
                    <Field
                      className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                      type="datetime-local"
                      name="maintenanceDate"
                    />
                    <ErrorMessage
                      className="text-red-900 text-[10px]"
                      name="maintenanceDate"
                      component="div"
                    />
                  </div>
                  <div className="m-3 h-20 w-48">
                    <label>Maintenance Cost</label>
                    <Field
                      className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                      type="number"
                      name="maintenanceCost"
                    />
                    <ErrorMessage
                      className="text-red-900 text-[10px]"
                      name="maintenanceCost"
                      component="div"
                    />
                  </div>
                  <div className="m-3 h-20 w-48">
                    <label>Notes</label>
                    <Field
                      className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                      type="text"
                      name="notes"
                    />
                    <ErrorMessage
                      className="text-red-900 text-[10px]"
                      name="notes"
                      component="div"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="border-double bg-transparent border-secondary border-2 backdrop-blur-3xl flex justify-between gap-2 px-6"
                >
                  <BiSolidCarMechanic className={`text-xl text-secondary`} />
                  <PiPlusSquareDuotone className="text-lg text-secondary" />
                </Button>{" "}
              </Form>
            </Formik>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Create;
