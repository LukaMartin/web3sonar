"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import BlockDataItem from "./block-data-item";
import LoadingContainer from "./loading-container";
import { EstimatedPrice } from "../../types/gas-dashboard/estimatedPrice";

type BlockDataContainerProps = {
  baseFee: number;
  maxFee: number;
  pendingBlockNumber: number;
  pendingTransactionCount: number;
  estimatedPrices: EstimatedPrice[];
};

export default function BlockDataContainer({
  baseFee,
  maxFee,
  pendingBlockNumber,
  pendingTransactionCount,
}: BlockDataContainerProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const blockData = [
    {
      name: "Base Gas Fee",
      value: `${baseFee}`,
    },
    {
      name: "Max Pending Fee",
      value: `${maxFee}`,
    },
    {
      name: "Pending Block",
      value: pendingBlockNumber,
    },
    {
      name: "Pending Block Txs",
      value: pendingTransactionCount,
    },
  ];

  useEffect(() => {
    setInterval(() => {
      router.refresh();
      setLoading(false);
      setTimeout(() => {
        setLoading(true);
      }, 1000);
    }, 10000);
  }, [router]);

  return (
    <>
      <section
        id="gas-dashboard"
        className="flex justify-center gap-3 md:gap-6 lg:gap-0 lg:justify-between flex-wrap"
      >
        {blockData.map((data) => {
          return (
            <BlockDataItem
              key={data.name}
              name={data.name}
              value={data.value}
            />
          );
        })}
      </section>

      <LoadingContainer loading={loading} />
    </>
  );
}
