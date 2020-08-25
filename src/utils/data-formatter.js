export const displayTimeWithoutSec = (date) => {
  return new Date(date).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const displayDateAndTime = (date) => {
  var dt = new Date(date);
  var DD = ("0" + dt.getDate()).slice(-2);
  var MM = ("0" + (dt.getMonth() + 1)).slice(-2);
  var YYYY = dt.getFullYear();
  var hh = ("0" + dt.getHours()).slice(-2);
  var mm = ("0" + dt.getMinutes()).slice(-2);
  return YYYY + "-" + MM + "-" + DD + " " + hh + ":" + mm;
};

export const displayDate = (date) => {
  var dt = new Date(date);
  var DD = ("0" + dt.getDate()).slice(-2);
  var MM = ("0" + (dt.getMonth() + 1)).slice(-2);
  var YYYY = dt.getFullYear();
  return YYYY + "-" + MM + "-" + DD;
};
