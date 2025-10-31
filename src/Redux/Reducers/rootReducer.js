import { combineReducers } from "@reduxjs/toolkit"; 
import authSlice from "./authSlice";

const appReducer = combineReducers({
    auth: authSlice,

    });

    const rootReducer = (state, action) => {
  
    return appReducer(state, action);
  };

  export default rootReducer;