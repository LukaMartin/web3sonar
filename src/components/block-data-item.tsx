import { BlockDataItemProps } from "@/lib/types";

export default function BlockDataItem({ name, value }: BlockDataItemProps) {
  return (
    <div className="xs:text-lg text-center sm:text-left border-2 border-white/20 rounded-lg w-full sm:w-[48%] lg:w-[23%] py-2 px-[0.4rem] md:px-3 background-gradient drop-shadow-[0_0px_5px_rgba(164,248,57,0.25)]">
      <p className="font-semibold">{name}</p>
      <p className="text-accent">{value}</p>
    </div>
  );
}
