import { NewsEvent } from "../../types/news/newsEvent";

export const fetchNewsEvents = async () => {
  const response = await fetch(
    "https://nfs.faireconomy.media/cc_calendar_thisweek.json",
    {
      method: "GET",
      next: {
        revalidate: 14400,
      },
    }
  );

  const data = await response.json();

  const filteredData = data.filter((event: NewsEvent) => {
    return event.impact === "High";
  });

  return filteredData;
};
