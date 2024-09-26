export default function FearAndGreedSkeleton() {
  return (
    <section className="flex flex-col">
      <div className="h-7 w-48 bg-white/20 border-[1px] border-white/20 rounded-md mb-4 animate-pulseStrong" />
      <div className="flex flex-col items-center w-[24rem] h-[15rem] bg-white/10 border-[1px] border-white/20 rounded-md animate-pulseStrong">
        <div className="h-[8.5rem] w-[17rem] mt-7 bg-white/20 border-[1px] border-white/20 rounded-t-[150px] rounded-b-xl animate-pulseStrong" />
        <div className="h-6 w-12 mt-6 bg-white/20 border-[1px] border-white/20 rounded-md animate-pulseStrong" />
      </div>
    </section>
  );
}
