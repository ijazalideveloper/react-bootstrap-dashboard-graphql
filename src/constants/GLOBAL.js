export default {
  BASE_URL: process.env.REACT_APP_BASEURL,
  UNAUTHORIZED: 401,
  PAYMENTS_BACKEND: false,
  PAYMENTS_URL: "http://localhost:8081",
  PAYMENT_ROUTES : [
    "/select/plan",
    "/v1/plans/",
    "/v1/payments/",
    "/v1/coupons/",
    "/v1/subscriptions/"
  ]
};
