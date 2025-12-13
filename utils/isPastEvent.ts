export const isPastEvent = (dateString: string): boolean => {
  const today = new Date();

  if (dateString.includes('-')) {
    const parts = dateString.split('-').map(p => p.trim());
    const endDateString = parts[parts.length - 1];
    const endDate = new Date(endDateString);
    return endDate < today;
  }
  return new Date(dateString) < today;
};
