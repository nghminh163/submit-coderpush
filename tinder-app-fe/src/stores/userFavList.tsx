import React, { createContext, useEffect, useState, useCallback } from "react";
import { User } from "../interfaces/User";

export enum TypeList {
  LIKE = "LIKE",
  DISLIKE = "DISLIKE",
}

export const UserFavList = createContext<{
  likeList: User[];
  dislikeList: User[];
  appendToList?: (user: User, type: TypeList) => void;
}>({
  likeList: [],
  dislikeList: [],
});

const UserFavProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [likeList, setLikeList] = useState<User[]>([]);
  const [dislikeList, setDislikeList] = useState<User[]>([]);
  const appendToList = useCallback(
    (user: User, type: TypeList) => {
      if (type === TypeList.LIKE) {
        setLikeList([...likeList, user]);
      } else if (type === TypeList.DISLIKE) {
        setDislikeList([...dislikeList, user]);
      }
    },
    [likeList, dislikeList]
  );

  return (
    <UserFavList.Provider value={{ likeList, appendToList, dislikeList }}>
      {children}
    </UserFavList.Provider>
  );
};

export default UserFavProvider;
