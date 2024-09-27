import { chains } from "@/constants/chains";

export const getChainName = (chainId: number | undefined) => {
  if (!chainId) return;
  const chain = chains.find((chain) => chain.id === chainId);
  return chain?.name;
};
