export const formatDate = (date) => {
  const dateToConvert = new Date(date);
  const day = dateToConvert.getDate();
  const month = dateToConvert.getMonth();
  const year = dateToConvert.getFullYear();

  return `${day}.${month}.${year}`;
};
