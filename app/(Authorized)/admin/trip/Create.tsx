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
import { useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";
const Create = ({ refetch }) => {
  const [selectedVehicleOptions, setSelectedVehicleOptions] = useState([]);
  const [selectedDriverOptions, setSelectedDriverOptions] = useState([]);
  const [driverOptions, setDriverOptions] = useState([]);
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [bookingOptions, setBookingOptions] = useState([]);
  const [selectedBookingOptions, setSelectedBookingOptions] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch(process.env.NEXT_PUBLIC_APP_URL + "api/vehicle"),
      fetch(process.env.NEXT_PUBLIC_APP_URL + "api/driver"),
      fetch(process.env.NEXT_PUBLIC_APP_URL + "api/booking"),
    ])
      .then((res) => Promise.all(res.map((rs) => rs.json())))
      .then((res) => {
        setVehicleOptions(
          res[0].map((vehicle) => ({
            value: vehicle.id,
            label: `${vehicle.vehicleModel}: ${vehicle.vehicleLicensePlate}`,

            ...vehicle,
          }))
        );
        setDriverOptions(
          res[1].map((driver) => ({
            value: driver.id,
            label: `${driver.firstName} ${driver.lastName}`,

            ...driver,
          }))
        );
        setBookingOptions(
          res[2].map((booking) => ({
            value: booking.id,
            label: `${booking.endLocation}-${booking.startLocation}> ${booking.tripPurpose}`,

            ...booking,
          }))
        );
      })
      .catch((error) => {
        console.error("Error fetching vehicle data:", error);
      });
  }, []);

  const onSubmit = (value) => {
    fetch(process.env.NEXT_PUBLIC_APP_URL + `api/trip`, {
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
          <AiFillCarryOut className={`text-xl text-secondary`} />
          <PiPlusSquareDuotone className="text-lg text-secondary" />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[650px] drop-shadow-2xl">
        <DialogHeader>
          <DialogTitle className="font-rock text-primary">
            Create Trip
          </DialogTitle>
          <DialogDescription className="font-rock pt-4 flex justify-evenly items-start  w-fit">
            <AiFillCarryOut className={`text-6xl text-secondary m-10`} />

            <Formik
              initialValues={{
                startTime: "",
                endTime: "",
                distanceTraveled: "",
                tripStatus: "",
              }}
              validationSchema={Yup.object().shape({
                startTime: Yup.date().required("Start Time is required"),
                endTime: Yup.date().required("End Time is required"),
                distanceTraveled: Yup.number().required(
                  "Distance Traveled is required"
                ),
                tripStatus: Yup.string().required("Trip Status is required"),
              })}
              onSubmit={(values) => {
                values["vehicleId"] = selectedVehicleOptions[0].id;
                values["driverId"] = selectedDriverOptions[0].id;
                values["bookingId"] = selectedBookingOptions[0].id;
                onSubmit(values);
              }}
            >
              <Form className="flex flex-col justify-center items-center">
                <div className="flex flex-col justify-start items-start flex-wrap h-[450px]">
                  <div className="m-3 h-20 w-48">
                    <label>Driver</label>

                    <Multiselect
                      options={driverOptions}
                      selectedValues={selectedDriverOptions}
                      onSelect={setSelectedDriverOptions}
                      onRemove={setSelectedDriverOptions}
                      placeholder="Select a Driver"
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
                      {!selectedDriverOptions[0] && "Select a Driver"}
                    </p>
                  </div>
                  <div className="m-3 h-20 w-48">
                    <label>Book</label>
                    <Multiselect
                      options={bookingOptions}
                      selectedValues={selectedBookingOptions}
                      onSelect={setSelectedBookingOptions}
                      onRemove={setSelectedBookingOptions}
                      placeholder="Select a Booking"
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
                      {!selectedBookingOptions[0] && "Select a Booking"}
                    </p>
                  </div>
                  <div className="m-3 h-20 w-48">
                    <label>Vehicle</label>
                    <Multiselect
                      options={vehicleOptions}
                      selectedValues={selectedVehicleOptions}
                      onSelect={setSelectedVehicleOptions}
                      onRemove={setSelectedVehicleOptions}
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
                      {!selectedVehicleOptions[0] && "Select a Vehicle"}
                    </p>
                  </div>
                  <div className="m-3 h-20 w-48">
                    <label>Start Time</label>
                    <Field
                      className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                      type="datetime-local"
                      name="startTime"
                    />
                    <ErrorMessage
                      className="text-red-900 text-[10px]"
                      name="startTime"
                      component="div"
                    />
                  </div>
                  <div className="m-3 h-20 w-48">
                    <label>End Time</label>
                    <Field
                      className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                      type="datetime-local"
                      name="endTime"
                    />
                    <ErrorMessage
                      className="text-red-900 text-[10px]"
                      name="endTime"
                      component="div"
                    />
                  </div>
                  <div className="m-3 h-20 w-48">
                    <label>Distance Traveled</label>
                    <Field
                      className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                      type="number"
                      name="distanceTraveled"
                    />
                    <ErrorMessage
                      className="text-red-900 text-[10px]"
                      name="distanceTraveled"
                      component="div"
                    />
                  </div>
                  <div className="m-3 h-20 w-48">
                    <label>Trip Status</label>
                    <Field
                      className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                      name="tripStatus"
                      component="select"
                    >
                      <option value="">Select status</option>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                      <option value="canceled">Canceled</option>
                    </Field>
                    <ErrorMessage
                      className="text-red-900 text-[10px]"
                      name="tripStatus"
                      component="div"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="border-double bg-transparent border-secondary border-2 backdrop-blur-3xl flex justify-between gap-2 px-6"
                >
                  <AiFillCarryOut className={`text-xl text-secondary`} />
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
