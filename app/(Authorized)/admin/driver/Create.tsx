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
const Create = ({ refetch }) => {
  const onSubmit = (value) => {
    fetch(process.env.NEXT_PUBLIC_APP_URL + `api/driver`, {
      method: "post",
      body: JSON.stringify(value),
      headers: { "Content-Types": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => toast.success(res));
  };
  return (
    <Dialog onOpenChange={refetch}>
      <DialogTrigger>
        <Button className="border-double bg-transparent border-secondary border-2 backdrop-blur-3xl flex justify-between gap-2">
          <PiPersonFill className={`text-xl text-secondary`} />
          <PiPlusSquareDuotone className="text-lg text-secondary" />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[850px] drop-shadow-2xl">
        <DialogHeader>
          <DialogTitle className="font-rock text-primary">
            Create Driver
          </DialogTitle>
          <DialogDescription className="font-rock pt-4 flex justify-evenly items-start  w-fit">
            <PiPersonFill className={`text-6xl text-secondary m-10`} />

            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                contactPhone: "",
                contactEmail: "",
                licenseNumber: "",
                licenseExpiryDate: "",
                driverStatus: "",
              }}
              validationSchema={Yup.object().shape({
                firstName: Yup.string().required("First Name is required"),
                lastName: Yup.string().required("Last Name is required"),
                contactPhone: Yup.string().required("Phone is required"),
                contactEmail: Yup.string()
                  .email("Invalid email address")
                  .required("Email is required"),
                licenseNumber: Yup.string().required(
                  "License Number is required"
                ),
                licenseExpiryDate: Yup.date().required(
                  "License Expiry Date is required"
                ),
                driverStatus: Yup.string().required(
                  "Driver Status is required"
                ),
              })}
              onSubmit={(values) => {
                onSubmit(values);
              }}
            >
              <Form className="flex flex-col justify-center items-center">
                <div className="flex flex-col justify-start items-start flex-wrap h-[320px]">
                  <div className="m-3 h-20 w-48">
                    <label>First Name</label>
                    <Field
                      className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                      type="text"
                      name="firstName"
                    />
                    <ErrorMessage
                      className="text-red-900 text-[10px]"
                      name="firstName"
                      component="div"
                    />
                  </div>
                  <div className="m-3 h-20 w-48">
                    <label>Last Name</label>
                    <Field
                      className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                      type="text"
                      name="lastName"
                    />
                    <ErrorMessage
                      className="text-red-900 text-[10px]"
                      name="lastName"
                      component="div"
                    />
                  </div>
                  <div className="m-3 h-20 w-48">
                    <label>Phone</label>
                    <Field
                      className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                      type="text"
                      name="contactPhone"
                    />
                    <ErrorMessage
                      className="text-red-900 text-[10px]"
                      name="contactPhone"
                      component="div"
                    />
                  </div>
                  <div className="m-3 h-20 w-48">
                    <label>Email</label>
                    <Field
                      className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                      type="phone"
                      name="contactEmail"
                    />
                    <ErrorMessage
                      className="text-red-900 text-[10px]"
                      name="contactEmail"
                      component="div"
                    />
                  </div>
                  <div className="m-3 h-20 w-48">
                    <label>License Number</label>
                    <Field
                      className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                      type="text"
                      name="licenseNumber"
                    />
                    <ErrorMessage
                      className="text-red-900 text-[10px]"
                      name="licenseNumber"
                      component="div"
                    />
                  </div>
                  <div className="m-3 h-20 w-48">
                    <label>License Expiry Date</label>
                    <Field
                      className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                      type="datetime-local"
                      name="licenseExpiryDate"
                    />
                    <ErrorMessage
                      className="text-red-900 text-[10px]"
                      name="licenseExpiryDate"
                      component="div"
                    />
                  </div>
                  <div className="m-3 h-20 w-48">
                    <label>Driver Status</label>
                    <Field
                      className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                      name="driverStatus"
                      component="select"
                    >
                      <option value="">Select status</option>
                      <option value="active">Active</option>
                      <option value="on-leave">On Leave</option>
                    </Field>
                    <ErrorMessage
                      className="text-red-900 text-[10px]"
                      name="driverStatus"
                      component="div"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="border-double bg-transparent border-secondary border-2 backdrop-blur-3xl flex justify-between gap-2 px-6"
                >
                  <PiPersonFill className={`text-xl text-secondary`} />
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
