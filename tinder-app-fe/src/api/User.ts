import axios from "axios";
import { User } from "../interfaces/User";
import { Response } from "../interfaces/Response";

export const getUsers = async (token) => {
  // Pass token for ignore self
  try {
    const userRes = await axios.get<Response<User[]>>(
      "http://localhost:3001/users",
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
      "http://localhost:3001/users/like",
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
      "http://localhost:3001/users/match",
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