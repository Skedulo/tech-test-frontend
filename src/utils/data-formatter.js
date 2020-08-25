export const displayDateWithoutSec = (date) => {
  return new Date(date).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
