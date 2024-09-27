import { TokenExchangeResultData } from "./tokenExchangeResultData";

export type TokenExchangeResult = {
  message?: string;
  fromAddress: string;
  lifiExplorerLink: string;
  bridgeExplorerLink?: string;
  sending: TokenExchangeResultData;
  receiving: TokenExchangeResultData;
  tool: string;
  status: string;
  substatus: string;
  substatusMessage: string;
  toAddress: string;
  transactionId: string;
};
