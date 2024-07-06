import { useRouter } from "next/navigation"
import { useDisconnect } from "wagmi"


export default function WalletDisconnectButton() {
  const router = useRouter();  
  const { disconnect } = useDisconnect();
  
  const disconnectWallet = () => {
    disconnect();
    router.refresh();
  }

  return (
    <button className="w-32 h-10 rounded-3xl bg-white/[5%] hover:bg-white/[10%]" onClick={() => disconnectWallet()}>Disconnect</button>
  )
}
