// Next, React
import { FC, useEffect } from 'react';

// Wallet
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

// Store
import useUserSOLBalanceStore from '../stores/useUserSOLBalanceStore';


export const WalletSolBalance: FC = ({ }) => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  const balance = useUserSOLBalanceStore((s) => s.balance);
  const { getUserSOLBalance } = useUserSOLBalanceStore();

  useEffect(() => {
    if (publicKey) {
      console.log(publicKey.toBase58())
      getUserSOLBalance(publicKey, connection)
    }
  }, [publicKey, connection, getUserSOLBalance]);

  return publicKey ? <p>SOL Balance: {(balance || 0).toLocaleString()}</p> : null;
}
