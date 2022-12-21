import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, TransactionSignature } from '@solana/web3.js';
import axios from 'axios';
import { PostError, PostResponse } from 'pages/api/transaction';
import { FC, useCallback } from 'react';
import { notify } from '../utils/notifications';
import { useNetworkConfiguration } from '../contexts/NetworkConfigurationProvider'

type SendTransferRequestProps = {
  reference: PublicKey,
};

export const SendTransferRequest: FC<SendTransferRequestProps> = ({ reference }) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const { networkConfiguration } = useNetworkConfiguration();

  const onClick = useCallback(async () => {
    if (!publicKey) {
      notify({ type: 'error', message: `Wallet not connected!` });
      console.error('Send Transaction: Wallet not connected!');
      return;
    }

    let signature: TransactionSignature = '';
    try {
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

      const transaction = new Transaction({
        feePayer: publicKey,
        blockhash,
        lastValidBlockHeight,
      });

      const transferInstruction = SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: Keypair.generate().publicKey,
        lamports: LAMPORTS_PER_SOL / 1000,
      });

      // Add reference as a key to the instruction
      transferInstruction.keys.push({
        pubkey: reference,
        isSigner: false,
        isWritable: false,
      });

      transaction.add(transferInstruction);

      console.log('Created transaction', transaction);
      const currentSigners = transaction.signatures.filter(k => k.signature !== null).map(k => k.publicKey.toBase58());
      const expectedSigners = transaction.instructions.flatMap(i => i.keys.filter(k => k.isSigner).map(k => k.pubkey.toBase58()));
      console.log({ currentSigners, expectedSigners });

      await sendTransaction(transaction, connection);
    } catch (error: any) {
      notify({ type: 'error', message: `Transaction failed!`, description: error?.message, txid: signature });
      console.error(`Transaction failed! ${error?.message}`, signature);
      return;
    }
  }, [publicKey, connection, reference, sendTransaction]);

  return (
    <div>
      <button
        className="group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ... "
        onClick={onClick} disabled={!publicKey}
      >
        <div className="hidden group-disabled:block ">
          Wallet not connected
        </div>
        <span className="block group-disabled:hidden" >
          Send with wallet
        </span>
      </button>
    </div>
  );
};
