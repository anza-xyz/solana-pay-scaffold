import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, TransactionSignature } from '@solana/web3.js';
import axios from 'axios';
import { PostError, PostResponse } from 'pages/api/transaction';
import { FC, useCallback } from 'react';
import { notify } from '../utils/notifications';
import { useNetworkConfiguration } from '../contexts/NetworkConfigurationProvider'

type SendTransactionRequestProps = {
    reference: PublicKey,
};

export const SendTransactionRequest: FC<SendTransactionRequestProps> = ({ reference }) => {
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
            const { data } = await axios.post(`/api/transaction?cluster=${networkConfiguration}&reference=${reference.toBase58()}`, {
                account: publicKey
            }, {
                // Don't throw for 4xx responses, we handle them
                validateStatus: (s) => s < 500
            });

            const response = data as PostResponse | PostError;

            if ('error' in response) {
                console.error(`Failed to fetch transaction! ${response.error}`);
                notify({ type: 'error', message: 'Failed to fetch transaction!', description: response.error });
                return;
            }

            const message = response.message;
            notify({ type: 'info', message: 'Fetched transaction!', description: message });

            const transaction = Transaction.from(Buffer.from(response.transaction, 'base64'));

            console.log('Fetched transaction', transaction);
            const currentSigners = transaction.signatures.filter(k => k.signature !== null).map(k => k.publicKey.toBase58());
            const expectedSigners = transaction.instructions.flatMap(i => i.keys.filter(k => k.isSigner).map(k => k.pubkey.toBase58()));
            console.log({ currentSigners, expectedSigners });

            await sendTransaction(transaction, connection);

            // TODO: add listener to detect transactions w/ reference
        } catch (error: any) {
            notify({ type: 'error', message: `Transaction failed!`, description: error?.message, txid: signature });
            console.error(`Transaction failed! ${error?.message}`, signature);
            return;
        }
    }, [publicKey, notify, connection, sendTransaction]);

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
