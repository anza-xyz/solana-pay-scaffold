import { Keypair } from "@solana/web3.js";
import { SendTransferRequest } from "components/SendTransferRequest";
import { TransferRequestQR } from "components/TransferRequestQR";
import useTransactionListener from "hooks/useTransactionListener";
import type { NextPage } from "next";
import { useMemo } from "react";

const Transfer: NextPage = () => {
  const reference = useMemo(() => Keypair.generate().publicKey, []);
  useTransactionListener(reference);

  return (
    <div className="hero rounded-2xl bg-base-content">
      <div className="hero-content text-center">
        <div className="max-w-lg flex flex-col gap-6">
          <h1 className="text-3xl font-bold text-primary">Transfer Request</h1>
          <SendTransferRequest reference={reference} />
          <TransferRequestQR reference={reference} />
        </div>
      </div>
    </div>
  );
};

export default Transfer;
