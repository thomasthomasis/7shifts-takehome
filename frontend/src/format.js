export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export function formatTime(dateString) {
  return new Date(dateString).toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  });
}
