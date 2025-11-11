import endPoints from "../Constants/endpoints";
import { fetchApi } from "../Utils/helper";

class CouponServices {
  getCoupons = async () => {
    const response = await fetchApi({
      method: "GET",
      endPoint: endPoints.GET_COUPONS,
      token: true,
    });
    return response;
  };

  addCoupon = async (data) => {
    const response = await fetchApi({
      method: "POST",
      endPoint: endPoints.ADD_COUPON,
      token: true,
      data,
    });
    return response;
  };

  updateCoupon = async (data) => {
    const response = await fetchApi({
      method: "POST",
      endPoint: endPoints.UPDATE_COUPON,
      token: true,
      data,
    });
    return response;
  };

    deleteCoupon = async (data) => {
    const response = await fetchApi({
      method: "POST",
      endPoint: endPoints.DELETE_COUPON,
      token: true,
      data,
    });
    return response;
  };
}



const couponServices = new CouponServices();
export default couponServices;
