export const removeDecimalsFromString = (string: string) => {
  let substring = string.split(".")[0];

  return substring;
};
