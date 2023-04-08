const formatDateSlash = (date: string) => {
  const [year, month, day] = date.split("T")[0].split("-");
  return `${year.slice(-2)}/${month}/${day}`;
};

export default formatDateSlash;
