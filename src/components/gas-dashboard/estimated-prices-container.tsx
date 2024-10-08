import { EstimatedPrice } from "../../types/gas-dashboard/estimatedPrice";
import EstimatedPriceItem from "./estimated-price-item";

type EstimatedPricesContainerProps = {
  estimatedPrices: EstimatedPrice[];
};

export default function EstimatedPricesContainer({
  estimatedPrices,
}: EstimatedPricesContainerProps) {
  return (
    <>
      <section className="mt-20 sm:mt-[7.5rem] flex flex-wrap justify-center lg:justify-between gap-6 lg:gap-0 xl:text-lg">
        {estimatedPrices.map((item) => {
          return (
            <EstimatedPriceItem
              key={item.confidence}
              confidence={item.confidence}
              maxPriorityFeePerGas={item.maxPriorityFeePerGas}
              maxFeePerGas={item.maxFeePerGas}
            />
          );
        })}
      </section>
    </>
  );
}
