export const delay = (ms = 1000) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const DAYS = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
];

export const formatTime = (utcTime = '', formatByDate = false) => {
  const time = new Date(utcTime);
  const d = formatUnitTime(time.getUTCDate());
  const m = formatUnitTime(time.getUTCMonth() + 1);
  const y = time.getUTCFullYear();
  if (formatByDate) {
    return `${DAYS[time.getUTCDay()]} ${MONTHS[m - 1]} ${d} ${y}`;
  }
  return `${d}:${m}:${y}`;
};

export const formatUnitTime = (value) => {
  return `0${String(value)}`.slice(-2);
};

export const formatTimeByHours = (utcTime = '') => {
  const time = new Date(utcTime);
  const h = formatUnitTime(time.getUTCHours());
  const m = formatUnitTime(time.getUTCMinutes());
  return `${h}:${m}`;
};

export const debounce = (func, wait, immediate) => {
  let timeout;
  return function () {
    let context = this,
      args = arguments;
    let later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};
