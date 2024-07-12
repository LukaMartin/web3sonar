import Logo from "./logo";
import { MdOutgoingMail } from "react-icons/md";
import { FaGithub } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="h-40 max-w-7xl flex flex-col mt-auto mx-auto px-4 md:px-8 border-t border-white/10">
      <div className="flex justify-between items-center mt-8">
        <Logo />
        <div className="flex justify-end items-center gap-x-4">
          <a target="_blank" href="https://github.com/LukaMartin/web3sonar">
            <FaGithub size={40} className="hover:text-white/60" />
          </a>
          <div className="flex items-center gap-x-2">
            <a href="mailto:web3sonar@gmail.com">
              <MdOutgoingMail size={50} className="hover:text-white/60" />
            </a>
            <p className="text-white/90 hidden sm:block">web3sonar@gmail.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
