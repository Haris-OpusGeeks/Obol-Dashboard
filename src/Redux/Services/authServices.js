import endPoints from '../Constants/endpoints';
import { fetchApi } from '../Utils/helper';

class AuthServices {
    loginUser = async data => {
    const response = await fetchApi({
      method: 'POST',
      endPoint: endPoints.LOGIN,
      data,
    });
    return response;
    
  };

  refreshAccessToken = async (refreshToken) => {
    const data = {
      grantType: "refresh_token",
      refreshToken: refreshToken,
    };

    const response = await fetchApi({
      method: "POST",
      endPoint: endPoints.REFRESH_TOKEN, 
      data,
    });

    return response;
  };
  
}

const authServices = new AuthServices();
export default authServices;