export const formatToMs = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  const milliseconds = Math.round((timeInSeconds % 1) * 100);

  const pad = (num: number, size: number) => String(num).padStart(size, "0");
  return `${pad(minutes, 2)}:${pad(seconds, 2)}:${pad(milliseconds, 2)}`;
};
