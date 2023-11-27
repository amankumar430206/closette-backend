const BASE_AUTH_ROUTE = "/auth";

export const AUTH_ROUTES = {
  LOGIN: BASE_AUTH_ROUTE + "/login",
  REGISTER: BASE_AUTH_ROUTE + "/register",
  OTP_SEND: BASE_AUTH_ROUTE + "/otp/send",
  OTP_VERIFY: BASE_AUTH_ROUTE + "/otp/verify",
};
