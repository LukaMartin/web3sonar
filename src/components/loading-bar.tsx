import { BarLoader } from "react-spinners";

export default function LoadingBar() {
  return (
      <BarLoader
        color="#f76c6c"
        height={20}
        width={"96%"}
        aria-label="Loading Bar"
        className="rounded-sm col-start-1 col-span-4 md:col-start-2 md:col-span-2 ml-2 md:ml-3" 
      />
  );
}
