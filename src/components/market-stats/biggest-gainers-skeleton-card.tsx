import BiggestGainersTokenSkeleton from "./biggest-gainers-token-skeleton";

export default function BiggestGainersSkeletonCard() {
  return (
    <div className="w-[31.5%] h-[36rem] bg-white/10 border-[1px] border-white/20 rounded-md p-6 animate-pulseStrong">
      <div className="flex justify-between">
        <div className="h-6 w-6 rounded-md bg-white/20" />
        <div className="h-6 w-12 rounded-md bg-white/20" />
        <div className="h-6 w-[7.75rem] rounded-md bg-white/20" />
        <div className="h-6 w-10 rounded-md bg-white/20" />
      </div>

      <BiggestGainersTokenSkeleton />
      <BiggestGainersTokenSkeleton />
      <BiggestGainersTokenSkeleton />
      <BiggestGainersTokenSkeleton />
      <BiggestGainersTokenSkeleton />
      <BiggestGainersTokenSkeleton />
      <BiggestGainersTokenSkeleton />
      <BiggestGainersTokenSkeleton />
      <BiggestGainersTokenSkeleton />
    </div>
  );
}
