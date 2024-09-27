import Image from "next/image";
import logo from "../../public/web3sonar-logo.png";

export default function Logo({ height }: { height: number }) {
  return <Image src={logo} alt="Web 3 Sonar logo" height={height} />;
}
