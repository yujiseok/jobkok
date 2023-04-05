const shuffle = (number: number) => {
  const numberArr = Array(number)
    .fill(1)
    .map((v, i) => i + 1);

  return [...numberArr].sort(() => 0.5 - Math.random());
};
export default shuffle;
