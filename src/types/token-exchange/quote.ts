type Token = {
  address: string;
  chainId: number;
  coinKey: string;
  deciamls: number;
  logoURI: string;
  name: string;
  priceUSD: string;
  symbol: string;
};

export type FeeCosts = {
  amount: string;
  amountUSD: string;
  description: string;
  included: boolean;
  name: string;
  percentage: string;
};

type GasCosts = {
  amount: string;
  amountUSD: string;
  estimate: string;
  limit: string;
  price: string;
  token: Token;
  type: string;
};

type ToolDetails = {
  key: string;
  logoURI: string;
  name: string;
};

type Action = {
  destinationGasConsumption?: string;
  fromAddress: string;
  fromAmount: string;
  fromChainId: number;
  fromToken: Token;
  slippage: number;
  toAddress: string;
  toChainId: number;
  toToken: Token;
};

type Estimate = {
  approvalAddress: string;
  executionDuration: number;
  feeCosts: FeeCosts[];
  fromAmount: string;
  fromAmountUSD: string;
  gasCosts: GasCosts[];
  toAmount: string;
  toAmountMin: string;
  toAmountUSD: string;
  tool: string;
};

type IncludedSteps = {
  action: Action;
  estimate: Estimate;
  id: string;
  tool: string;
  toolDetails: ToolDetails;
  type: string;
};

type TransactionRequest = {
  chainId: number;
  data: string;
  from: string;
  gasLimt: string;
  gasPrice: string;
  to: string;
  value: string;
};

export type Quote = {
  action: Action;
  estimate: Estimate;
  id: string;
  includedSteps: IncludedSteps[];
  integrator: string;
  tool: string;
  toolDetails: ToolDetails;
  transactionRequest: TransactionRequest;
  type: string;
  message?: string;
};
