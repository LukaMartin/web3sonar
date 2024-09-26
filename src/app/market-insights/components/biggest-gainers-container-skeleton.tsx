import BiggestGainersSkeletonCard from "./biggest-gainers-skeleton-card";

export default function BiggestGainersContainerSkeleton() {
  return (
    <section className="w-7xl flex flex-col mt-20">
      <div className="h-7 w-60 mb-4 bg-white/20 border-[1px] border-white/20 rounded-md animate-pulseStrong" />

      <div className="flex justify-between">
        <BiggestGainersSkeletonCard />
        <BiggestGainersSkeletonCard />
        <BiggestGainersSkeletonCard />
      </div>
    </section>
  );
}
