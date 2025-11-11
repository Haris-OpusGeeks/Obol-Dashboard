import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userServices from "../Services/userServices";

const initialState = {
  userData: [],
  inactiveData: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

export const getUserData = createAsyncThunk(
  "users/getUserData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userServices.getUsers();
      const { status, data } = response;

      if (status === 200 || status === 201) {
         console.log("USerDta>>>",data?.data);
        return data?.data || [];
      } else {
        return rejectWithValue("Unexpected response status: " + status);
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch data"
      );
    }
  }
);

export const addUser = createAsyncThunk(
  "users/addUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await userServices.addUser(userData);
      const { status, data } = response;

      if (status === 200 || status === 201) {
        return data?.data || null;
      } else {
        return rejectWithValue("Unexpected response status: " + status);
      }
    } catch (error) {
      console.error("Add user API error:", error);
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to add user"
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await userServices.updateUser(userData);
      const { status, data } = response;

      if (status === 200 || status === 201) {
        return data?.data || null;
      } else {
        return rejectWithValue("Unexpected response status: " + status);
      }
    } catch (error) {
      console.error("Update user API error:", error);
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update user"
      );
    }
  }
);

export const markDead = createAsyncThunk(
  "users/markDead",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await userServices.markDead({ id: userId });
      const { status, data } = response;

      if (status === 200 || status === 201) {
        return data?.data || null;
      } else {
        return rejectWithValue("Unexpected response status: " + status);
      }
    } catch (error) {
      console.error("Mark Dead API error:", error);
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to mark user dead"
      );
    }
  }
);

export const getInactiveUsers = createAsyncThunk(
  "users/inactive",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userServices.getInactiveUsers();
      const { status, data } = response;

      if (status === 200 || status === 201) {
        console.log("InactiveData",data?.data);
        return data?.data || [];
      } else {
        return rejectWithValue("Unexpected response status: " + status);
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch data"
      );
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Users
      .addCase(getUserData.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userData = action.payload;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })

      // Add User
      .addCase(addUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload) state.userData.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })

      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        // Optionally update the existing user in userData
        const updatedUser = action.payload;
        if (updatedUser && Array.isArray(state.userData)) {
          const index = state.userData.findIndex(
            (u) => u.id === updatedUser.id
          );
          if (index !== -1) state.userData[index] = updatedUser;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(getInactiveUsers.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(getInactiveUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.inactiveData = action.payload;
      })
      .addCase(getInactiveUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(markDead.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(markDead.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const deletedId = action.meta.arg;
        state.inactiveData = state.inactiveData.filter(
          (u) => u.id !== deletedId
        );
      })
      .addCase(markDead.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export default usersSlice.reducer;
