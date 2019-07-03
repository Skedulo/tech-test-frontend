const toCard = (type, { name, start, end }) => ({
  className: `swimlane__card-${type}`,
  style: undefined,
  description: name,
  start: new Date(start).valueOf(),
  end: new Date(end).valueOf()
});
export const toJobCard = job => toCard("job", job);
export const toActivityCard = activity => toCard("activity", activity);
