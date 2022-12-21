import { FC } from "react";
import pkg from '../../package.json';
import { Heading } from "./Heading";
import { RequestAirdrop } from "./RequestAirdrop";
import { WalletSolBalance } from "./WalletSolBalance";

export const Layout: FC = ({ children }) => {
  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <Heading>
          Solana Pay Scaffold <span className='text-sm font-normal align-top text-slate-700'>v{pkg.version}</span>
        </Heading>
        <h4 className="md:w-full text-center text-slate-300 my-2">
          <p>The fastest way to get started with Solana Pay</p>
        </h4>
        {children}
        <div className="text-center">
          <RequestAirdrop />
          <WalletSolBalance />
        </div>
      </div>
    </div>
  )
}