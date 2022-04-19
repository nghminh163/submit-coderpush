import styled from "@emotion/styled";
import { Direction } from "../interfaces/TinderCard";
import { API } from "../interfaces/TinderCard";
import { User } from "../interfaces/User";
import TinderSwipeCard from "react-tinder-card";
import { useCallback, useContext, useMemo } from "react";
import { TypeList, UserFavList } from "../stores/userFavList";

const Card = styled("div")({
  position: "relative",
  backgroundColor: "#fff",
  width: "80vw",
  maxWidth: "260px",
  height: "500px",
  boxShadow: "0px 0px 60px 0px rgba(0, 0, 0, 0.3)",
  borderRadius: "20px",
  backgroundSize: "cover",
  backgroundPosition: "center",
  "> h3": {
    position: "absolute",
    bottom: 0,
    margin: 10,
    color: "#fff",
  },
});

function TinderPersonCard({
  refChild,
  user,
  onSwipe,
  idx,
}: {
  refChild: React.RefObject<API>;
  user: User;
  onSwipe: (direction: Direction, index: number) => void;
  idx: number;
}) {
  const { appendToList, likeList } = useContext(UserFavList);

  const outOfFrame = useCallback(
    (direction: Direction) => {
      if (appendToList) {
        appendToList(
          user,
          direction === "left" ? TypeList.DISLIKE : TypeList.LIKE
        );
      }
    },
    [appendToList, user]
  );
  const age = useMemo(
    () => new Date().getFullYear() - new Date(user.dob).getFullYear(),
    [user.dob]
  );
  return (
    <TinderSwipeCard
      ref={refChild}
      className="swipe"
      key={user.name}
      onSwipe={(direction: Direction) => onSwipe(direction, idx)}
      onCardLeftScreen={(direction: Direction) => outOfFrame(direction)}
      preventSwipe={["up", "down"]}
    >
      <Card
        style={{
          backgroundImage: user.photoUrl && `url(${user.photoUrl})`,
        }}
      >
        <h3>
          {user.name}, {age}
        </h3>
      </Card>
    </TinderSwipeCard>
  );
}

export default TinderPersonCard;
