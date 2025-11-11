const endPoints = {
    LOGIN: 'v1/account/login',
    REFRESH_TOKEN: 'v1/account/login/refresh_token',

    DASHBOARD: 'v1/user/dashboard',
    TRANSACTION_DATA: 'v1/user/payment/transactions',
    STATISTICS_DATA: 'v1/user/statistics',

    GET_USERS: 'v1/user/retrieve',
    ADD_USER: 'v1/account/register',
    UPDATE_USER:'v1/user/update',
    INACTIVE_USERS: 'v1/user/retrieve/inactive',
    MARK_DEAD:'v1/user/mark_dead',

    GET_COUPONS:'v1/couponcode/retrieve',
    ADD_COUPON:'v1/couponcode/insert',
    UPDATE_COUPON:'v1/couponcode/update',
    DELETE_COUPON:'v1/couponcode/delete',
}

export default Object.freeze(endPoints);