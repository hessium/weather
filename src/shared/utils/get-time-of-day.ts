export const getTimeOfDay = (timestamp: number): string => {
  const hours = new Date(timestamp * 1000).getHours();

  if (hours >= 5 && hours < 12) return 'утро';
  if (hours >= 12 && hours < 18) return 'день';
  if (hours >= 18 && hours < 22) return 'вечер';
  return 'ночь';
};
