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
  setSimulationResult ({}: SimulatedTransactionResult) : void;
};

export type SimulatedTransactionResult = {
  simulatedBlockNumber: string;
  gasUsed: string;
  simulationStatus: string;
  transactionResult: string;
  failureMessage: string;
};

export type TransactionSimulationResultProps = {
  simulationResult: SimulatedTransactionResult;
}
