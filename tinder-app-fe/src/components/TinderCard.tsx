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

const db = [
  {
    name: "Richard Hendricks",
    photoUrl: "./img/richard.jpg",
  },
  {
    name: "Erlich Bachman",
    photoUrl: "./img/erlich.jpg",
  },
  {
    name: "Monica Hall",
    photoUrl: "./img/monica.jpg",
  },
  {
    name: "Jared Dunn",
    photoUrl: "./img/jared.jpg",
  },
  {
    name: "Dinesh Chugtai",
    photoUrl: "./img/dinesh.jpg",
  },
];

function TinderCards() {
  const [users, setUsers] = useState(db);
  const [currentIndex, setCurrentIndex] = useState<number>(db.length - 1); // Set default -1

  //   const [lastDirection, setLastDirection] = useState();
  // used for outOfFrame closure
  //   const currentIndexRef = useRef(currentIndex);

  const currentIndexRef = useRef<number>(currentIndex);

  const childRefs = useMemo<React.RefObject<API>[]>(
    () =>
      Array(db.length)
        .fill(0)
        .map(() => React.createRef<API>()),
    []
  );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canSwipe = currentIndex >= 0;

  const swipe = async (direction: Direction) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs?.[currentIndex]?.current?.swipe(direction);
    }
  };

  const onSwipe = (direction: Direction, index: number) => {
    updateCurrentIndex(index - 1);
    const newUsers = [users[0], users[1], users[2]];
    setUsers(newUsers);
  };
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  //   const handleClickOpen = (data: User[]) => {
  //     // setData(data);
  //     console.log(likeList);
  //   };

  //   const handleClose = () => {
  //     setData([]);
  //   };

  //     [dislikeList, likeList]
  //   );
  const { likeList } = useContext(UserFavList);
  if (!showChild) {
    return null;
  }
  return (
    <UserFavProvider>
      {/* <SimpleDialog data={data} onClose={handleClose} /> */}
      <Box sx={{ width: "90vw", maxWidth: 260, height: 500 }}>
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
