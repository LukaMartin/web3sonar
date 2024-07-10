import { Spinner } from "@nextui-org/react";

export default function TokenExchangeQuoteSkeleton() {
  return (
    <>
      <section className="w-[375px] h-[200px] flex flex-col justify-between items-center py-4 mx-auto bg-white/10 border-[1px] border-white/20 rounded-md animate-slideIn">
        <div className="flex gap-x-20 animate-pulse">
          <div className="flex">
            <div className="w-16 h-16 rounded-full bg-white/20" />

            <div className="pl-5 pt-3">
              <div className="h-7 w-20 bg-white/20 rounded-sm mb-2" />
              <div className="h-3 w-16 bg-white/20 rounded-sm" />
            </div>
          </div>

          <div className="w-12 h-12 rounded-full bg-white/20 mt-4 ml-6"/>
        </div>

        <div className="flex gap-x-5 animate-pulse">
          <div className="flex">
            <div className="w-16 h-16 rounded-full bg-white/20 pb-1" />

            <div className="pl-5 pt-3">
              <div className="h-6 w-16 bg-white/20 rounded-sm mb-2" />
              <div className="h-3 w-12 bg-white/20 rounded-sm" />
            </div>
          </div>

          <div className="pt-4">
            <div className="h-5 w-12 ml-4 bg-white/20 rounded-sm mb-2" />
            <div className="h-3 w-8 ml-4 bg-white/20 rounded-sm" />
          </div>

          <div className="pt-4">
            <div className="h-5 w-12 ml-4 bg-white/20 rounded-sm mb-2" />
            <div className="h-3 w-8 ml-4 bg-white/20 rounded-sm" />
          </div>
        </div>
      </section>

      <div className="flex gap-x-6 w-[375px] mx-auto mb-6">
        <h3 className="text-2xl mt-4 ml-1 animate-pulse">Fetching quote..</h3>
        <Spinner color="default" className="pt-5" />
      </div>
    </>
  );
}
