import axios from "axios";
import { User } from "../interfaces/User";
import { Response } from "../interfaces/Response";

export const getUsers = async (token) => {
  // Pass token for ignore self
  try {
    const userRes = await axios.get<Response<User[]>>(
      "/api/users",
      {
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
    return userRes.data.data;
  } catch (e) {
    return [];
  }
};

export const getLikeUsers = async (token) => {
  // Pass token for ignore self
  try {
    const userRes = await axios.get<Response<User[]>>(
      "/api/users/like",
      {
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
    return userRes.data.data;
  } catch (e) {
    return [];
  }
};

export const getMatchUsers = async (token) => {
  // Pass token for ignore self
  try {
    const userRes = await axios.get<Response<User[]>>(
      "/api/users/match",
      {
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
    return userRes.data.data;
  } catch (e) {
    return [];
  }
};
