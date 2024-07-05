export type BlockDataContainerProps = {
  baseFee: number;
  maxFee: number;
  pendingBlockNumber: number;
  pendingTransactionCount: number;
  estimatedPrices: EstimatedPrice[];
};

export type BlockDataItemProps = {
  name: string;
  value: string | number;
};

export type EstimatedPricesContainerProps = {
  estimatedPrices: EstimatedPrice[];
};

export type EstimatedPriceItemProps = {
  confidence: number;
  maxPriorityFeePerGas: number;
  maxFeePerGas: number;
};

export type BlockPricesParameter = {
  blockNumber: number;
  estimatedTransactionCount: number;
  baseFeePerGas: number;
  blobBaseFeePerGas: number;
  estimatedPrices: EstimatedPrice[];
};

export type SimulateTransactionParameters = {
  senderAddress: FormDataEntryValue;
  contractAddress: FormDataEntryValue;
  gasLimit: FormDataEntryValue;
  maxFeePerGas: FormDataEntryValue;
  maxPriorityFeePerGas: FormDataEntryValue;
  transactionValue: FormDataEntryValue;
  transactionInput: FormDataEntryValue;
};

export type EstimatedPrice = {
  confidence: number;
  price: number;
  maxPriorityFeePerGas: number;
  maxFeePerGas: number;
};

export type LoadingContainerProps = {
  loading: boolean;
};

export type TransactionSimultionFormProps = {
  setSimulationResult({}: SimulatedTransactionResult): void;
};

export type SimulatedTransactionResult = {
  simulatedBlockNumber: string;
  gasUsed: string;
  simulationStatus: string;
  failureMessage: string;
  error: string;
};

export type TransactionSimulationResultProps = {
  simulationResult: SimulatedTransactionResult;
};

export type FetchQuoteProps = {
  fromChain: string;
  toChain: string;
  fromToken: string;
  toToken: string;
  fromAmount: number;
  fromAddress: string;
};

export type GetStatusParams = {
  bridge: string;
  fromChain: string;
  toChain: string;
  txHash: string;
};

export type PageDirection = "next" | "previous";

export type PaginationButtonsProps = {
  handleChangePage: (direction: PageDirection) => void;
  currentPage: number;
};

export type CryptocurrencyCoinData = {
  symbol: string;
  name: string;
  logo: string;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  market_cap_usd: number;
  market_cap_rank: number;
  market_cap_24hr_change: number;
  market_cap_24hr_percent_change: number;
  total_volume: number;
  usd_price: number;
  usd_price_24hr_high: number;
  usd_price_24hr_low: number;
  usd_price_24hr_change: number;
  usd_price_24hr_percent_change: number;
  usd_price_ath: number;
  ath_percent_change: number;
  ath_date: number;
  usd_price_1hr_percent_change: number;
  usd_price_7d_percent_change: number;
  usd_price_30d_percent_change: number;
};

export type FearAndGreed = {
  value: string;
  value_classification: string;
  timestamp: string;
  time_until_update: string;
};

export type FearAndGreedProps = {
  fearAndGreed: FearAndGreed[];
};

export type TokenMetricsMarketCapData = {
  DATE: string;
  TOTAL_CRYPTO_MCAP: number;
  TM_GRADE_PERC_HIGH_COINS: number;
  TM_GRADE_SIGNAL: number;
  LAST_TM_GRADE_SIGNAL: number;
};

