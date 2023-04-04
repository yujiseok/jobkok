import type { AxiosResponse } from "axios";
import { auth } from "./axios";

export const postSignIn = async (useremail: string, password: string) => {
  try {
    const { data }: AxiosResponse = await auth({
      // post 확인 후 수정 필요
      method: "GET",
      url: "auth/login",
      data: {
        memberEmail: useremail,
        password,
      },
    });
    localStorage.clear();
    if (data.message === "로그인에 성공했습니다.") {
      localStorage.setItem("token", data.data.accessToken);
    }
    return data;
  } catch (error: any) {
    console.log("로그인 api 에러", error);
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
  } catch (error: any) {
    console.log("로그아웃 api 에러", error);
  }
};
