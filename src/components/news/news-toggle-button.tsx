import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type NewsToggleButtonProps = {
  children: string;
  toggleView: string;
  setToggleView: (pathname: string) => void;
  path: string;
};

export default function NewsToggleButton({
  children,
  toggleView,
  setToggleView,
  path,
}: NewsToggleButtonProps) {
  const buttonStyles = "text-white/65 hover:text-white";

  return (
    <div className="relative">
      <button
        className={cn(`${buttonStyles}`, {
          "text-white pb-4": toggleView === path,
        })}
        onClick={() => setToggleView(path)}
      >
        {children}
      </button>
      {toggleView === path && (
        <motion.div
          layoutId="news-active-link"
          className="bg-green-yellow h-[0.175rem] w-full absolute bottom-0 rounded-md"
        ></motion.div>
      )}
    </div>
  );
}
