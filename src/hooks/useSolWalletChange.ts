import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";

export default function useSolWalletChange() {
  const { publicKey } = useWallet();
  const [currentPublicKey, setCurrentPublicKey] = useState<PublicKey | null>(
    publicKey
  );

  const getPhantomProvider = () => {
    if (window && "phantom" in window) {
      // @ts-ignore
      const provider = window.phantom?.solana;

      if (provider?.isPhantom) {
        return provider;
      } else {
        return null;
      }
    }
  };

  const getBackpackProvider = () => {
    if ("backpack" in window) {
      const provider = window.backpack;

      // @ts-ignore
      if (provider?.isBackpack) {
        return provider;
      }
    }
  };

  const phantomProvider: any = getPhantomProvider();

  const backpackProvider: any = getBackpackProvider();

  useEffect(() => {
    phantomProvider.on("accountChanged", (publicKey: PublicKey) => {
      if (publicKey) {
        // Set new public key and continue as usual
        setCurrentPublicKey(publicKey);
      } else {
        // Attempt to reconnect to Phantom
        phantomProvider.connect().catch((error: Error) => {
          // Handle connection failure
          console.error("Failed to reconnect to Phantom:", error);
        });
      }
    });

    backpackProvider.on("connect", () => {
      const newPublicKey = backpackProvider.publicKey;
      setCurrentPublicKey(newPublicKey ? new PublicKey(newPublicKey) : null);
    });

    backpackProvider.on("disconnect", () => {
      setCurrentPublicKey(null);
    });
  }, [phantomProvider, backpackProvider]);

  useEffect(() => {
    if (!currentPublicKey) {
      setCurrentPublicKey(publicKey);
    }
  }, [publicKey, currentPublicKey]);

  return {
    currentPublicKey,
    backpackProvider,
    phantomProvider,
  };
}
