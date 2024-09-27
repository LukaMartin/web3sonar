import { chains } from "@/constants/chains";

export const getChainLogo = (chainIdentifier: number | string | undefined) => {
  if (!chainIdentifier) return;
  const chain = chains.find((chain) =>
    typeof chainIdentifier === "number"
      ? chain.id === chainIdentifier
      : chain.name === chainIdentifier
  );
  return chain?.logo;
};
