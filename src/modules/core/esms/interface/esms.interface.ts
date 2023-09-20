export interface ISendSmsOtpRequestBody {
  ApiKey: string;
  Content: string;
  Phone: string;
  SecretKey: string;
  SmsType: string;
}
