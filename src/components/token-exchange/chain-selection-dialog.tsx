"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import Image from "next/image";
import ethLogo from "../../../public/eth-logo.svg";
import solLogo from "../../../public/solana-logo.svg";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useEffect } from "react";

type ChainSelectionDialogProps = {
  children: React.ReactNode;
};

export default function ChainSelectionDialog({
  children,
}: ChainSelectionDialogProps) {
  const { open } = useWeb3Modal();
  const { setVisible: setModalVisible, visible } = useWalletModal();

  useEffect(() => {
    if (!visible) {
      document.body.style.removeProperty("overflow");
    }
    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [visible]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-gray-950 text-white w-[375px] h-52 border-none">
        <DialogHeader>
          <DialogDescription>
            <div className="flex items-center justify-evenly mt-8">
              <div className="flex flex-col items-center gap-2">
                <DialogClose asChild>
                  <button
                    onClick={() => open()}
                    className="bg-white/[4%] p-2 rounded-md hover:bg-white/[8%] transition"
                  >
                    <Image src={ethLogo} alt="chain" height={65} width={65} />
                  </button>
                </DialogClose>
                <p className="text-lg font-semibold">EVM</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <DialogClose asChild>
                  <button
                    onClick={() => setModalVisible(true)}
                    className="bg-white/[4%] p-2 rounded-md hover:bg-white/[8%] transition"
                  >
                    <Image src={solLogo} alt="chain" height={65} width={65} />
                  </button>
                </DialogClose>
                <p className="text-lg font-semibold">SOL</p>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
