import { combineReducers } from "@reduxjs/toolkit"; 
import authSlice from "./authSlice";
import dashboardSlice from "./dashboardSlice";
import usersReducer from "./usersSlice";
import couponReducer from "./couponSlice";

const appReducer = combineReducers({
    auth: authSlice,
    dashboard: dashboardSlice,
    users: usersReducer,
    coupons: couponReducer,

    });

    const rootReducer = (state, action) => {
  
    return appReducer(state, action);
  };

  export default rootReducer;