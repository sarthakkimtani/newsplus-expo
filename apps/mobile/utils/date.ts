export const relativeDate = (dateString: string): string => {
  const published = new Date(dateString).getTime();
  const now = Date.now();

  const diffTime = now - published;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  return `${diffDays} days ago`;
};
