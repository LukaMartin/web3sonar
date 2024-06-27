import { EstimatedPriceItemProps } from "@/lib/types";

export default function EstimatedPriceItem({
  confidence,
  maxPriorityFeePerGas,
  maxFeePerGas,
}: EstimatedPriceItemProps) {

  return confidence > 95 ? (
    <div className="flex flex-col text-center border-4 border-green-600 rounded-xl p-3 sm:p-6 background-gradient drop-shadow-[0_0px_5px_rgba(56,236,52,0.25)]">
      <p className="pb-1 font-semibold">Probability</p>
      <p className="pb-2 text-green-600">{confidence}%</p>
      <p className="pb-1 font-semibold">Max Priority Fee</p>
      <p className="pb-2 text-green-600">{maxPriorityFeePerGas}</p>
      <p className="pb-1 font-semibold">Max Fee</p>
      <p className=" text-green-600">{maxFeePerGas}</p>
    </div>
  ) : confidence > 90 ? (
    <div className="flex flex-col text-center border-4 border-accent rounded-xl p-3 sm:p-6 background-gradient drop-shadow-[0_0px_5px_rgba(164,248,57,0.25)]">
      <p className="pb-1 font-semibold">Probability</p>
      <p className="pb-2 text-accent">{confidence}%</p>
      <p className="pb-1 font-semibold">Max Priority Fee</p>
      <p className="pb-2 text-accent">{maxPriorityFeePerGas}</p>
      <p className="pb-1 font-semibold">Max Fee</p>
      <p className=" text-accent">{maxFeePerGas}</p>
    </div>
  ) : confidence > 80 ? (
    <div className="flex flex-col text-center border-4 border-gold rounded-xl p-3 sm:p-6 background-gradient drop-shadow-[0_0px_5px_rgba(229,209,13,0.25)]">
      <p className="pb-1 font-semibold">Probability</p>
      <p className="pb-2 text-gold">{confidence}%</p>
      <p className="pb-1 font-semibold">Max Priority Fee</p>
      <p className="pb-2 text-gold">{maxPriorityFeePerGas}</p>
      <p className="pb-1 font-semibold">Max Fee</p>
      <p className=" text-gold">{maxFeePerGas}</p>
    </div>
  ) : confidence > 70 ? (
    <div className="flex flex-col text-center border-4 border-fuel-yellow rounded-xl p-3 sm:p-6 background-gradient drop-shadow-[0_0px_5px_rgba(236,160,52,0.25)]">
      <p className="pb-1 font-semibold">Probability</p>
      <p className="pb-2 text-fuel-yellow ">{confidence}%</p>
      <p className="pb-1 font-semibold">Max Priority Fee</p>
      <p className="pb-2 text-fuel-yellow ">{maxPriorityFeePerGas}</p>
      <p className="pb-1 font-semibold">Max Fee</p>
      <p className=" text-fuel-yellow ">{maxFeePerGas}</p>
    </div>
  ) : (
    <div className="flex flex-col text-center border-4 border-red-600 rounded-xl p-3 sm:p-6 background-gradient drop-shadow-[0_0px_5px_rgba(220,38,38,0.25)]">
      <p className="pb-1 font-semibold">Probability</p>
      <p className="pb-2 text-red-600">{confidence}%</p>
      <p className="pb-1 font-semibold">Max Priority Fee</p>
      <p className="pb-2 text-red-600">{maxPriorityFeePerGas}</p>
      <p className="pb-1 font-semibold">Max Fee</p>
      <p className=" text-red-600">{maxFeePerGas}</p>
    </div>
  );
}
