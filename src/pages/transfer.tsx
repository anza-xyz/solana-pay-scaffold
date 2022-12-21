import type { NextPage } from "next";

const Transfer: NextPage = () => {
  return (
    <div className="hero rounded-2xl bg-base-content">
      <div className="hero-content text-center">
        <div className="max-w-lg flex flex-col gap-6">
          <h1 className="text-3xl font-bold text-primary">Transfer Request</h1>
          {/* <SendTransactionRequest reference={reference} /> */}
          {/* <TransactionRequestQR reference={reference} /> */}
        </div>
      </div>
    </div>
  );
};

export default Transfer;
