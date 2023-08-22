import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, TransactionSignature } from '@solana/web3.js';
import { FC, useCallback } from 'react';
import { notify } from '../utils/notifications';

type SendTransferRequestProps = {
  reference: PublicKey,
};

export const SendTransferRequest: FC<SendTransferRequestProps> = ({ reference }) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const onClick = useCallback(async () => {
    if (!publicKey) {
      notify({ type: 'error', message: `Wallet not connected!` });
      console.error('Send Transaction: Wallet not connected!');
      return;
    }

    let signature: TransactionSignature = '';
    try {
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

      // Transfer transaction
      const transaction = new Transaction({
        feePayer: publicKey,
        blockhash,
        lastValidBlockHeight,
      });

      const transferInstruction = SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: PublicKey("9SByUpbgcSNjw1SR6ScXcScziBQT48gRRkggFE1Wr1mG"),
        lamports: LAMPORTS_PER_SOL / 1000,
      });

      // Add reference as a key to the instruction
      transferInstruction.keys.push({
        pubkey: reference,
        isSigner: false,
        isWritable: false,
      });

      transaction.add(transferInstruction);

      // Debug: log current and expected signers of the transaction
      console.log('Created transaction', transaction);
      const currentSigners = transaction.signatures.filter(k => k.signature !== null).map(k => k.publicKey.toBase58());
      const expectedSigners = transaction.instructions.flatMap(i => i.keys.filter(k => k.isSigner).map(k => k.pubkey.toBase58()));
      console.log({ currentSigners, expectedSigners });

      // Send the transaction
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
