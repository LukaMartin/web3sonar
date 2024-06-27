import { TransactionSimulationResultProps } from "@/lib/types";
import { capatalize } from "@/lib/utils";


export default function TransactionSimulationResult({ simulationResult }: TransactionSimulationResultProps) {
  return (
    <div>
      <h3 className="text-2xl font-semibold pb-[2.2rem]">Simulation Result</h3>

      <div className="border-2 border-white/20 rounded-xl p-6 shadow-[0_0px_8px_rgba(164,248,57,0.35)] min-w-96 max-w-[40rem]">
        <h5 className="text-lg font-semibold pb-1">Simulation Status</h5>
        {simulationResult.simulationStatus === "Completed" ? (
          <p className="pb-6 text-accent text-lg">
            {simulationResult.simulationStatus}
          </p>
        ) : (
          <p className="pb-6 text-red-600 text-lg">
            {simulationResult.simulationStatus}
          </p>
        )}

        <h5 className="text-lg font-semibold pb-1">Simulation Block Number</h5>
        <p className="pb-6 text-gold">
          {simulationResult.simulatedBlockNumber}
        </p>

        <h5 className="text-lg font-semibold pb-1">Gas Used</h5>
        <p className="pb-6 text-gold">{simulationResult.gasUsed}</p>

        <h5 className="text-lg font-semibold pb-1">Result</h5>
        {simulationResult.transactionResult === undefined &&
        !simulationResult.failureMessage ? (
          <p className="pb-2 text-accent text-lg">Transaction Successful!</p>
        ) : simulationResult.transactionResult !== undefined &&
          !simulationResult.failureMessage ? (
          <p className="pb-2 text-red-600 text-lg">
            {capatalize(simulationResult.transactionResult)}
          </p>
        ) : (
          <p className="pb-2 text-red-600 text-lg">
            {simulationResult.failureMessage}
          </p>
        )}
      </div>
    </div>
  );
}
