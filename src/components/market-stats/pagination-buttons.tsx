import { PaginationButtonsProps } from "@/lib/types";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

export default function PaginationButtons({
  handleChangePage,
  currentPage,
}: PaginationButtonsProps) {
  const buttonStyles =
    "flex items-center gap-x-2 bg-white/[3%] rounded-md py-3 px-6 hover:bg-white/[6%] border-white/20 border-[1px] shadow-[0_7px_7px_rgba(2,2,2,1)] transition active:scale-95";

  return (
    <section className="flex justify-between w-[50rem] mt-6 ">
      {currentPage > 1 ? (
        <button
          className={buttonStyles}
          onClick={() => handleChangePage("previous")}
        >
          <FaArrowLeftLong size={17} />
          PREV
        </button>
      ) : (
        <div />
      )}

      {currentPage < 10 ? (
        <button
          className={buttonStyles}
          onClick={() => handleChangePage("next")}
        >
          NEXT
          <FaArrowRightLong size={17} />
        </button>
      ) : (
        <div />
      )}
    </section>
  );
}
