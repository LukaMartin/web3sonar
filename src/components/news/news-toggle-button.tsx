import { cn } from "@/lib/utils";

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
  const buttonStyles =
    "text-white/75 mb-6 bg-white/[3%] border-white/20 border-[1px] rounded-md px-4 py-2 hover:bg-white/[6%] hover:text-white active:scale-[0.97]";

  return (
    <button
      className={cn(`${buttonStyles}`, {
        "text-white bg-white/[10%]": toggleView === path,
      })}
      onClick={() => setToggleView(path)}
    >
      {children}
    </button>
  );
}
