export const formatTime = (date: string) => {
  return new Date(date).getHours() + " : " + new Date(date).getMinutes();
};
