import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser, LoginUserType } from "../../service/api.service";

export const loginAction = createAsyncThunk(
  "user/Login",
  async (user: LoginUserType) => {
    const result = await loginUser(user);
    return result;
  }
);

const LoginSlice = createSlice({
  name: "login",
  initialState: {
    logged: false,
    user: {} as any
  },
  reducers: {
    doLogin: () => {
      return {
        logged: false,
        user: {} as any
      };
    }
  },
  extraReducers(builder) {
    builder.addCase(loginAction.fulfilled, (state, action) => {
      return {
        logged: true,
        user: action.payload.data
      };
    });
  }
});

export const { doLogin } = LoginSlice.actions;
export default LoginSlice.reducer;
