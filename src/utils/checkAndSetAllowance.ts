import { Contract, ContractRunner, JsonRpcSigner } from "ethers";
import { erc20Abi, parseEther, parseUnits } from "viem";
import { wethAddresses } from "@/constants/wethAddresses";

type CheckAndSetAllowanceParams = {
  wallet: ContractRunner | JsonRpcSigner;
  tokenAddress: string;
  approvalAddress: string;
  amount: number;
  fromToken: string;
};

export const checkAndSetAllowance = async ({
  wallet,
  tokenAddress,
  approvalAddress,
  amount,
  fromToken,
}: CheckAndSetAllowanceParams) => {
  if (fromToken === "ETH") {
    return;
  }

  const erc20 = new Contract(tokenAddress, erc20Abi, wallet);

  if (wethAddresses.includes(fromToken)) {
    const approveTx = await erc20.approve(
      approvalAddress,
      parseEther(amount.toString())
    );
    await approveTx.wait();
  } else {
    const approveTx = await erc20.approve(
      approvalAddress,
      parseUnits(amount.toString(), 6)
    );
    await approveTx.wait();
  }
};
