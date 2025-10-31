import axios from "axios";
import { getAccessToken } from "./localStore";

export const base_url = 'https://obol.koderspedia.online';

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
  if (token) headers.Authorization = 'Bearer ' + (await getAccessToken());  

  if (formData) {
    headers['Content-Type'] = 'multipart/form-data';
    headers['Accept'] = 'multipart/form-data';
    headers['Cache-Control']= 'no-cache, no-store, must-revalidate';
  } else {
    headers['Content-Type'] = 'application/json';
    headers['Accept'] = 'application/json';
    headers['Cache-Control']= 'no-cache, no-store, must-revalidate';
  }

  var config = {
    method,
    url: `${base_url}/api/${endPoint}`,
    headers,
    data: data ? data : undefined,
};
  console.log(config.url);
  console.log(config.headers);
  console.log(config.data);
  if (params) config.params = params;

  return await axios(config);
};