export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // getMonth() is 0-indexed
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);
  const milliseconds = ("000" + date.getMilliseconds()).slice(-3);

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
};

export const formatStringDate = (date: string) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = ("0" + (dateObj.getMonth() + 1)).slice(-2); // getMonth() is 0-indexed
  const day = ("0" + dateObj.getDate()).slice(-2);
  const hours = ("0" + dateObj.getHours()).slice(-2);
  const minutes = ("0" + dateObj.getMinutes()).slice(-2);
  const seconds = ("0" + dateObj.getSeconds()).slice(-2);
  const milliseconds = ("000" + dateObj.getMilliseconds()).slice(-3);

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
};
