export const formatAddress = (
  str: string | undefined | null,
  chars: number
) => {
  if (!str) return null;

  const start = str.substring(0, chars - 1);
  const end = str.substring(str.length - chars);
  return `${start}...${end}`;
};
