import type { AxiosResponse } from "axios";
import { AxiosError } from "axios";
import { client } from "./axios";

client.interceptors.request.use((config) => {
  const { accessToken, refreshToken } = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root")!).auth,
  );
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// 로그인
export const postSignIn = async (useremail: string, password: string) => {
  try {
    const { data }: AxiosResponse = await client.post("/auth/login", {
      memberEmail: useremail,
      password,
    });
    localStorage.clear();
    if (data.state === 200) {
      localStorage.setItem("token", data.data.accessToken);
    }
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("로그인 api 에러", error);
    }
  }
};

// 로그아웃
export const postLogout = async () => {
  try {
    const { data }: AxiosResponse = await client.post("/auth/logout", {});
    if (data.state === 200) {
      localStorage.removeItem("token");
    }
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("로그아웃 api 에러", error);
    }
  }
};

//회원가입
export const postSignUp = async (
  useremail: string,
  password: string,
  phone: string,
  companyName: string,
  ceo: string,
  registration: string,
) => {
  try {
    const { data }: AxiosResponse = await client.post("/auth/signup", {
      memberEmail: useremail,
      password,
      memberPhone: phone,
      companyNum: registration,
      companyName,
      ceoName: ceo,
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("회원가입 api 에러", error);
    }
  }
};

// 아이디 중복체크
export const postEmailCheck = async (useremail: string) => {
  const { data }: AxiosResponse = await client.post("/auth/email_validation", {
    memberEmail: useremail,
  });
  return data;
};

// 인증코드 발송
export const getSendCode = async (useremail: string) => {
  const { data }: AxiosResponse = await client.get(
    `/auth/number?memberEmail=${useremail}`,
  );
  return data;
};

// 인증코드 확인
export const getConfirmCode = async (useremail: string, code: number) => {
  const { data }: AxiosResponse = await client.post("/auth/number", {
    memberEmail: useremail,
    authNumber: code,
  });
  return data;
};

// 비밀번호 변경
export const putResetPassword = async (
  useremail: string,
  password: string,
  confirmPassword: string,
) => {
  try {
    const { data }: AxiosResponse = await client.put("/auth/reset_password", {
      memberEmail: useremail,
      newPassword: password,
      passwordCheck: confirmPassword,
    });

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("비밀번호 변경 api 에러", error);
    }
  }
};
