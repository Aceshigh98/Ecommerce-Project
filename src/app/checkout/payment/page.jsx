import React from "react";
import { auth } from "@/src/lib/auth";

const page = async () => {
  const session = await auth();

  if (!session) {
    return <div>Not authorized please login!</div>;
  }

  return <div>Payment Gateway</div>;
};

export default page;
