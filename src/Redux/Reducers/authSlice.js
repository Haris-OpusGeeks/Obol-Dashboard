import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authServices from "../Services/authServices";
import localStoreUtil, {
  getAccessToken,
  getRefreshToken,
  saveAccessToken,
  saveRefreshToken,
} from "../Utils/localStore";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  access_token: getAccessToken() || null,
  refreshToken: getRefreshToken() || null,
  isLoggedIn: !!getAccessToken(),
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};


export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ requestData, onDone }, { dispatch, rejectWithValue }) => {
    try {
      const response = await authServices.loginUser(requestData);

      if (response.status === 200 || response.status === 201) {
        const data = response.data?.data;
        console.log("Login response data:", data);

        if (data?.access_token) saveAccessToken(data.access_token);
        if (data?.refreshToken) saveRefreshToken(data.refreshToken);

        console.log("Access token:", data?.access_token,);
        console.log("Refresh Token:",  data?.refreshToken);


        onDone && onDone();
        return data;
      } else {
        return rejectWithValue("Login failed. Please try again.");
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response?.data?.message || error.message || "Login failed"

      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    destroySession: (state) => {
      state.isLoggedIn = false;
      state.access_token = null;
      state.refreshToken = null;
      localStoreUtil.removeAll();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const token = action.payload?.access_token;
        const refresh = action.payload?.refreshToken;

        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = !!token;
        state.access_token = token || null;
        state.refreshToken = refresh || null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Login failed";
      });
  },
});

const persistConfig = {
  key: "auth",
  storage,
  blacklist: ["isError", "isSuccess", "isLoading"],
};

export const { destroySession } = authSlice.actions;
export default persistReducer(persistConfig, authSlice.reducer);
