"use client";

import {
  EconomicCalendar,
  CopyrightStyles,
} from "react-ts-tradingview-widgets";

export default function TrdingViewWidget() {
  const styles: CopyrightStyles = {
    span: {
      color: "#a4f839",
    },
  };

  return (
    <section className="bg-white/[3%] rounded-md border-white/20 border-[1px] shadow-[0_7px_7px_rgba(2,2,2,1)]">
      <EconomicCalendar
        colorTheme="dark"
        isTransparent={true}
        copyrightStyles={styles}
        importanceFilter="0,1"
        height={600}
        width="100%"
      ></EconomicCalendar>
    </section>
  );
}
