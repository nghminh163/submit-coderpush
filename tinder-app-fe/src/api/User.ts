import axios from "axios";
import { User } from "../interfaces/User";
import { Response } from "../interfaces/Response";

export const getUsers = async () => {
  try {
    const userRes = await axios.get<Response<User[]>>(
      "http://localhost:3001/users"
    );
    return userRes.data.data;
  } catch (e) {
    return [];
  }
};
