import type { AxiosResponse } from "axios";
import type { User } from "@pages/SignIn";
import { client } from "./axios";

// 어려워욤.. 모르겠어욤..
export const postSignIn = async () => {
  try {
    const { data }: AxiosResponse<User> = await client({
      method: "POST",
      url: "auth/login",
    });
    return data;
  } catch (error: any) {
    console.log("로그인 api 에러", error.message);
  }
};
