import { createSlice } from "@reduxjs/toolkit";
import { postSignUp } from "@/api/auth";

export interface SignUpState {
  useremail: string;
  password: string;
  phone: string;
  companyName: string;
  ceo: string;
  registration: string;
}

const initialState: SignUpState = {
  useremail: "",
  password: "",
  phone: "",
  companyName: "",
  ceo: "",
  registration: "",
};

export const signUpSlice = createSlice({
  name: "postSignUp",
  initialState,
  reducers: {
    fillEmail(state, action) {
      state.useremail = action.payload;
    },
    fillPassword(state, action) {
      state.password = action.payload;
    },
    fillPhone(state, action) {
      state.phone = action.payload;
    },
    fillCompanyName(state, action) {
      state.companyName = action.payload;
    },
    fillCeo(state, action) {
      state.ceo = action.payload;
    },
    fillRegistration(state, action) {
      state.registration = action.payload;
    },
    submitForm(state) {
      if (
        state.useremail &&
        state.password &&
        state.phone &&
        state.companyName &&
        state.ceo &&
        state.registration
      ) {
        const res = postSignUp(
          state.useremail,
          state.password,
          state.phone,
          state.companyName,
          state.ceo,
          state.registration,
        );
        console.log("res", res);
      } else {
        console.log("회원가입을 처음부터 진행해 주세요!");
      }
    },
    resetForm(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  fillEmail,
  fillPassword,
  fillPhone,
  fillCompanyName,
  fillCeo,
  fillRegistration,
  submitForm,
  resetForm,
} = signUpSlice.actions;

export default signUpSlice.reducer;
