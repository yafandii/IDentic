export const formatDateWithTime = (date: Date | string) => {
  if (typeof date === "string") {
    date = new Date(date.replace("Z", ""));
  }
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
};

export const formatDateOnly = (date: Date | string) => {
  if (typeof date === "string") {
    date = new Date(date.replace("Z", ""));
  }
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};

export const formatDate = (date: Date | string) => {
  if (typeof date === "string") {
    date = new Date(date.replace("Z", ""));
  }
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};
