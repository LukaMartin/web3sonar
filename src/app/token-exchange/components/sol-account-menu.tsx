"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import useFetchUserBalanceSol from "@/hooks/useFetchUserBalanceSol";
import useSolanaActiveWallet from "solana-active-wallet-react";
import { formatAddress } from "@/lib/utils";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import solLogo from "../../../../public/solana-logo.svg";
import Image from "next/image";
import { BiSolidCopy } from "react-icons/bi";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa6";
import { useToast } from "../../../components/ui/use-toast";

type SolAccountMenuProps = {
  children: React.ReactNode;
};

export default function SolAccountMenu({ children }: SolAccountMenuProps) {
  const { solBalance } = useFetchUserBalanceSol();
  const { disconnect, publicKey, wallet } = useWallet();
  const { activePublicKey } = useSolanaActiveWallet(publicKey, wallet);
  const { toast } = useToast();

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="bg-gray-950 text-white w-96 border border-white/10">
        <DialogHeader>
          <DialogDescription className="text-white/80 flex flex-col items-center justify-center text-lg">
            <div className="bg-white/[5%] rounded-full p-2 mb-5 mt-10">
              <div className="h-16 w-16 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-full" />
            </div>

            <div className="flex items-center gap-x-2 mb-5">
              <p className="text-xl">
                {activePublicKey &&
                  formatAddress(activePublicKey?.toString(), 5)}
              </p>
              <BiSolidCopy
                size={25}
                className="hover:cursor-pointer hover:text-white transition"
                onClick={() => {
                  if (activePublicKey?.toString()) {
                    navigator.clipboard.writeText(activePublicKey?.toString());
                    toast({
                      action: (
                        <div className="flex items center justify-center w-full gap-x-2 text-white/90">
                          <FaRegCheckCircle size={25} />
                          <p>Wallet address copied to clipboard</p>
                        </div>
                      ),
                      variant: "default",
                      className: "font-semibold bg-gray-950 border-none",
                    });
                  }
                }}
              />
            </div>

            <div className="flex items-center gap-x-2 mb-5">
              <Image src={solLogo} alt="solana" width={30} height={30} />
              <p>{solBalance.toFixed(3)} SOL</p>
            </div>

            <Link
              href={
                activePublicKey
                  ? `https://solscan.io/account/${activePublicKey?.toString()}`
                  : ""
              }
              target="_blank"
              className="flex gap-x-2 items-center justify-center w-full mb-2 bg-white/[2%] py-2 rounded-md hover:text-white hover:bg-white/10 transition"
            >
              <p>View on Solscan</p>
              <HiOutlineExternalLink size={22} />
            </Link>

            <DialogClose asChild>
              <button
                onClick={disconnect}
                className="bg-white/[2%] flex items-center justify-center gap-x-2 rounded-md py-2 w-full hover:text-white hover:bg-white/10 transition"
              >
                Disconnect
                <FaPowerOff size={20} />
              </button>
            </DialogClose>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
