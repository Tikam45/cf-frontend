const BASE_URL = "https://cf-backend-api.vercel.app"

export const endpoints = {
    SENDOTP_API : BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",

    CREATE_ORDER: BASE_URL + "/orders/createOrder",
    GET_LIVE_ORDERS: BASE_URL + "/orders/getLiveOrders",
    ORDER_INFO: BASE_URL + "/orderInfo",
    REMOVE_ORDER: BASE_URL + "/orders/removeOrder",
    GET_ORDER_BIDS: BASE_URL + "/getOrderBids",
    GET_ORDER_DETAILS: BASE_URL + "/order/orderDetails",

    GET_USER_ORDERS : BASE_URL + "/orders/getUserOrders",
    GET_USER_DASHBOARD: BASE_URL + "/orders/getUserDashboard",
    AADHAR_API: BASE_URL + "",

    GET_PROFILE_INFO: BASE_URL + "/profile/getUserDetails",
    SEND_OTP_MESSAGE: BASE_URL + "/profile/sendOtpMessage",
    UPDATE_MOBILE: BASE_URL + "/profile/updateMobile",
    UPDATE_IMAGE: BASE_URL + "/profile/updateImage",

    CREATE_BID: BASE_URL + "/bids/createBid",
    GET_USER_BIDS : BASE_URL + "/bids/getUserBids",
    DELETE_BID: BASE_URL + "/bids/deleteBid",

    CREATE_DEAL: BASE_URL + "/deals/createDeal",

    SENDOTP_FOR_PASSWORD_CHANGE: BASE_URL + "/auth/sendResetPasswordOtp",
    RESET_PASSWORD: BASE_URL + "/auth/resetPassword",
    SENDOTP_FOR_FORGOT_PASSWORD: BASE_URL + "/sendForgotPasswordOtp",
    RESET_FORGOT_PASSWORD : BASE_URL + "/resetForgotPassword",

    CHECKOUT: BASE_URL + "/checkout",
    PAYMENT_VERIFICATION : BASE_URL + "/paymentVerification",

    GET_CROP_TYPES: BASE_URL + "/getCropTypes",
}