import { chains } from "@/constants/chains";

export function findChainId(chainName: string) {
  let chainId: number[] = [];

  chains.map((chain) => {
    const { name, id } = chain;

    if (name == chainName) {
      chainId.push(id);
    }
  });

  return chainId;
}
