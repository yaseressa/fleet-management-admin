"use client";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";

import { useSession, signIn, signOut } from "next-auth/react";
import * as yup from "yup";
import { FaUser, FaLock } from "react-icons/fa6";
import { TbBrandGmail, TbLockQuestion } from "react-icons/tb";

const HForm = ({ callBack }: any) => {
  const [Error, setErr] = useState("");
  const { data: session, status } = useSession();

  return (
    <>
      <section className="bg-transparent font-rock tracking-wider h-screen ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link
            href="#"
            className="flex items-center mb-2 md:text-4xl text-3xl font-semibold font-neon h-20 space-x-9 bg-gradient-to-tl via-secondary from-tertiary to-primary text-transparent  bg-clip-text text-center drop-shadow-[0px_3px_12px_rgba(82,109,130,1)]"
          >
            Fleet Management System
          </Link>
          <div className="w-full md:w-1/2 bg-black bg-opacity-30 backdrop-blur-3xl rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 !border-double border-secondary border-4 drop-shadow-[0px_3px_12px_rgba(82,109,130,1)]">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="flex justify-center text-md font-bold leading-tight text-secondary font-neon md:text-2xl">
                Sign-in
              </h1>
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={yup.object({
                  email: yup
                    .string()
                    .email("Invalid Email")
                    .required("Required"),
                  password: yup
                    .string()
                    .max(40, "Must be smaller than 20 characters. ")
                    .min(8, "Must be of length 8 characters. "),
                })}
                onSubmit={async (values, { setSubmitting }) => {
                  signIn("credentials", {
                    email: values.email,
                    password: values.password,
                    redirect: false,
                    callbackUrl: callBack,
                  }).then(
                    //@ts-ignore
                    ({ ok, error }) => {
                      if (error) {
                        toast(error, { type: "error" });
                      } else {
                        toast(error, { type: "success" });
                        window.location.replace("/admin/dash");
                      }
                    }
                  );
                  setSubmitting(false);
                }}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-4 md:space-y-6">
                    <div className="relative h-16">
                      <span className="absolute inset-y-0 -translate-y-2 flex items-center pl-4">
                        <TbBrandGmail className="self-center text-secondary text-2xl" />
                      </span>
                      <Field
                        type="email"
                        name="email"
                        className="pl-12 bg-transparent text-secondary sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 !border-double border-secondary  border-4 placeholder-secondary"
                        placeholder="name@company.com"
                        required
                      />
                      <ErrorMessage
                        name="email"
                        render={(msg: string) => (
                          <p className="text-red-700 text-sm ml-2">{msg}</p>
                        )}
                      />
                    </div>
                    <div className="relative h-16">
                      <span className="absolute inset-y-0 -translate-y-2 flex items-center pl-4">
                        <TbLockQuestion className="self-center text-secondary text-2xl" />{" "}
                      </span>
                      <Field
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        className="pl-12 bg-transparent text-secondary sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 !border-double border-secondary border-4 placeholder-secondary"
                        required
                      />
                      <ErrorMessage
                        name="password"
                        render={(msg: string) => (
                          <p className="text-red-700 text-sm ml-2">{msg}</p>
                        )}
                      />
                    </div>
                    <div className="flex items-center justify-end">
                      <Link
                        href="#"
                        className="text-sm text-primary font-bold font-neon hover:underline dark:text-primary-500"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    {Error && (
                      <p className="text-red-700 text-md ml-2">{Error}</p>
                    )}
                    <button
                      type="submit"
                      className="w-full text-secondary bg-transparent !border-double border-secondary  border-2 placeholder-secondary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover-bg-primary-700 dark:focus:ring-primary-800"
                      disabled={isSubmitting}
                    >
                      Sign in
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HForm;
