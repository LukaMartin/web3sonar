import { useFormStatus } from "react-dom"

export default function FormSubmitButton() {
  const { pending } = useFormStatus();
  const buttonStyles = "font-semibold text-lg text-gray-950 mt-2 rounded-md p-2 transition hover:scale-[1.01] active:scale-95"

  return (
    <button
        type="submit"
        className={pending ? `${buttonStyles} bg-white/20` : `${buttonStyles} bg-accent hover:bg-accent/75`}
      >
        {
            pending ? "Simulating Transaction..." : "Submit"
        }
    </button>
  )
}
