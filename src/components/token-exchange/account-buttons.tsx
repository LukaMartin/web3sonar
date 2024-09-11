import { useAccount } from "wagmi";
import EVMAccountButton from "./evm-account-button";
import SolAccountButton from "./sol-account-button";
import { useWallet } from "@solana/wallet-adapter-react";

export default function AccountButtons() {
  const { connected } = useWallet();
  const { isConnected } = useAccount();

  return (
    <div
      className={`${
        !connected && !isConnected
          ? "hidden"
          : "flex flex-col gap-y-1 bg-white/5 mt-4 mx-6 rounded-md py-[0.375rem]"
      }`}
    >
      <SolAccountButton />

      <EVMAccountButton />
    </div>
  );
}
