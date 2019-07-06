const formatToCard = (type, { name, start, end }) => ({
  className: `swimlane__card-${type}`,
  style: undefined,
  description: name,
  start: new Date(start).valueOf(),
  end: new Date(end).valueOf()
});
export const formatJobToCard = job => formatToCard("job", job);
export const formatActivityToCard = activity =>
  formatToCard("activity", activity);
