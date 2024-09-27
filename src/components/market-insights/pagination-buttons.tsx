import { PageDirection } from "@/types/pageDirection";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

type PaginationButtonsProps = {
  handleChangePage: (direction: PageDirection) => void;
  currentPage: number;
};

export default function PaginationButtons({
  handleChangePage,
  currentPage,
}: PaginationButtonsProps) {
  const buttonStyles =
    "flex items-center gap-x-2 bg-white/[3%] rounded-md py-3 px-6 hover:bg-white/[6%] shadow-[0_7px_5px_rgba(2,2,2,1)] transition active:scale-95";

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
