"use client";

import { useEffect, useState } from "react";
import { GoMoveToTop } from "react-icons/go";
import TransactionSimulationForm from "./transaction-simulation-form";
import TransactionSimulationResult from "./transaction-simulation-result";

export default function TransactionSimulationContainer() {
  const [visible, setVisible] = useState(false);
  const [simulationResult, setSimulationResult] = useState({
    simulationStatus: "-",
    simulatedBlockNumber: "-",
    gasUsed: "-",
    failureMessage: "-",
  });

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 550) {
      setVisible(true);
    } else if (scrolled <= 550) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
  }, []);

  return (
    <section
      id="transaction-simulator"
      className="mt-[7.5rem] hidden md-lg:flex gap-x-4 lg:gap-x-16"
    >
      <div>
        <h3 className="text-2xl font-semibold pb-[2.4rem]">
          Transaction Simulator
        </h3>
        <TransactionSimulationForm setSimulationResult={setSimulationResult} />
      </div>

      <div className="flex flex-col justify-between">
        <TransactionSimulationResult simulationResult={simulationResult} />

        {visible && (
          <GoMoveToTop
            size={60}
            className="text-accent self-end hover:cursor-pointer hover:text-accent/75 animate-slideDown"
            onClick={() => scrollToTop()}
          />
        )}
      </div>
    </section>
  );
}
