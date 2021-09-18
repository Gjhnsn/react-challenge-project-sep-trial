import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../components/login/loginSlice";

const store = configureStore({
  reducer: {
    login: loginSlice,
  },
});

export default store;
