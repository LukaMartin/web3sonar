export default function BreakoutStrategySkeleton() {
  return (
    <section className="flex flex-col">
      <div className="h-7 w-40 mb-4 bg-white/20 border-[1px] border-white/20 rounded-md animate-pulseStrong" />
      <div className="relative flex flex-col items-center w-[24rem] h-[16rem] bg-white/10 border-[1px] border-white/20 rounded-md animate-pulseStrong">
        <div className="absolute top-4 left-4 h-12 w-[4.5rem] bg-white/20 border-[1px] border-white/20 rounded-md animate-pulseStrong" />
        <div className="h-[12rem] w-[12rem] mt-6 bg-white/20 border-[1px] border-white/20 rounded-full animate-pulseStrong" />
      </div>
    </section>
  );
}
