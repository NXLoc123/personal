export function getRandomStringNumberByLength(length: number) {
  const min = Math.pow(10, length - 1);
  const max = min * 9;
  const code = Math.round(Math.random() * max) + min;
  return String(code);
}
