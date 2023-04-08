import type { AxiosResponse } from "axios";
import { AxiosError } from "axios";
import { client } from "./axios";

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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

// 아이디 중복체크 get / post 확인 필요!
export const postEmailCheck = async (useremail: string) => {
  const { data }: AxiosResponse = await client({
    method: "GET",
    url: "/auth/email_validation",
    data: { memberEmail: useremail },
  });
  return data;
};

// 인증코드 발송
export const getSendCode = async (useremail: string) => {
  try {
    const { data }: AxiosResponse = await client.get(
      `/auth/number?memberEmail=${useremail}`,
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

// 인증코드 확인
export const getConfirmCode = async (useremail: string, code: number) => {
  const { data }: AxiosResponse = await client({
    method: "GET",
    url: "/auth/code",
    data: { memberEmail: useremail, code },
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
