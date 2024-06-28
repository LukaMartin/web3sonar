import { EstimatedPriceItemProps } from "@/lib/types";

export default function EstimatedPriceItem({
  confidence,
  maxPriorityFeePerGas,
  maxFeePerGas,
}: EstimatedPriceItemProps) {
  return confidence > 95 ? (
    <div className="flex flex-col text-center border-[1px] border-white/20 rounded-xl p-3 sm:p-6 bg-white/[2%] shadow-[0_6px_5px_rgba(2,2,2,1)]">
      <p className="pb-1 font-semibold">Probability</p>
      <p className="pb-2 text-green-600">{confidence}%</p>
      <p className="pb-1 font-semibold">Max Priority Fee</p>
      <p className="pb-2 text-green-600">{maxPriorityFeePerGas}</p>
      <p className="pb-1 font-semibold">Max Fee</p>
      <p className=" text-green-600">{maxFeePerGas}</p>
    </div>
  ) : confidence > 90 ? (
    <div className="flex flex-col text-center border-[1px] border-white/20 rounded-xl p-3 sm:p-6 bg-white/[2%] shadow-[0_6px_5px_rgba(2,2,2,1)]">
      <p className="pb-1 font-semibold">Probability</p>
      <p className="pb-2 text-accent">{confidence}%</p>
      <p className="pb-1 font-semibold">Max Priority Fee</p>
      <p className="pb-2 text-accent">{maxPriorityFeePerGas}</p>
      <p className="pb-1 font-semibold">Max Fee</p>
      <p className=" text-accent">{maxFeePerGas}</p>
    </div>
  ) : confidence > 80 ? (
    <div className="flex flex-col text-center border-[1px] border-white/20 rounded-xl p-3 sm:p-6 bg-white/[2%] shadow-[0_6px_5px_rgba(2,2,2,1)]">
      <p className="pb-1 font-semibold">Probability</p>
      <p className="pb-2 text-gold">{confidence}%</p>
      <p className="pb-1 font-semibold">Max Priority Fee</p>
      <p className="pb-2 text-gold">{maxPriorityFeePerGas}</p>
      <p className="pb-1 font-semibold">Max Fee</p>
      <p className=" text-gold">{maxFeePerGas}</p>
    </div>
  ) : confidence > 70 ? (
    <div className="flex flex-col text-center border-[1px] border-white/20 rounded-xl p-3 sm:p-6 bg-white/[2%] shadow-[0_6px_5px_rgba(2,2,2,1)]">
      <p className="pb-1 font-semibold">Probability</p>
      <p className="pb-2 text-fuel-yellow ">{confidence}%</p>
      <p className="pb-1 font-semibold">Max Priority Fee</p>
      <p className="pb-2 text-fuel-yellow ">{maxPriorityFeePerGas}</p>
      <p className="pb-1 font-semibold">Max Fee</p>
      <p className=" text-fuel-yellow ">{maxFeePerGas}</p>
    </div>
  ) : (
    <div className="flex flex-col text-center border-[1px] border-white/20 rounded-xl p-3 sm:p-6 bg-white/[2%] shadow-[0_6px_5px_rgba(2,2,2,1)]">
      <p className="pb-1 font-semibold">Probability</p>
      <p className="pb-2 text-red-600">{confidence}%</p>
      <p className="pb-1 font-semibold">Max Priority Fee</p>
      <p className="pb-2 text-red-600">{maxPriorityFeePerGas}</p>
      <p className="pb-1 font-semibold">Max Fee</p>
      <p className=" text-red-600">{maxFeePerGas}</p>
    </div>
  );
}
