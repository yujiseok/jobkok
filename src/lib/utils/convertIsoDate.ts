export const convertIsoDate = (value: string): string => {
  const date = new Date(value);
  const isoDate = date.toISOString().split("T")[0];
  const isoTime = "00:00:00";
  return `${isoDate}T${isoTime}`;
};
