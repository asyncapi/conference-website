export const isPastEvent = (dateString: string): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (dateString.includes('-')) {
    const parts = dateString.split('-').map((p) => p.trim());
    const endDateString = parts[parts.length - 1]; 
    const endDate = new Date(endDateString);
    if (isNaN(endDate.getTime())) {
      return false;
    }
    endDate.setHours(0, 0, 0, 0);
    return endDate < today;
  }
  const parsedDate = new Date(dateString);
  if (isNaN(parsedDate.getTime())) {
    return false;
  }
  parsedDate.setHours(0, 0, 0, 0);
  return parsedDate < today;
};
