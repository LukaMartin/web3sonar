import ethLogo from "../../public/eth-logo.svg";
import arbLogo from "../../public/arbitrum-arb-logo.svg";
import optLogo from "../../public/optimism-ethereum-op-logo.svg";
import polLogo from "../../public/polygon-matic-logo.svg";
import bstLogo from "../../public/blast-bls-logo.svg";
import baseLogo from "../../public/base-logo.svg";
import zkLogo from "../../public/zksync-logo.svg";
import usdcLogo from "../../public/usd-coin-usdc-logo.svg";
import usdtLogo from "../../public/tether-usdt-logo.svg"
import usdbLogo from "../../public/usdb-icon.svg"

export const chains = [
  {
    name: "ARB",
    id: 42161,
    logo: arbLogo,
    tokens: [
      {
        name: "Ethereum",
        symbol: "ETH",
        logo: ethLogo,
        tokenAddress: "ETH",
      },
      {
        name: "Wrapped Ethereum",
        symbol: "WETH",
        logo: ethLogo,
        tokenAddress: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
      },
      {
        name: "USDC",
        symbol: "USDC",
        logo: usdcLogo,
        tokenAddress: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831"
      },
      {
        name: "Bridged USDC",
        symbol: "USDC.e",
        logo: usdcLogo,
        tokenAddress: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
      },
      {
        name: "Tether USD",
        symbol: "USDT",
        logo: usdtLogo,
        tokenAddress: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
      }
    ]
  },
  {
    name: "BAS",
    id: 8453,
    logo: baseLogo,
    tokens: [
      {
        name: "Ethereum",
        symbol: "ETH",
        logo: ethLogo,
        tokenAddress: "ETH",
      },
      {
        name: "Wrapped Ethereum",
        symbol: "WETH",
        logo: ethLogo,
        tokenAddress: "0x4200000000000000000000000000000000000006",
      },
      {
        name: "USDC",
        symbol: "USDC",
        logo: usdcLogo,
        tokenAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
      },
      {
        name: "USD Base Coin ",
        symbol: "USDbC",
        logo: usdcLogo,
        tokenAddress: "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA",
      },
    ],
  },
  {
    name: "BLS",
    id: 81457,
    logo: bstLogo,
    tokens: [
      {
        name: "Ethereum",
        symbol: "ETH",
        logo: ethLogo,
        tokenAddress: "ETH",
      },
      {
        name: "Wrapped Ethereum",
        symbol: "WETH",
        logo: ethLogo,
        tokenAddress: "0x4300000000000000000000000000000000000004",
      },
    ],
  },
  {
    name: "ETH",
    id: 1,
    logo: ethLogo,
    tokens: [
      {
        name: "Ethereum",
        symbol: "ETH",
        logo: ethLogo,
        tokenAddress: "ETH",
      },
      {
        name: "Wrapped Ethereum",
        symbol: "WETH",
        logo: ethLogo,
        tokenAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      },
      {
        name: "USDC",
        symbol: "USDC",
        logo: usdcLogo,
        tokenAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      },
      {
        name: "Tether USD",
        symbol: "USDT",
        logo: usdtLogo,
        tokenAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      }
    ],
  },
  {
    name: "ERA",
    id: 324,
    logo: zkLogo,
    tokens: [
      {
        name: "Ethereum",
        symbol: "ETH",
        logo: ethLogo,
        tokenAddress: "ETH",
      },
      {
        name: "Wrapped Ethereum",
        symbol: "WETH",
        logo: ethLogo,
        tokenAddress: "0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91",
      },
      {
        name: "USDC",
        symbol: "USDC",
        logo: usdcLogo,
        tokenAddress: "0x1d17CBcF0D6D143135aE902365D2E5e2A16538D4",
      },
      {
        name: "Tether USD",
        symbol: "USDT",
        logo: usdtLogo,
        tokenAddress: "0x493257fD37EDB34451f62EDf8D2a0C418852bA4C",
      }
    ],
  },
  {
      name: "POL",
      id: 137,
      logo: polLogo,
      tokens: [
        {
          name: "Wrapped Ethereum",
          symbol: "WETH",
          logo: ethLogo,
          tokenAddress: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
        },
        {
          name: "USDC.e",
          symbol: "USDC.e",
          logo: usdcLogo,
          tokenAddress: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
        },
        {
          name: "Tether USD",
          symbol: "USDT",
          logo: usdtLogo,
          tokenAddress: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
        }
      ],
  },
  {
    name: "OPT",
    id: 10,
    logo: optLogo,
    tokens: [
      {
        name: "Ethereum",
        symbol: "ETH",
        logo: ethLogo,
        tokenAddress: "ETH",
      },
      {
        name: "Wrapped Ethereum",
        symbol: "WETH",
        logo: ethLogo,
        tokenAddress: "0x4200000000000000000000000000000000000006",
      },
      {
        name: "USDC",
        symbol: "USDC",
        logo: usdcLogo,
        tokenAddress: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
      },
      {
        name: "Bridged USDC",
        symbol: "USDC.e",
        logo: usdcLogo,
        tokenAddress: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
      },
      {
        name: "Tether USD",
        symbol: "USDT",
        logo: usdtLogo,
        tokenAddress: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
      }
    ],
  },
];

export const wethAddresses = [
  "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
  "0x4200000000000000000000000000000000000006",
  "0x4300000000000000000000000000000000000004",
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91",
  "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
  "0x4200000000000000000000000000000000000006"
];

export const usdcAddresses = [
  "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
  "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
  "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA",
  "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  "0x1d17CBcF0D6D143135aE902365D2E5e2A16538D4",
  "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
  "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
  "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
]

export const usdtAddresses = [
  "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
  "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  "0x493257fD37EDB34451f62EDf8D2a0C418852bA4C",
  "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
  "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
]
