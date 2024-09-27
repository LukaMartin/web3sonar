type BlockDataItemProps = {
  name: string;
  value: string | number;
};

export default function BlockDataItem({ name, value }: BlockDataItemProps) {
  return (
    <div className="text-left bg-white/[3%] shadow-[0_7px_5px_rgba(2,2,2,1)] rounded-md w-[48%] lg:w-[23.5%] my-2 sm:my-0 py-2 px-[0.4rem] md:px-3">
      <p className="text-white/80 pl-1 md:text-lg">{name}</p>
      <p className="text-green-yellow pl-1 text-2xl md:text-3xl">{value}</p>
    </div>
  );
}
