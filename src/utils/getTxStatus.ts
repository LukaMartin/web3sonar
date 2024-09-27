type GetTxStatusParams = {
  bridge: string;
  fromChain: string;
  toChain: string;
  txHash: string;
};

export const getTxStatus = async ({
  bridge,
  fromChain,
  toChain,
  txHash,
}: GetTxStatusParams) => {
  const result = await fetch(
    `https://li.quest/v1/status?bridge=${bridge}&fromChain=${fromChain}&toChain=${toChain}&txHash=${txHash}`,
    {
      method: "GET",
    }
  );

  const data = result.json();
  return data;
};
