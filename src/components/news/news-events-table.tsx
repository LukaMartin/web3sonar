import { NewsEvent } from "@/lib/types";
import { convertDate } from "@/lib/utils";
import Link from "next/link";
import { FaLink } from "react-icons/fa";

type NewsEventsTableProps = {
  newsEvents: NewsEvent[];
};

export default function NewsEventsTable({ newsEvents }: NewsEventsTableProps) {
  return (
    <section className="flex flex-col">
      <table className="bg-white/[3%] mb-2 rounded-md shadow-[0_7px_5px_rgba(2,2,2,1)] table-fixed">
        <thead>
          <tr className="text-sm text-white/90">
            <th className="text-left py-4 pl-6 w-[7rem]">DATE</th>
            <th className="text-left py-4 w-[6.75rem]">TIME</th>
            <th className="text-left py-4 w-[5.5rem]">IMPACT</th>
            <th className="text-left py-4 w-80">EVENT</th>
            <th className="text-left py-4 w-24">FORECAST</th>
            <th className="text-left py-4 w-24">PREVIOUS</th>
            <th className="text-left py-4 w-14">LINK</th>
          </tr>
        </thead>
        <tbody>
          {newsEvents.map((event) => {
            return (
              <tr key={event.url}>
                <td className="pl-6 pb-4">
                  <p>{convertDate(event.date)}</p>
                </td>
                <td className="pb-4">
                  <p>
                    {event.date.split("T")[1].substring(0, 5) + " " + "EST"}
                  </p>
                </td>
                <td className="pb-4">
                  <p>{event.impact}</p>
                </td>
                <td className="pb-4">
                  <p>{event.country.substring(0, 2) + " " + event.title}</p>
                </td>
                <td className="pb-4">
                  <p>{event.forecast ? event.forecast : "N/A"}</p>
                </td>
                <td className="pb-4">
                  <p>{event.previous ? event.previous : "N/A"}</p>
                </td>
                <td className="text-left pb-4">
                  <p>
                    <Link href={event.url} target="_blank">
                      <FaLink size={22} className="hover:text-white/60"/>
                    </Link>
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <p className="text-sm text-white/75 self-end">
        Powered by{" "}
        <Link href="https://www.cryptocraft.com/calendar" target="_blank">
          <span className="text-green-yellow hover:text-green-yellow/75">
            CryptoCraft
          </span>
        </Link>
      </p>
    </section>
  );
}
