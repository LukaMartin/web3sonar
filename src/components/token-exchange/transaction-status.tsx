import LoadingSpinner from "./loading-spinner";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { GiCancel } from "react-icons/gi";
import { FaExternalLinkAlt } from "react-icons/fa";
import { shortenTx } from "@/lib/utils";
import { TokenExchangeResult } from "@/lib/token-exchange-result-types";

type TransactionStatusProps = {
  txResult: TokenExchangeResult | null;
  pendingTx: boolean;
  setPendingTx: any;
};

export default function TransactionStatus({
  txResult,
  pendingTx,
  setPendingTx,
}: TransactionStatusProps) {
  return (
    <>
      {pendingTx && (
        <section className="relative w-[375px] h-[200px] flex flex-col justify-between mx-auto p-4 bg-white/[2%] border-[1px] border-white/20 rounded-md shadow-[0_7px_5px_rgba(2,2,2,1)] animate-slideUp">
          <button onClick={() => setPendingTx(false)}>
            <GiCancel
              size={27}
              className="absolute -top-3 -left-3 text-white/90 hover:text-white/60"
            />
          </button>
          {txResult && !txResult.message && (
            <a
              href={txResult.lifiExplorerLink}
              target="_blank"
              className="text-lg hover:text-white/50 mb-2"
            >
              <p>Tx: {shortenTx(txResult.transactionId)}</p>
            </a>
          )}
          <div className="flex justify-between">
            <div>
              <p className="text-white/50">Status</p>
              <p className="text-lg">{`${
                txResult && !txResult.message
                  ? txResult.substatus
                  : "Transaction pending..."
              }`}</p>
            </div>
            {pendingTx && !txResult && <LoadingSpinner />}
            {txResult?.message && <LoadingSpinner />}
            {pendingTx && txResult && txResult.substatus === "COMPLETED" ? (
              <IoCheckmarkDoneCircleOutline
                size={50}
                className="text-green-yellow"
              />
            ) : pendingTx && txResult && txResult.status === "PENDING" ? (
              <LoadingSpinner />
            ) : pendingTx && txResult && !txResult.message ? (
              <GiCancel size={50} className="text-red-600" />
            ) : null}
          </div>
          <div className="flex flex-col">
            {txResult && !txResult.message && (
              <p className="text-white/50 mt-4">View in explorer</p>
            )}
            <div className="flex mt-2 mr-1 justify-between">
              {txResult && !txResult.message && (
                <>
                  <div className="flex gap-x-4">
                    <p className="text-white/50">Sending</p>
                    {txResult.sending.txLink && (
                      <a target="_blank" href={txResult.sending.txLink}>
                        <FaExternalLinkAlt
                          size={25}
                          className="hover:text-white/60"
                        />
                      </a>
                    )}
                  </div>
                  <div className="flex gap-x-4">
                    <p className="text-white/50">Receiving</p>
                    {txResult.receiving.txLink && (
                      <a target="_blank" href={txResult.receiving.txLink}>
                        <FaExternalLinkAlt
                          size={25}
                          className="hover:text-white/60"
                        />
                      </a>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
