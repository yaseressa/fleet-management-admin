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
const Create = ({ refetch }) => {
  const onSubmit = (value) => {
    fetch(process.env.NEXT_PUBLIC_APP_URL + `api/customer`, {
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
          <ImUserTie className={`text-xl text-secondary`} />
          <PiPlusSquareDuotone className="text-lg text-secondary" />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[650px] drop-shadow-2xl">
        <DialogHeader>
          <DialogTitle className="font-rock text-primary">
            Create Customer
          </DialogTitle>
          <DialogDescription className="font-rock pt-4 flex justify-evenly items-start  w-fit">
            <ImUserTie className={`text-6xl text-secondary m-10`} />

            <Formik
              initialValues={{
                customerName: "",
                contactPerson: "",
                contactEmail: "",
                contactPhone: "",
                address: "",
                notes: "",
              }}
              validationSchema={Yup.object().shape({
                customerName: Yup.string().required(
                  "Customer Name is required"
                ),
                contactPerson: Yup.string().required(
                  "Contact Person is required"
                ),
                contactEmail: Yup.string()
                  .email("Invalid email address")
                  .required("Contact Email is required"),
                contactPhone: Yup.string().required(
                  "Contact Phone is required"
                ),
                address: Yup.string().required("Address is required"),
                notes: Yup.string(),
              })}
              onSubmit={(values) => {
                values = {
                  ...values,
                };
                onSubmit(values);
              }}
            >
              <Form className="flex flex-col justify-center items-center">
                <div className="flex flex-col justify-start items-start flex-wrap h-[320px]">
                  <div className="m-3 h-20 w-48">
                    <label>Customer Name</label>
                    <Field
                      className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                      type="text"
                      name="customerName"
                    />
                    <ErrorMessage
                      className="text-red-900 text-[10px]"
                      name="customerName"
                      component="div"
                    />
                  </div>
                  <div className="m-3 h-20 w-48">
                    <label>Contact Person</label>
                    <Field
                      className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                      type="text"
                      name="contactPerson"
                    />
                    <ErrorMessage
                      className="text-red-900 text-[10px]"
                      name="contactPerson"
                      component="div"
                    />
                  </div>
                  <div className="m-3 h-20 w-48">
                    <label>Contact Email</label>
                    <Field
                      className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                      type="email"
                      name="contactEmail"
                    />
                    <ErrorMessage
                      className="text-red-900 text-[10px]"
                      name="contactEmail"
                      component="div"
                    />
                  </div>
                  <div className="m-3 h-20 w-48">
                    <label>Contact Phone</label>
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
                    <label>Address</label>
                    <Field
                      className="flex h-10 w-full rounded-md bg-transparent border-double border-secondary border-2 backdrop-blur-3xl px-3 py-2 text-sm ring-offset-background"
                      type="text"
                      name="address"
                    />
                    <ErrorMessage
                      className="text-red-900 text-[10px]"
                      name="address"
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
                  <ImUserTie className={`text-xl text-secondary`} />
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
