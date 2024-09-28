import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import LoadingSpinner from "../loading-spinner";
import { chains } from "@/constants/chains";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PiArrowSquareRightFill } from "react-icons/pi";
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";
import { formatAddress } from "@/utils/formatAddress";
import { useTokenExchangeStore } from "@/stores/token-exchange-store";

export default function TokenExchangeDialog() {
  const settingAllowance = useTokenExchangeStore(
    (state) => state.settingAllowance
  );
  const awaitingConfirmation = useTokenExchangeStore(
    (state) => state.awaitingConfirmation
  );
  const fromChain = useTokenExchangeStore((state) => state.fromChain);
  const toChain = useTokenExchangeStore((state) => state.toChain);
  const txResult = useTokenExchangeStore((state) => state.txResult);
  const isTokenExchangeDialogOpen = useTokenExchangeStore(
    (state) => state.isTokenExchangeDialogOpen
  );
  const setIsTokenExchangeDialogOpen = useTokenExchangeStore(
    (state) => state.setIsTokenExchangeDialogOpen
  );
  const [fromLogo, setFromLogo] = useState("");
  const [toLogo, setToLogo] = useState("");

  useEffect(() => {
    const chain = chains.find((chain) => chain.name === fromChain);
    if (chain) setFromLogo(chain.logo);
  }, [fromChain]);

  useEffect(() => {
    const chain = chains.find((chain) => chain.name === toChain);
    if (chain) setToLogo(chain.logo);
  }, [toChain]);

  return (
    <Dialog
      open={isTokenExchangeDialogOpen}
      onOpenChange={setIsTokenExchangeDialogOpen}
    >
      <DialogContent className="bg-white text-gray-950 w-[340px]">
        <DialogHeader>
          <DialogTitle className="flex flex-col gap-1 text-xl font-bold mt-1">
            {txResult &&
              !txResult.message &&
              txResult.substatus === "COMPLETED" && (
                <div className="flex gap-x-1 items-center">
                  <p>Transaction completed </p>
                  <IoCheckmarkDoneCircleOutline
                    size={40}
                    className="text-green-600"
                  />
                </div>
              )}
            {txResult &&
              !txResult.message &&
              txResult.substatus === "FAILED" && (
                <>
                  <p>
                    Tranasaction failed{" "}
                    <RxCrossCircled size={20} className="text-red-600" />
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-700">Substatus: </span>
                    {txResult.substatus}
                  </p>
                </>
              )}
            {txResult && !txResult.message && txResult.status === "PENDING" && (
              <div className="flex gap-x-4 items-center">
                <p>Pending transaction</p>
                <LoadingSpinner icon={false} color="#030712" size={30} />
              </div>
            )}
            {txResult && txResult.message && (
              <div className="flex gap-x-4 items-center">
                <p>Pending transaction</p>
                <LoadingSpinner icon={false} color="#030712" size={30} />
              </div>
            )}
            {!txResult && (
              <div className="flex gap-x-4 items-center">
                <p>Pending transaction</p>
                <LoadingSpinner icon={false} color="#030712" size={30} />
              </div>
            )}
          </DialogTitle>
        </DialogHeader>
        <div className="w-[82%] flex justify-between mt-6">
          <p className="text-gray-700">From</p>
          <p className="text-gray-700">To</p>
        </div>
        <div className="flex justify-between items-center -mt-1">
          <div className="flex gap-x-1 items-center">
            <p className="text-lg font-semibold self-end">{fromChain}</p>
            <Image src={fromLogo} alt="token-logo" height={30} width={30} />
          </div>
          <PiArrowSquareRightFill size={30} />
          <div className="flex gap-x-1 items-center">
            <p className="text-lg font-semibold self-end">{toChain}</p>
            <Image src={toLogo} alt="token-logo" height={30} width={30} />
          </div>
        </div>
        <DialogFooter className="mb-1 mt-4">
          <div className="flex items-center gap-x-3">
            {!txResult && settingAllowance && (
              <p className="font-semibold text-lg animate-pulse">
                Setting allowance...
              </p>
            )}
            {!txResult && awaitingConfirmation && !settingAllowance && (
              <p className="font-semibold text-lg animate-pulse">
                Awaiting wallet confirmation...
              </p>
            )}
            {!txResult && !settingAllowance && !awaitingConfirmation && (
              <p className="font-semibold text-lg">Transaction submitted</p>
            )}
            {txResult &&
              txResult.message &&
              !settingAllowance &&
              !awaitingConfirmation && (
                <p className="font-semibold text-lg">Transaction submitted</p>
              )}
            {txResult && !txResult.message && (
              <div className="flex gap-x-2">
                <p className="text-lg">
                  Transaction:{" "}
                  <span className="font-semibold">
                    {formatAddress(txResult.transactionId, 5) ||
                      formatAddress(txResult.sending.txHash, 5)}
                  </span>
                </p>
                <a
                  href={
                    txResult.lifiExplorerLink || txResult.bridgeExplorerLink
                  }
                  target="_blank"
                  className="hover:text-gray-600"
                >
                  <FaExternalLinkAlt size={20} />
                </a>
              </div>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
