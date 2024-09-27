"use client";

import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

type NewsToggleButtonProps = {
  children: string;
  path: string;
  sortBy: string;
};

export default function NewsToggleButton({
  children,
  path,
  sortBy,
}: NewsToggleButtonProps) {
  const buttonStyles = "text-white/65 hover:text-white";
  const router = useRouter();

  return (
    <div className="relative">
      <button
        className={cn(`${buttonStyles}`, {
          "text-white pb-4": sortBy === path,
        })}
        onClick={() => router.push(`/news?sortBy=${path}`)}
      >
        {children}
      </button>
      {sortBy === path && (
        <motion.div
          layoutId="news-active-link"
          className="bg-green-yellow h-[0.175rem] w-full absolute bottom-0 rounded-md"
        ></motion.div>
      )}
    </div>
  );
}
