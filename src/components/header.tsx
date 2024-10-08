"use client";

import { usePathname } from "next/navigation";
import Logo from "./logo";
import Link from "next/link";
import clsx from "clsx";
import { motion } from "framer-motion";

export default function Header() {
  const activepathname = usePathname();

  const routes = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Market Insights",
      path: "/market-insights",
    },
    {
      name: "News",
      path: "/news",
    },
    {
      name: "Token Exchange",
      path: "/token-exchange",
    },
    {
      name: "Gas Dashboard",
      path: "/gas-dashboard",
    },
  ];

  return (
    <header className="h-32 flex items-center justify-between gap-y-4 sm:gap-y-0 mb-20 px-4 md:px-8 border-b border-white/10">
      <Link href="/">
        <Logo height={60} />
      </Link>

      <nav className="h-full hidden xl:block">
        <ul className="flex gap-x-6 h-full">
          {routes.map((route) => {
            return (
              <li
                key={route.path}
                className={clsx(
                  "hover:text-white flex items-center relative transition",
                  {
                    "text-white": activepathname === route.path,
                    "text-white/70": activepathname !== route.path,
                  }
                )}
              >
                <Link href={route.path}>{route.name}</Link>

                {activepathname === route.path && (
                  <motion.div
                    layoutId="header-active-link"
                    className="bg-green-yellow h-[0.175rem] w-full absolute bottom-0 rounded-md"
                  ></motion.div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
