import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import { chains } from "@/lib/constants";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PiArrowSquareRightFill } from "react-icons/pi";
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";
import { shortenTx } from "@/lib/utils";
import { useTokenExchangeStore } from "@/stores/token-exchange-store";

type TokenExchangeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
};

export default function TokenExchangeModal({
  isOpen,
  onClose,
  onOpenChange,
}: TokenExchangeModalProps) {
  const settingAllowance = useTokenExchangeStore((state) => state.settingAllowance);
  const awaitingConfirmation = useTokenExchangeStore((state) => state.awaitingConfirmation);
  const fromChain = useTokenExchangeStore((state) => state.fromChain)
  const toChain = useTokenExchangeStore((state) => state.toChain)
  const txResult = useTokenExchangeStore((state) => state.txResult)
  const [fromLogo, setFromLogo] = useState("");
  const [toLogo, setToLogo] = useState("");

  useEffect(() => {
    chains.map((chain) => {
      if (chain.name === fromChain) {
        setFromLogo(chain.logo);
      }
    });
  }, [fromChain]);

  useEffect(() => {
    chains.map((chain) => {
      if (chain.name === toChain) {
        setToLogo(chain.logo)
      }
    })
  }, [toChain])

  return (
    <>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        classNames={{
          backdrop:
            "bg-gradient-to-t from-gray-950 to-gray-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent className="bg-white text-gray-950 w-[340px] h-[275px]">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-xl font-bold mt-2">
                {txResult &&
                  !txResult.message &&
                  txResult.substatus === "COMPLETED" && (
                    <div className="flex gap-x-1 items-center">
                      <p>Tranasaction completed </p>
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
                {txResult &&
                  !txResult.message &&
                  txResult.status === "PENDING" && (
                    <div className="flex gap-x-4">
                      <p>Pending transaction</p>
                      <Spinner color="primary" />
                    </div>
                  )}
                {txResult && txResult.message && (
                  <div className="flex gap-x-4">
                    <p>Pending transaction</p>
                    <Spinner color="primary" />
                  </div>
                )}
                {!txResult && (
                  <div className="flex gap-x-4">
                    <p>Pending transaction</p>
                    <Spinner color="primary" />
                  </div>
                )}
              </ModalHeader>
              <ModalBody>
                <div className="w-[82%] flex justify-between mt-4">
                  <p className="text-gray-700">From</p>
                  <p className="text-gray-700">To</p>
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-x-1">
                    <p className="text-lg font-semibold self-end">
                      {fromChain}
                    </p>
                    <Image
                      src={fromLogo}
                      alt="token-logo"
                      height={30}
                      width={30}
                    />
                  </div>
                  <PiArrowSquareRightFill size={30} />
                  <div className="flex gap-x-1">
                    <p className="text-lg font-semibold self-end">{toChain}</p>
                    <Image
                      src={toLogo}
                      alt="token-logo"
                      height={30}
                      width={30}
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-start mb-2">
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
                    <p className="font-semibold text-lg">
                      Transaction submitted
                    </p>
                  )}
                  {txResult &&
                    txResult.message &&
                    !settingAllowance &&
                    !awaitingConfirmation && (
                      <p className="font-semibold text-lg">
                        Transaction submitted
                      </p>
                    )}
                  {txResult && !txResult.message && (
                    <div className="flex gap-x-2">
                      <p className="text-lg">
                        Transaction:{" "}
                        <span className="font-semibold">
                          {shortenTx(txResult.transactionId)}
                        </span>
                      </p>
                      <a
                        href={txResult.lifiExplorerLink}
                        target="_blank"
                        className="hover:text-gray-600"
                      >
                        <FaExternalLinkAlt size={20} />
                      </a>
                    </div>
                  )}
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
