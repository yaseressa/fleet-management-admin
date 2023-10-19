"use client";
import { useSearchParams } from "next/navigation";
import HForm from "./Form";
require("dotenv").config();
export default function Page() {
  const callBack = useSearchParams().get("callbackUrl");
  return <HForm callBack={callBack} />;
}
