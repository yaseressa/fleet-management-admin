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
import { PiCarFill, PiPersonFill, PiPlusSquareDuotone } from "react-icons/pi";
import { toast } from "react-toastify";
const Create = ({ refetch }) => {
  const onSubmit = (value) => {
    fetch(process.env.NEXT_PUBLIC_APP_URL + `api/vehicle`, {
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
          <PiCarFill className={`text-xl text-secondary`} />
          <PiPlusSquareDuotone className="text-lg text-secondary" />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[850px] drop-shadow-2xl">
        <DialogHeader>
          <DialogTitle className="font-rock text-primary">
            Create Vehicle
          </DialogTitle>
          <DialogDescription className="font-rock pt-4 flex justify-evenly items-start  w-fit">
            <PiCarFill className={`text-6xl text-secondary m-10`} />

            <Formik
              initialValues={{
                vehicleType: "",
                vehicleMake: "",
                vehicleModel: "",
                vehicleLicensePlate: "",
                currentLocationLatitude: "",
                currentLocationLongitude: "",
                status: "",
              }}
              validationSchema={Yup.object().shape({
                vehicleType: Yup.string().required("Vehicle Type is required"),
                vehicleMake: Yup.string().required("Vehicle Make is required"),
                vehicleModel: Yup.string().required(
                  "Vehicle Model is required"
                ),
                vehicleLicensePlate: Yup.string().required(
                  "License Plate is required"
                ),
                currentLocationLatitude: Yup.number().required(
                  "Latitude is required"
                ),
                currentLocationLongitude: Yup.number().required(
                  "Longitude is required"
                ),
                status: Yup.string().required("Status is required"),
              })}
              onSubmit={(values) => {
                values = {
                  ...values,
                  ["currentLocation"]:
                    values.currentLocationLatitude +
                    " " +
                    values.currentLocationLongitude,
                };
                onSubmit(values);
              }}
            >
              <Form className="flex flex-col justify-center items-center">
                <div className="flex flex-col justify-start items-start flex-wrap  h-[320px]">
                  <div className="m-3 h-20 w-48">
                    <label>Vehicle Type</label>
                    <Field
                      className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background "
                      type="text"
                      name="vehicleType"
                    />
                    <ErrorMessage
                      className="text-red-900 text-[10px]"
                      name="vehicleType"
                      component="div"
                    />
                  </div>
                  <div className="m-3 h-20 w-48">
                    <label>Vehicle Make</label>
                    <Field
                      className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background "
                      type="text"
                      name="vehicleMake"
                    />
                    <ErrorMessage
                      className="text-red-900 text-[10px]"
                      name="vehicleMake"
                      component="div"
                    />
                  </div>
                  <div className="m-3 h-20 w-48">
                    <label>Vehicle Model</label>
                    <Field
                      className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background "
                      type="text"
                      name="vehicleModel"
                    />
                    <ErrorMessage
                      className="text-red-900 text-[10px]"
                      name="vehicleModel"
                      component="div"
                    />
                  </div>
                  <div className="m-3 h-20 w-48">
                    <label>Vehicle License Plate</label>
                    <Field
                      className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background "
                      type="text"
                      name="vehicleLicensePlate"
                    />
                    <ErrorMessage
                      className="text-red-900 text-[10px]"
                      name="vehicleLicensePlate"
                      component="div"
                    />
                  </div>
                  <div className="m-3 h-20 w-48">
                    <label>Current Location Latitude</label>
                    <Field
                      className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background "
                      type="number"
                      name="currentLocationLatitude"
                    />
                    <ErrorMessage
                      className="text-red-900 text-[10px]"
                      name="currentLocationLatitude"
                      component="div"
                    />
                  </div>
                  <div className="m-3 h-20 w-48">
                    <label>Current Location Longitude</label>
                    <Field
                      className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background "
                      type="number"
                      name="currentLocationLongitude"
                    />
                    <ErrorMessage
                      className="text-red-900 text-[10px]"
                      name="currentLocationLongitude"
                      component="div"
                    />
                  </div>
                  <div className="m-3 h-20 w-48">
                    <label>Status</label>
                    <Field
                      className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background "
                      name="status"
                      component="select"
                    >
                      <option value="">status</option>
                      <option value="active">Active</option>
                      <option value="in-maintenance">In Maintenance</option>
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
                  <PiCarFill className={`text-xl text-secondary`} />
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
