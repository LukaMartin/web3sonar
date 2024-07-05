export type TokenExchangeResultData = {
  amountUSD: string;
  chainId: number;
  txHash: string;
  txLink: string;
  amount: string;
  token: string;
  gasAmount: string;
  gasAmountUSD: string;
  gasPrice: string;
  gasUsed: string;
  timestamp: number;
  value: string;
};

export type TokenExchangeResult = {
  message?: string;  
  fromAddress: string;
  lifiExplorerLink: string;
  sending: TokenExchangeResultData;
  receiving: TokenExchangeResultData;
  tool: string;
  status: string;
  substatus: string;
  substatusMessage: string;
  toAddress: string;
  transactionId: string;
};
