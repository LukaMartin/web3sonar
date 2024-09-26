import { EstimatedPriceItemProps } from "@/lib/types";

export default function EstimatedPriceItem({
  confidence,
  maxPriorityFeePerGas,
  maxFeePerGas,
}: EstimatedPriceItemProps) {
  let textColor = "";
  {
    confidence > 95
      ? (textColor = "text-green-600")
      : confidence > 90
      ? (textColor = "text-green-yellow")
      : confidence > 80
      ? (textColor = "text-gold")
      : confidence > 70
      ? (textColor = "text-fuel-yellow")
      : (textColor = "text-red-600");
  }

  return (
    <div className="flex flex-col text-center rounded-md p-3 sm:p-6 bg-white/[3%] shadow-[0_7px_5px_rgba(2,2,2,1)]">
      <p className="pb-1 text-white/80">Probability</p>
      <p className={`pb-2 ${textColor} font-semibold`}>{confidence}%</p>
      <p className="pb-1 text-white/80">Max Priority Fee</p>
      <p className={`pb-2 ${textColor} font-semibold`}>
        {maxPriorityFeePerGas}
      </p>
      <p className="pb-1 text-white/80">Max Fee</p>
      <p className={`pb-2 ${textColor} font-semibold`}>{maxFeePerGas}</p>
    </div>
  );
}
