const formatDate = (date: string) =>
  new Date(date).toLocaleDateString().slice(0, -1);

export default formatDate;
