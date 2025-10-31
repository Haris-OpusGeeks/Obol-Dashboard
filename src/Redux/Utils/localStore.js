
const localStoreUtil = {
  storeData: (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  },

  getData: (key) => {
    const item = localStorage.getItem(key);
    if (!item) return null;
    try {
      return JSON.parse(item);
    } catch (err) {
      console.error("Error parsing localStorage data:", err);
      return null;
    }
  },

  removeData: (key) => {
    localStorage.removeItem(key);
    return true;
  },

  removeAll: () => {
    localStorage.clear();
    return true;
  },
};

// Save / Get helpers
export const saveAccessToken = (accessToken) =>
  localStoreUtil.storeData("accessToken", accessToken);

export const saveRefreshToken = (refreshToken) =>
  localStoreUtil.storeData("refreshToken", refreshToken);

export const getAccessToken = () => localStoreUtil.getData("accessToken");
export const getRefreshToken = () => localStoreUtil.getData("refreshToken");

export default localStoreUtil;
