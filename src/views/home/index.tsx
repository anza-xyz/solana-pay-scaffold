// Next, React
import { FC, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

// Components
import { RequestAirdrop } from '../../components/RequestAirdrop';
import pkg from '../../../package.json';

// Store
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';
import { WalletSolBalance } from '../../components/WalletSolBalance';
import axios from 'axios';
import { SendTransactionRequest } from 'components/SendTransactionRequest';
import { Keypair, PublicKey } from '@solana/web3.js';
import useTransactionListener from 'hooks/useTransactionListener';

export const HomeView: FC = ({ }) => {

  const reference = useMemo(() => Keypair.generate().publicKey, []);
  useTransactionListener(reference);

  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl md:pl-12 font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
          Solana Pay Scaffold <span className='text-sm font-normal align-top text-slate-700'>v{pkg.version}</span>
        </h1>
        <h4 className="md:w-full text-center text-slate-300 my-2">
          <p>The fastest way to get started with Solana Pay</p>
        </h4>
        <div className="hero rounded-2xl bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-lg">
              <h1 className="text-3xl font-bold">Transaction Requests</h1>
              <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
              <SendTransactionRequest reference={reference} />
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
