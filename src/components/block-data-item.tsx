import { BlockDataItemProps } from "@/lib/types";

export default function BlockDataItem({ name, value }: BlockDataItemProps) {
  return (
    <div className="xs:text-lg text-left bg-white/[2%] border-[1px] border-white/20 shadow-[0_5px_5px_rgba(2,2,2,1)] rounded-lg w-[48%] lg:w-[23.5%] my-2 sm:my-0 py-2 px-[0.4rem] md:px-3">
      <p className="text-white/80 pl-1">{name}</p>
      <p className="text-accent pl-1">{value}</p>
    </div>
  );
}
