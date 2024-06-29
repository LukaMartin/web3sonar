"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import BlockDataItem from "./block-data-item";
import { BlockDataContainerProps } from "@/lib/types";
import LoadingSection from "./loading-container";

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
      name: "Base Fee",
      value: `${baseFee} Gwei`,
    },
    {
      name: "Max Pending Fee",
      value: `${maxFee} Gwei`,
    },
    {
      name: "Pending Block",
      value: pendingBlockNumber,
    },
    {
      name: "Txs Pending in Block",
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

      <LoadingSection loading={loading} />
    </>
  );
}
