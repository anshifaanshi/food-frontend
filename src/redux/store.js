import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/features/userSlice";
import adminReducer from "../redux/features/adminSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        admin: adminReducer,
    },
});