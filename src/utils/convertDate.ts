import { reverseDate } from "./reverseDate";

export const convertDate = (date: string) => {
  let newDate = "";
  let reversedDate = reverseDate(date.split("T")[0]);
  let day = reversedDate.substring(0, 2);
  let month = Number(reversedDate.substring(3, 5)) - 1;
  let year = reversedDate.substring(8, 10);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let newMonth = months[Number(month)];

  newDate = day + " " + newMonth + " " + year;

  return newDate;
};
