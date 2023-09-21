export function getRandomStringNumberByLength(length: number) {
  const min = Math.pow(10, length - 1);
  const max = min * 9;
  const code = Math.round(Math.random() * max) + min;
  return String(code);
}

export function setStartAndEndOfDateByTime(date: Date) {
  const startOfDay = new Date(date.setUTCHours(0, 0, 0, 0));
  const endOfDay = new Date(date.setUTCHours(23, 59, 59, 999));
  return { startOfDay, endOfDay };
}
