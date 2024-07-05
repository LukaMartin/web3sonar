import { submitTransaction } from "@/lib/server-utils";
import { TransactionSimultionFormProps } from "@/lib/types";
import FormSubmitButton from "./form-submit-button";

export default function TransactionSimulationForm({
  setSimulationResult,
}: TransactionSimultionFormProps) {
  const inputStyles =
    "bg-[#111620] border-white/20 rounded-md py-2 pl-2 mb-3 outline-none focus:ring-2 ring-accent shadow-[0_1px_1px_rgba(2,2,2,1)]";

  const labelStyles = "text-white/80 text-lg mb-2";

  return (
    <form
      action={async (formData) => {
        const result = await submitTransaction(formData);
        setSimulationResult(result);
      }}
      className="flex flex-col bg-white/[2%] border-[1px] border-white/20 rounded-md p-6 w-[30rem] shadow-[0_7px_5px_rgba(2,2,2,1)]"
    >
      <label htmlFor="contract-address" className={labelStyles}>
        Receiver Address
      </label>
      <input
        id="contract-address"
        name="contract-address"
        type="text"
        className={inputStyles}
        pattern="^(0x)[0-9a-fA-F]{40}$"
        title="Enter a valid Ethereum address."
        placeholder="0x00..."
        autoComplete="off"
        required
      />
      <label htmlFor="sender-address" className={labelStyles}>
        Sender Address
      </label>
      <input
        id="sender-address"
        name="sender-address"
        type="text"
        className={inputStyles}
        pattern="^(0x)[0-9a-fA-F]{40}$"
        title="Enter a valid Ethereum address."
        placeholder="0x00..."
        autoComplete="off"
        required
      />
      <label htmlFor="gas-limit" className={labelStyles}>
        Gas Limit
      </label>
      <input
        id="gas-limit"
        name="gas-limit"
        type="text"
        className={inputStyles}
        minLength={5}
        maxLength={8}
        pattern="[0-9]+"
        title="Enter a valid 5 - 8 digit number."
        placeholder="Transaction gas limit..."
        autoComplete="off"
        required
      />
      <label htmlFor="max-gas-fee" className={labelStyles}>
        Max Gas Fee
      </label>
      <input
        id="max-gas-fee"
        name="max-gas-fee"
        type="text"
        className={inputStyles}
        maxLength={5}
        pattern="[0-9]+"
        title="Only enter valid numbers."
        placeholder="Desired gas fee in Gwei..."
        autoComplete="off"
        required
      />
      <label htmlFor="max-priority-fee" className={labelStyles}>
        Max Priority Fee
      </label>
      <input
        id="max-priority-fee"
        name="max-priority-fee"
        type="text"
        className={inputStyles}
        maxLength={5}
        pattern="[0-9]+"
        title="Only enter valid numbers."
        placeholder="Desired priority fee in Gwei..."
        autoComplete="off"
        required
      />
      <label htmlFor="transaction-value" className={labelStyles}>
        Transaction Value
      </label>
      <input
        id="transaction-value"
        name="transaction-value"
        type="text"
        className={inputStyles}
        maxLength={10}
        pattern="[0-9.]+"
        title="Only enter valid numbers or decimals."
        placeholder="Transaction value in ETH..."
        autoComplete="off"
        required
      />
      <label htmlFor="transaction-input" className={labelStyles}>
        Transaction Input
      </label>
      <input
        id="transaction-input"
        name="transaction-input"
        type="text"
        className={inputStyles}
        title="Enter a valid transaction input."
        pattern="^(0x)[0-9a-fA-F]{6-500}$"
        placeholder="0x00..."
        autoComplete="off"
        required
      />
      <FormSubmitButton />
      <button
        type="reset"
        className="font-semibold text-lg text-gray-950 mt-2 rounded-md p-2 transition hover:scale-[1.01] active:scale-95 bg-red-600 hover:bg-red-600/75"
      >
        Clear
      </button>
    </form>
  );
}
