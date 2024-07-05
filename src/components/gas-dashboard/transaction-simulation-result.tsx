import { TransactionSimulationResultProps } from "@/lib/types";
import { capatalize } from "@/lib/utils";

export default function TransactionSimulationResult({
  simulationResult,
}: TransactionSimulationResultProps) {
  const headingStyles = "text-lg pb-1 text-white/80";
  return (
    <div>
      <h3 className="text-2xl font-semibold pb-[2.2rem]">Simulation Result</h3>

      <div className="bg-white/[2%] border-[1px] border-white/20 rounded-md p-6 shadow-[0_7px_5px_rgba(2,2,2,1)] min-w-96 max-w-[40rem]">
        <h5 className={headingStyles}>Simulation Status</h5>
        {simulationResult.simulationStatus === "Completed" ? (
          <p className="pb-6 text-accent text-lg">
            {simulationResult.simulationStatus}
          </p>
        ) : simulationResult.simulationStatus === "-" ? (
          <p className="text-white/80 pb-6">
            {simulationResult.simulationStatus}
          </p>
        ) : (
          <p className="pb-6 text-red-600 text-lg">
            {simulationResult.simulationStatus}
          </p>
        )}

        <h5 className={headingStyles}>Simulation Block Number</h5>
        <p
          className={`${
            simulationResult.simulatedBlockNumber === "-"
              ? "pb-6 text-white/80"
              : "pb-6 text-gold"
          }`}
        >
          {simulationResult.simulatedBlockNumber}
        </p>

        <h5 className={headingStyles}>Gas Used</h5>
        <p
          className={`${
            simulationResult.gasUsed === "-"
              ? "pb-6 text-white/80"
              : "pb-6 text-gold"
          }`}
        >
          {simulationResult.gasUsed}
        </p>

        <h5 className={headingStyles}>Result</h5>
        {!simulationResult.failureMessage &&
        simulationResult.failureMessage !== "-" &&
        !simulationResult.error ? (
          <p className="pb-2 text-accent text-lg">Transaction Successful!</p>
        ) : simulationResult.failureMessage === "-" ? (
          <p className="text-white/80">{simulationResult.failureMessage}</p>
        ) : simulationResult.error ? (
          <p className="pb-2 text-red-600 text-lg">
            {capatalize(simulationResult.error)}
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
