export function isEmail(email: string) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}
export function isPhoneNumber(phoneNumber: string): boolean {
  const phonePattern = /^(0[0-9]{9,10})$/;
  return phonePattern.test(phoneNumber);
}
