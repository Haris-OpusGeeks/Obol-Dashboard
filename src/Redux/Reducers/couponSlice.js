import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import couponServices from "../Services/couponServices";

const initialState = {
  couponData: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

export const getCouponData = createAsyncThunk(
  "coupons/getCouponData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await couponServices.getCoupons();
      const { status, data } = response;

      if (status === 200 || status === 201) {
         console.log("CouponData>>>",data?.data);
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

export const addCoupon = createAsyncThunk(
  "coupons/addCoupon",
  async (couponData, { rejectWithValue }) => {
    try {
      const response = await couponServices.addCoupon(couponData);
      const { status, data } = response;

      if (status === 200 || status === 201) {
        return data?.data || null;
      } else {
        return rejectWithValue("Unexpected response status: " + status);
      }
    } catch (error) {
      console.error("Add coupon API error:", error);
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to add coupon"
      );
    }
  }
);

export const updateCoupon = createAsyncThunk(
  "coupons/updateCoupon",
  async (couponData, { rejectWithValue }) => {
    try {
      const response = await couponServices.updateCoupon(couponData);
      const { status, data } = response;

      if (status === 200 || status === 201) {
        return data?.data || null;
      } else {
        return rejectWithValue("Unexpected response status: " + status);
      }
    } catch (error) {
      console.error("Update coupon API error:", error);
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update coupon"
      );
    }
  }
);

export const deleteCoupon = createAsyncThunk(
  "coupons/delete",
  async (couponId, { rejectWithValue }) => {
    try {
      const response = await couponServices.deleteCoupon({
        id: couponId,
        delete: true, // ✅ Required parameter
      });

      const { status, data } = response;

      if (status === 200 || status === 201) {
        return data?.data || null;
      } else {
        return rejectWithValue("Unexpected response status: " + status);
      }
    } catch (error) {
      console.error("Coupon Delete API error:", error);
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete coupon"
      );
    }
  }
);


const couponsSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Coupons
      .addCase(getCouponData.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(getCouponData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.couponData = action.payload;
      })
      .addCase(getCouponData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })

      // Add Coupon
      .addCase(addCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload) state.couponData.push(action.payload);
      })
      .addCase(addCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })

      .addCase(updateCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const updatedCoupon = action.payload;
        if (updatedCoupon && Array.isArray(state.couponData)) {
          const index = state.couponData.findIndex(
            (u) => u.id === updatedCoupon.id
          );
          if (index !== -1) state.couponData[index] = updatedCoupon;
        }
      })
      .addCase(updateCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(deleteCoupon.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const deletedId = action.meta.arg;
        state.couponData = state.couponData.filter(
          (u) => u.id !== deletedId
        );
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export default couponsSlice.reducer;
