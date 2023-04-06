import type { AxiosResponse } from "axios";
import { AxiosError } from "axios";
import { auth } from "./axios";

export const postSignIn = async (useremail: string, password: string) => {
  try {
    const { data }: AxiosResponse = await auth({
      method: "POST",
      url: "auth/login",
      data: {
        memberEmail: useremail,
        password,
      },
    });
    localStorage.clear();
    if (data.status === "로그인에 성공했습니다.") {
      localStorage.setItem("token", data.data.accessToken);
    }
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("로그인 api 에러", error);
    }
  }
};

export const postLogout = async () => {
  try {
    const { data }: AxiosResponse = await auth({
      method: "POST",
      url: "auth/logout",
    });
    if (data.message === "로그아웃 되었습니다.") {
      localStorage.removeItem("token");
    }
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("로그아웃 api 에러", error);
    }
  }
};

export const postSignUp = async (
  useremail: string,
  password: string,
  phone: string,
  companyName: string,
  ceo: string,
  registration: string,
) => {
  try {
    const { data }: AxiosResponse = await auth({
      method: "POST",
      url: "auth/signup",
      data: {
        memberEmail: useremail,
        password,
        memberPhone: phone,
        companyNum: registration,
        companyName,
        ceoName: ceo,
      },
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("회원가입 api 에러", error);
    }
  }
};

// 아이디 중복체크 get / post 확인 필요!
export const postEmailCheck = async (useremail: string) => {
  try {
    const { data }: AxiosResponse = await auth({
      method: "GET",
      url: "auth/email_validation",
      data: {
        memberEmail: useremail,
      },
    });
    // 성공 data.message : 중복된 이메일이 존재하지 않습니다.
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("이메일 중복확인 api 에러", error);
    }
  }
};

// 비밀번호 변경
export const putResetPassword = async (
  useremail: string,
  password: string,
  confirmPassword: string,
) => {
  try {
    const { data }: AxiosResponse = await auth({
      method: "PUT",
      url: "auth/reset_password",
      data: {
        memberEmail: useremail,
        newPassword: password,
        passwordCheck: confirmPassword,
      },
    });
    // 성공 data.message: 비밀번호를 변경하였습니다
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("비밀번호 변경 api 에러", error);
    }
  }
};
