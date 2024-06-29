import Image from "next/image";
import logo from "../../public/web3sonar-logo.svg"

export default function Logo() {
  return (
    <Image
        src={logo}
        alt="Web 3 Sonar logo"
        height={60}
    />
  )
}
