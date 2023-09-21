import { MAXIMUM_NUMBER_OF_TIMES_REQUEST } from '../../modules/core/otps/constant/otps.constant';

export const ERROR_MESSAGES = {
  Common: {
    NOT_FOUND: 'Not Found!',
    INTERNAL_SERVER_ERROR: 'Internal Server Error!',
    NOT_AUTHORIZED: 'Not Authorized!',
    FORBIDDEN: 'Forbidden!',
    BAD_REQUEST: 'Bad Request!',
  },
  Auth: {
    USER_INVALID: 'Email or Phone Number Already Exists!',
  },
  Otp: {
    SEND_OTP_FAILED: 'Send Otp Failed!',
    OTP_CODE_INVALID: 'Otp Code Invalid!',
    OTP_DESTINATION_INVALID: 'Otp Destination Invalid!',
    OTP_REQUEST_INVALID: `Exceeding the allowed OTP send attempts! You can only send ${MAXIMUM_NUMBER_OF_TIMES_REQUEST} times per day with each email or phone number.`,
  },
};
