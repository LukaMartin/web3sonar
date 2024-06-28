import { LoadingContainerProps } from "@/lib/types";
import LoadingBar from "./loading-bar";

export default function LoadingContainer({ loading }: LoadingContainerProps) {
  return (
    <section className="mt-20 sm:mt-[7.5rem] grid grid-cols-4 grid-rows-1">
      <p
        className={
          loading
            ? "animate-pulseStrong text-center sm:text-left text-2xl pb-8 pl-2 md:pl-3 col-start-1 col-span-4 md:col-start-2 md:col-span-2"
            : "animate-none text-center sm:text-left text-2xl pb-8 pl-2 md:pl-3 col-start-1 col-span-4 md:col-start-2 md:col-span-2"
        }
      >
        Next Update...
      </p>
      {loading ? (
        <LoadingBar />
      ) : (
        <div className="w-[96%] h-[20px] bg-accent rounded-sm animate-slideIn col-start-1 col-span-4 md:col-start-2 md:col-span-2 ml-3"></div>
      )}
    </section>
  );
}
