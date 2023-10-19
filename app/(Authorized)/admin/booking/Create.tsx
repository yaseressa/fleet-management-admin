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
import { BiSolidBookContent } from "react-icons/bi";
import { useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";
const Create = ({ refetch }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_APP_URL + "api/customer")
      .then((res) => res.json())
      .then((res) => {
        setOptions(
          res.map((customer) => ({
            value: customer.id,
            label: `${customer.contactPerson} - ${customer.customerName}`,

            ...customer,
          }))
        );
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
      });
  }, []);
  const onSubmit = (value) => {
    fetch(process.env.NEXT_PUBLIC_APP_URL + `api/booking`, {
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
          <BiSolidBookContent className={`text-xl text-secondary`} />
          <PiPlusSquareDuotone className="text-lg text-secondary" />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[850px] drop-shadow-2xl">
        <DialogHeader>
          <DialogTitle className="font-rock text-primary">
            Create Booking
          </DialogTitle>
          <DialogDescription className="font-rock pt-4 flex justify-evenly items-start  w-fit">
            <BiSolidBookContent className={`text-6xl text-secondary m-10`} />

            <Formik
              initialValues={{
                bookingDate: "",
                startLocationLatitude: "",
                startLocationLongitude: "",
                endLocationLatitude: "",
                endLocationLongitude: "",
                status: "",
              }}
              validationSchema={Yup.object().shape({
                bookingDate: Yup.date().required("Booking Date is required"),
                startLocationLatitude: Yup.number().required(
                  "Start Location Latitude is required"
                ),
                startLocationLongitude: Yup.number().required(
                  "Start Location Longitude is required"
                ),
                endLocationLatitude: Yup.number().required(
                  "End Location Latitude is required"
                ),
                endLocationLongitude: Yup.number().required(
                  "End Location Longitude is required"
                ),
                tripPurpose: Yup.string().required("Trip Purpose is required"),
                status: Yup.string().required("Status is required"),
              })}
              onSubmit={(values) => {
                values["customerId"] = selectedOptions[0].id;
                values["startLocation"] =
                  values["startLocationLatitude"] +
                  " " +
                  values["startLocationLongitude"];
                values["endLocation"] =
                  values["endLocationLatitude"] +
                  " " +
                  values["endLocationLongitude"];
                onSubmit(values);
              }}
            >
              <Form className="flex flex-col justify-center items-center">
                <div className="flex flex-col justify-start items-start flex-wrap h-[320px]">
                  <div className="m-3 h-20 w-48">
                    <label>Customer</label>
                    <Multiselect
                      options={options}
                      selectedValues={selectedOptions}
                      onSelect={setSelectedOptions}
                      onRemove={setSelectedOptions}
                      placeholder="Select Customer"
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
                      {!selectedOptions[0] && "Select a Customer"}
                    </p>
                  </div>

                  <div className="m-3 h-20 w-48">
                    <label>Booking Date</label>
                    <Field
                      className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                      type="datetime-local"
                      name="bookingDate"
                    />
                    <ErrorMessage
                      className="text-red-900 text-[10px]"
                      name="bookingDate"
                      component="div"
                    />
                  </div>
                  <div className="m-3 h-20 w-48">
                    <label>Start Location Latitude</label>
                    <Field
                      className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                      type="number"
                      name="startLocationLatitude"
                    />
                    <ErrorMessage
                      className="text-red-900 text-[10px]"
                      name="startLocationLatitude"
                      component="div"
                    />
                  </div>
                  <div className="m-3 h-20 w-48">
                    <label>Start Location Longitude</label>
                    <Field
                      className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                      type="number"
                      name="startLocationLongitude"
                    />
                    <ErrorMessage
                      className="text-red-900 text-[10px]"
                      name="startLocationLongitude"
                      component="div"
                    />
                  </div>
                  <div className="m-3 h-20 w-48">
                    <label>End Location Latitude</label>
                    <Field
                      className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                      type="number"
                      name="endLocationLatitude"
                    />
                    <ErrorMessage
                      className="text-red-900 text-[10px]"
                      name="endLocationLatitude"
                      component="div"
                    />
                  </div>
                  <div className="m-3 h-20 w-48">
                    <label>End Location Longitude</label>
                    <Field
                      className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                      type="number"
                      name="endLocationLongitude"
                    />
                    <ErrorMessage
                      className="text-red-900 text-[10px]"
                      name="endLocationLongitude"
                      component="div"
                    />
                  </div>
                  <div className="m-3 h-20 w-48">
                    <label>Trip Purpose</label>
                    <Field
                      className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                      type="text"
                      name="tripPurpose"
                    />
                    <ErrorMessage
                      className="text-red-900 text-[10px]"
                      name="tripPurpose"
                      component="div"
                    />
                  </div>
                  <div className="m-3 h-20 w-48">
                    <label>Status</label>
                    <Field
                      className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                      name="status"
                      component="select"
                    >
                      <option value="">Select status</option>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                    </Field>
                    <ErrorMessage
                      className="text-red-900 text-[10px]"
                      name="status"
                      component="div"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="border-double bg-transparent border-secondary border-2 backdrop-blur-3xl flex justify-between gap-2 px-6"
                >
                  <BiSolidBookContent className={`text-xl text-secondary`} />
                  <PiRecycleDuotone className="text-green-800  text-2xl cursor-pointer" />
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
