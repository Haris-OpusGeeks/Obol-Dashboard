import axios from "axios";
import { getAccessToken, getRefreshToken, saveAccessToken } from "./localStore";
import authServices from "../Services/authServices";
// import { updateAccessToken } from "../Reducers/authSlice";
// import { store } from "../Store/store";


export const base_url = "https://obol.koderspedia.online";




export const fetchApi = async ({
  method,
  endPoint,
  token,
  data,
  params,
  formData,
}) => {
  const headers = {
    // tenant: 'root',
  };
  if (token) {
    const accessToken = await getAccessToken();
    headers.Authorization = `Bearer ${accessToken}`;
  }

  if (formData) {
    headers["Content-Type"] = "multipart/form-data";
    headers["Accept"] = "multipart/form-data";
    headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
  } else {
    headers["Content-Type"] = "application/json";
    headers["Accept"] = "application/json";
    headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
  }

  var config = {
    method,
    url: `${base_url}/api/${endPoint}`,
    headers,
    data: data ? data : undefined,
    params: params ? params : undefined,
  };
  console.log(config.url);
  console.log(config.headers);
  console.log(config.data);
  if (params) config.params = params;

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.warn("Access token expired, trying refresh...");

      const refreshToken = getRefreshToken();
      if (!refreshToken) throw error; // no refresh token → fail
      try {
        const refreshResponse = await authServices.refreshAccessToken(
          refreshToken
        );
        const newAccessToken = refreshResponse.data?.data?.access_token;

        if (newAccessToken) {
          await saveAccessToken(newAccessToken);
          // store.dispatch(updateAccessToken(newAccessToken));

          // Retry the original request with the new token
          config.headers.Authorization = `Bearer ${newAccessToken}`;
          const retryResponse = await axios(config);
          return retryResponse;
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        throw refreshError;
      }
    }

    // If some other error, just throw it
    throw error;
  }
};
