import { Keypair } from "@solana/web3.js";
import { SendTransferRequest } from "components/SendTransferRequest";
import { TransferRequestQR } from "components/TransferRequestQR";
import useTransactionListener from "hooks/useTransactionListener";
import type { NextPage } from "next";
import { useMemo } from "react";

const Transfer: NextPage = () => {
  // Generate a public key that will be added to the transaction
  // so we can listen for it
  const reference = useMemo(() => Keypair.generate().publicKey, []);

  // Listen for transactions with the reference
  useTransactionListener(reference);

  return (
    <div className="hero rounded-2xl bg-base-content">
      <div className="hero-content text-center">
        <div className="max-w-lg flex flex-col gap-6">
          <h1 className="text-3xl font-bold text-primary">Transfer Request</h1>
          {/* Button for a transfer request */}
          <SendTransferRequest reference={reference} />
          {/* QR code for a transfer request */}
          <TransferRequestQR reference={reference} />
        </div>
      </div>
    </div>
  );
};

export default Transfer;
