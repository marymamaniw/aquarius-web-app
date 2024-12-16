import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  username: string | null;
}

const initialState: AuthState = {
  token: null,
  refreshToken: null,
  username: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.username = action.payload.username;
    },
    clearCredentials: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.username = null;
    },
    updateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { setCredentials, clearCredentials, updateToken } = authSlice.actions;
export default authSlice.reducer;
