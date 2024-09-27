import LoadingBar from "./loading-bar";

type LoadingContainerProps = {
  loading: boolean;
};

export default function LoadingContainer({ loading }: LoadingContainerProps) {
  return (
    <section className="mt-20 sm:mt-[7.5rem] grid grid-cols-4 grid-rows-1">
      <p
        className={
          loading
            ? "animate-pulseStrong text-center sm:text-left text-2xl pb-8 pl-2 md:pl-3 col-start-1 col-span-4 md:col-start-2 md:col-span-1"
            : "animate-none text-center sm:text-left text-2xl pb-8 pl-2 md:pl-3 col-start-1 col-span-4 md:col-start-2 md:col-span-1"
        }
      >
        Next Update...
      </p>

      <p className="text-white/50 justify-self-end mr-4 pt-1 hidden md-lg:block">
        Powered by{" "}
        <a
          href="https://www.blocknative.com/"
          target="_blank"
          className="text-green-yellow hover:text-green-yellow/60"
        >
          Blocknative
        </a>
      </p>

      {loading ? (
        <LoadingBar />
      ) : (
        <div className="w-[96%] h-[20px] bg-green-yellow rounded-sm animate-slideIn col-start-1 col-span-4 md:col-start-2 md:col-span-2 ml-3"></div>
      )}

      <p className="text-white/50 text-center sm:pl-2 col-start-1 col-span-4 pt-10 sm:hidden">
        Powered by{" "}
        <a
          href="https://www.blocknative.com/"
          target="_blank"
          className="text-green-yellow hover:text-green-yellow/75"
        >
          Blocknative
        </a>
      </p>
    </section>
  );
}
