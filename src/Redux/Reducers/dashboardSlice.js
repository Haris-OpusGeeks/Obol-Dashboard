import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dashboardServices from "../Services/dashboardServices";

const initialState = {
  data: null,   
  transactionTotalData:[],     
  statisticsTotalData:[], 
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

export const dashboardData = createAsyncThunk(
  "dashboard/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await dashboardServices.dashboardData();
      const { status, data } = response;

      if (status === 200 || status === 201) {
        return data?.data || null; // the inner "data" key from API response
      } else if (status === 204) {
        return null;
      } else {
        return rejectWithValue("Unexpected response status: " + status);
      }
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data?.message || error.message || "Failed to fetch data");
    }
  }
);

export const transactionData = createAsyncThunk(
  "transaction/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await dashboardServices.transactionData();
      const { status, data } = response;

      if (status === 200 || status === 201) {
         console.log("TransactionData>>>",data?.data);
        return data?.data || null; 
       
      } else if (status === 204) {
        return null;
      } else {
        return rejectWithValue("Unexpected response status: " + status);
      }
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data?.message || error.message || "Failed to fetch data");
    }
  }
);

export const statisticsData = createAsyncThunk(
  "statistics/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await dashboardServices.statisticsData();
      const { status, data } = response;

      if (status === 200 || status === 201) {
        return data?.data || null; // the inner "data" key from API response
      } else if (status === 204) {
        return null;
      } else {
        return rejectWithValue("Unexpected response status: " + status);
      }
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data?.message || error.message || "Failed to fetch data");
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(dashboardData.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(dashboardData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload; // save actual data here
      })
      .addCase(dashboardData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Failed to fetch dashboard data";
      })
      .addCase(transactionData.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(transactionData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.transactionTotalData = action.payload; // save actual data here
      })
      .addCase(transactionData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Failed to fetch transaction data";
      })
      .addCase(statisticsData.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(statisticsData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.statisticsTotalData = action.payload; // save actual data here
      })
      .addCase(statisticsData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Failed to fetch transaction data";
      });
  },
});

export default dashboardSlice.reducer;
