export const reverseDate = (date: string) => {
  let newDate = date.split("-");
  let formattedDate = newDate[2] + "-" + newDate[1] + "-" + newDate[0];

  return formattedDate;
};
