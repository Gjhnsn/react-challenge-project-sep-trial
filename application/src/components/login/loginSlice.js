import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SERVER_IP } from "../../private";

const INITIAL_STATE = {
  email: "",
  token: "",
};

const performLogin = async (email, password) => {
  try {
    const loginResponse = await fetch(`${SERVER_IP}/api/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
    if (loginResponse.success) {
      return {
        email: loginResponse.email,
        token: loginResponse.token,
      };
    } else {
      return { ...INITIAL_STATE };
    }
  } catch (error) {
    console.error(error);
    return { ...INITIAL_STATE };
  }
};

export const login = createAsyncThunk("login/loginStatus", performLogin);

const loginSlice = createSlice({
  name: "login",
  initialState: INITIAL_STATE,
  reducers: {
    logout: (state, action) => {
      state = { ...INITIAL_STATE };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state = { ...action.payload };
    });
  },
});

export default loginSlice.reducer;
export const { logout } = loginSlice.actions;
