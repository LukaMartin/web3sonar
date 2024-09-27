import useFetchUserBalanceSol from "@/hooks/useFetchUserBalanceSol";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import solLogo from "../../../public/solana-logo.svg";
import SolAccountMenu from "./sol-account-menu";
import useSolanaActiveWallet from "solana-active-wallet-react";
import { formatAddress } from "@/utils/formatAddress";

export default function SolAccountButton() {
  const { solBalance } = useFetchUserBalanceSol();
  const { connected, publicKey, wallet } = useWallet();
  const { activePublicKey } = useSolanaActiveWallet(publicKey, wallet);

  return (
    <>
      {connected && (
        <div className="flex w-80 items-center justify-between px-4">
          <div className="flex items-center gap-x-[0.375rem]">
            <Image src={solLogo} alt="solana" width={32} height={32} />
            <p className="font-semibold text-white/90">
              {solBalance.toFixed(3)} SOL
            </p>
          </div>

          <SolAccountMenu>
            <button className="flex items-center justify-center gap-x-[0.375rem] bg-white/[5%] border border-white/10 rounded-3xl py-1 w-36 hover:bg-white/10 transition">
              <p className="text-white/60 font-semibold hover:text-white transition">
                {activePublicKey && formatAddress(activePublicKey?.toString(), 5)}
              </p>
            </button>
          </SolAccountMenu>
        </div>
      )}
    </>
  );
}
