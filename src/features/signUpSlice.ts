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
  name: "signUp",
  initialState,
  reducers: {
    fillEmail(state, action) {
      const content = action.payload;
      state.useremail = content;
    },
    fillPassword(state, action) {
      const content = action.payload;
      state.password = content;
    },
    fillPhone(state, action) {
      const content = action.payload;
      state.phone = content;
    },
    fillCompanyName(state, action) {
      const content = action.payload;
      state.companyName = content;
    },
    fillCeo(state, action) {
      const content = action.payload;
      state.ceo = content;
    },
    fillRegistration(state, action) {
      const content = action.payload;
      state.registration = content;
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
