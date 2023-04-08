import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface InitialState {
  accessToken: string;
  ceoName: string;
  companyName: string;
  companyNum: string;
  memberEmail: string;
  memberPhone: string;
  refreshToken: string;
  refreshTokenExpirationTime: number;
}

const initialState: InitialState = {
  accessToken: "",
  ceoName: "",
  companyName: "",
  companyNum: "",
  memberEmail: "",
  memberPhone: "",
  refreshToken: "",
  refreshTokenExpirationTime: 0,
};

export const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    signIn: (state, action: PayloadAction<InitialState>) => {
      return { ...state, ...action.payload };
    },
    signOut: () => initialState,
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
