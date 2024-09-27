import ethLogo from "../../public/eth-logo.svg";
import usdcLogo from "../../public/usd-coin-usdc-logo.svg";
import usdtLogo from "../../public/tether-usdt-logo.svg";
import solLogo from "../../public/solana-logo.svg";
import { wethAddresses } from "@/constants/wethAddresses";
import { usdcAddresses } from "@/constants/usdcAddresses";
import { usdtAddresses } from "@/constants/usdtAddresses";

export const getTokenLogo = (token: string) => {
  if (token === "ETH" || wethAddresses.includes(token)) {
    return ethLogo;
  } else if (usdcAddresses.includes(token)) {
    return usdcLogo;
  } else if (usdtAddresses.includes(token)) {
    return usdtLogo;
  } else if (token === "SOL") {
    return solLogo;
  }
};
