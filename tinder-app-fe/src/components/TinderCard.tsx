import { Fab, listClasses } from "@mui/material";
import { Box, styled } from "@mui/system";
import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { API, Direction } from "../interfaces/TinderCard";
import { User } from "../interfaces/User";
import LoveIcon from "@mui/icons-material/Favorite";
import SimpleDialog from "./DialogList";
import TinderPersonCard from "./TinderPersonCard";
import UserFavProvider, { UserFavList } from "../stores/userFavList";
import { getUsers } from "../api/User";

function TinderCards() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      const _users = await getUsers();
      setUsers(_users);
      setShowChild(true);
    })();
  }, []);
  const [currentIndex, setCurrentIndex] = useState<number>(users.length - 1); // Set default -1

  const currentIndexRef = useRef<number>(currentIndex);

  const childRefs = useMemo<React.RefObject<API>[]>(
    () =>
      Array(users.length)
        .fill(0)
        .map(() => React.createRef<API>()),
    []
  );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const onSwipe = (direction: Direction, index: number) => {
    updateCurrentIndex(index - 1);
  };
  const [showChild, setShowChild] = useState(false);

  if (!showChild) {
    return null;
  }

  return (
    <UserFavProvider>
      {/* <SimpleDialog data={data} onClose={handleClose} /> */}
      <Box sx={{ width: "90vw", maxWidth: 260, height: 500 }}>
        {currentIndex === -1 && <p>Empty</p>}
        {users.map((user, i) => (
          <TinderPersonCard
            refChild={childRefs[i]}
            idx={i}
            onSwipe={onSwipe}
            user={user}
            key={`tinder_card_${i}`}
          />
        ))}
      </Box>

      <Box sx={{ marginTop: 4 }}>
        {/* <Fab
          aria-label="fav"
          size="medium"
          onClick={() => handleClickOpen(likeList)}
        >
          <LoveIcon />
        </Fab>
        <Fab aria-label="fav" size="medium" onClick={() => setLikeList([123])}>
          <LoveIcon />
        </Fab> */}
      </Box>
    </UserFavProvider>
  );
}

export default TinderCards;