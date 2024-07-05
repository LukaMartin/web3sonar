import ethLogo from "../../public/eth-logo.svg";
import arbLogo from "../../public/arbitrum-arb-logo.svg";
import ftmLogo from "../../public/fantom-ftm-logo.svg";
import optLogo from "../../public/optimism-ethereum-op-logo.svg";
import polLogo from "../../public/polygon-matic-logo.svg";
import bstLogo from "../../public/blast-bls-logo.svg";
import baseLogo from "../../public/base-logo.svg";
import zkLogo from "../../public/zksync-logo.svg";
import usdcLogo from "../../public/usd-coin-usdc-logo.svg";

export const chains = [
  {
    name: "ARB",
    id: 42161,
    logo: arbLogo,
    usdcAddress: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
  },
  {
    name: "BAS",
    id: 8453,
    logo: baseLogo,
    usdcAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  },
  {
    name: "BLS",
    id: 81457,
    logo: bstLogo,
  },
  {
    name: "ETH",
    id: 1,
    logo: ethLogo,
    usdcAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  },
  {
    name: "ERA",
    id: 324,
    logo: zkLogo,
    usdcAddress: "0x1d17CBcF0D6D143135aE902365D2E5e2A16538D4",
  },
  // {
  //     name: "FTM",
  //     id: 250,
  //     logo: ftmLogo,
  //     usdcAddress: "0x04068DA6C83AFCFA0e13ba15A6696662335D5B750,"
  // },
  // {
  //     name: "POL",
  //     id: 137,
  //     logo: polLogo,
  //     usdcAddress: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
  // },
  {
    name: "OPT",
    id: 10,
    logo: optLogo,
    usdcAddress: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
  },
];

export const tokens = [
  {
    name: "ETH",
    logo: ethLogo,
  },
  // {
  //     name: "USDC",
  //     logo: usdcLogo,
  // }
];
