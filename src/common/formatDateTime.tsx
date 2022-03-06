export const formatDateTime = (date: string) => {
  return `${formatDate(date)} ${formatTime(date)}`
}

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString()
}

export const formatTime = (date: string) => {
  return new Date(date).toLocaleTimeString()
}
