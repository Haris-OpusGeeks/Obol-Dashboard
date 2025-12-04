import endPoints from "../Constants/endpoints";
import { fetchApi } from "../Utils/helper";

class UserServices {
  getUsers = async () => {
    const response = await fetchApi({
      method: "GET",
      endPoint: endPoints.GET_USERS,
      token: true,
    });
    return response;
  };

  addUser = async (data) => {
    const response = await fetchApi({
      method: "POST",
      endPoint: endPoints.ADD_USER,
      token: true,
      data,
    });
    return response;
  };

  updateUser = async (data) => {
    const response = await fetchApi({
      method: "POST",
      endPoint: endPoints.UPDATE_USER,
      token: true,
      data,
    });
    return response;
  };

  getInactiveUsers = async () => {
    const response = await fetchApi({
      method: "GET",
      endPoint: endPoints.INACTIVE_USERS,
      token: true,
    });
    return response;
  };

    markDead = async (data) => {
    const response = await fetchApi({
      method: "POST",
      endPoint: endPoints.MARK_DEAD,
      token: true,
      data,
    });
    return response;
  };

  getUserByID = async (data) => {
    const response = await fetchApi({
      method: "POST",
      endPoint: endPoints.GET_USER_BY_ID,
      token: true,
      data,
    });
    return response;
  };
}



const userServices = new UserServices();
export default userServices;
