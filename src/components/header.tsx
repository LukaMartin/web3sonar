import Logo from "./logo";
import Link from "next/link";

export default async function Header() {
  return (
    <header className="h-32 max-w-7xl flex  items-center justify-between gap-y-4 sm:gap-y-0 mx-auto mb-20 px-4 md:px-8 border-b border-white/10">
      <Link href="/">
        <Logo />
      </Link>
    </header>
  );
}
