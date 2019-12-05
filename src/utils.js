export function formatDate(dateString) {
  const date = new Date(dateString);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
  const monthNames = [
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

  return {
    getDayName: () => days[date.getDay()],
    getDate: () => {
      let dd = date.getDate();
      if (dd < 10) {
        dd = '0' + dd;
      }

      return dd;
    },
    getFullMonth: () => monthNames[date.getMonth()],
    getMonth: () => {
      let MM = date.getMonth() + 1; //January is 0!

      if (MM < 10) {
        MM = '0' + MM;
      }

      return MM;
    },
    getFullYear: () => date.getFullYear(),
    getUTCTime: () => {
      let hh = date.getUTCHours();
      let mm = date.getUTCHours();

      if (hh < 10) {
        hh = '0' + hh;
      }

      if (mm < 10) {
        mm = '0' + mm;
      }
      return hh + ':' + mm;
    },
    getTime: () => {
      let hh = date.getHours();
      let mm = date.getHours();

      if (hh < 10) {
        hh = '0' + hh;
      }

      if (mm < 10) {
        mm = '0' + mm;
      }
      return hh + ':' + mm;
    },
  };
}

export function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this,
      args = arguments;
    const executeFunction = function() {
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(executeFunction, wait);
  };
}
