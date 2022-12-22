import { createQR, encodeURL, TransferRequestURLFields } from "@solana/pay";
import { Keypair, PublicKey } from "@solana/web3.js";
import BigNumber from "bignumber.js";
import { FC, useEffect, useRef } from "react";

type TransferRequestQRProps = {
  reference: PublicKey,
};

export const TransferRequestQR: FC<TransferRequestQRProps> = ({ reference }) => {
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create a transfer request QR code
    const urlParams: TransferRequestURLFields = {
      recipient: Keypair.generate().publicKey,
      amount: new BigNumber(1 / 1000), // amount in SOL
      reference,
      label: 'My Store',
      message: 'Thankyou for your purchase!',
    };
    const solanaUrl = encodeURL(urlParams);
    const qr = createQR(solanaUrl, 512, 'transparent')
    qr.update({ backgroundOptions: { round: 1000 } });
    if (qrRef.current) {
      qrRef.current.innerHTML = ''
      qr.append(qrRef.current)
    }
  }, [reference]);

  return (
    <div className="rounded-2xl">
      <div ref={qrRef} />
    </div>
  )
}
