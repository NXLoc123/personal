export function getContentRegisterOtp(otpCode: string) {
  return `OTP: ${otpCode} is used to verify your account`;
}

export const MAXIMUM_NUMBER_OF_TIMES_REQUEST = 5;

export function getBodyRouteOfMiddleWare(path: string, method: number) {
  return { path, method };
}
