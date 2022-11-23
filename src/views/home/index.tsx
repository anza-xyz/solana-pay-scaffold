import { FC, useMemo } from 'react';
import { RequestAirdrop } from '../../components/RequestAirdrop';
import pkg from '../../../package.json';
import { WalletSolBalance } from '../../components/WalletSolBalance';
import { SendTransactionRequest } from 'components/SendTransactionRequest';
import { Keypair } from '@solana/web3.js';
import useTransactionListener from 'hooks/useTransactionListener';
import { TransactionRequestQR } from 'components/TransactionRequestQR';
import { Heading } from 'components/Heading';

export const HomeView: FC = ({ }) => {

  const reference = useMemo(() => Keypair.generate().publicKey, []);
  useTransactionListener(reference);

  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <Heading>
          Solana Pay Scaffold <span className='text-sm font-normal align-top text-slate-700'>v{pkg.version}</span>
        </Heading>
        <h4 className="md:w-full text-center text-slate-300 my-2">
          <p>The fastest way to get started with Solana Pay</p>
        </h4>
        <div className="hero rounded-2xl bg-base-content">
          <div className="hero-content text-center">
            <div className="max-w-lg flex flex-col gap-6">
              <h1 className="text-3xl font-bold text-primary">Transaction Requests</h1>
              <SendTransactionRequest reference={reference} />
              <TransactionRequestQR reference={reference} />
            </div>
          </div>
        </div>
        <div className="text-center">
          <RequestAirdrop />
          <WalletSolBalance />
        </div>
      </div>
    </div>
  );
};
