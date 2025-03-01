import React, { useState } from "react";
import { FadeLoader } from "react-spinners";
import TransferSuccess from "./TransactionSuccess";
import TransactionError from "./TransactionError";

const TransferingPage = () => {
  const [transactionStatus, setTransactionStatus] = useState("error");
  return (
    <div className="flex flex-col">
      {transactionStatus === "pending" ? (
        <div className="flex flex-col justify-center min-h-[70vh] items-center gap-y-[15px]">
          <FadeLoader color="#3e99ff" />
          <h1 className="font-[600] text-[25px]">Transferring</h1>
        </div>
      ) : transactionStatus === "success" ? (
        <TransferSuccess />
      ) : (
        <TransactionError />
      )}
    </div>
  );
};

export default TransferingPage;
