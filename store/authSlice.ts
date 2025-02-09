import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: { uid: string; email: string | null; displayName: string | null; accessToken: string; providerData: any[] } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<AuthState["user"]>) => {
      // console.log("✅ Serialized Payload →", action.payload);
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserEmail: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.email = action.payload;
      }
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { loginStart, loginSuccess, updateUserEmail, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
