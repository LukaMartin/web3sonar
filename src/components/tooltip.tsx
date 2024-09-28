import { FiInfo } from "react-icons/fi";
import { FaLink } from "react-icons/fa";

type TooltipProps = {
  content: string;
  size: number;
  isLink?: boolean;
};

export default function Tooltip({
  content,
  size,
  isLink = false,
}: TooltipProps) {
  return (
    <div className="relative group">
      {isLink ? (
        <FaLink size={size} className="text-white/75 mt-1" />
      ) : (
        <FiInfo size={size} className="text-white/75 mt-1" />
      )}
      <div className="absolute z-10 opacity-0 group-hover:opacity-100 invisible group-hover:visible w-max max-w-80 text-gray-950 font-semibold bg-gradient-to-br from-white to-neutral-400 shadow-xl text-sm rounded py-2 px-4 bottom-full left-1/2 transform -translate-x-1/2 mb-2 transition-all duration-700 ease-in-out">
        {content}
      </div>
    </div>
  );
}
