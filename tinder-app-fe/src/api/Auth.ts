import axios from "axios";
import { Response } from "../interfaces/Response";
import { User } from "../interfaces/User";

export const getAuthUser = async () => {
  try {
    const userRes = await axios.post<
      Response<{
        user: User;
        token: string;
      }>
    >("/api/auth/login");
    return userRes.data.data;
  } catch (e) {
    return null;
  }
};

export const getMe = async (token: string) => {
  try {
    const userRes = await axios.post<
      Response<{
        user: User;
      }>
    >(
      "/api/auth/me",
      {},
      {
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
    return userRes.data.data.user;
  } catch (e) {
    return null;
  }
};

export const likeReq = async (token: string, partnerId: number) => {
  try {
    const userRes = await axios.post<
      Response<{
        isMatch: boolean;
      }>
    >(
      "/api/users/like",
      { partnerId },
      {
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
    return userRes.data.data.isMatch;
  } catch (e) {
    return null;
  }
};
