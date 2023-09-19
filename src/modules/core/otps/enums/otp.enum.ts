export enum OtpTypes {
  Register = 'register',
  ForgotPassword = 'forgot-password',
}

export enum OtpStatusTypes {
  Created = 'unverified',
  Verified = 'verified',
}

export enum OtpDestinationTypes {
  Email = 'email',
  Phone = 'phone',
}
