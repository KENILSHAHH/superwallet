import React, { useState } from "react";
import { FadeLoader } from "react-spinners";

const TransferingPage = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center min-h-[70vh] items-center gap-y-[15px]">
        <FadeLoader color="#3e99ff" />
        <h1 className="font-[600] text-[25px]">Transferring</h1>
      </div>
    </div>
  );
};

export default TransferingPage;
