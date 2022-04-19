import { Fab } from "@mui/material";
import { Box } from "@mui/system";
import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { API, Direction } from "../interfaces/TinderCard";
import { User } from "../interfaces/User";
import LoveIcon from "@mui/icons-material/Favorite";
import SimpleDialog from "./DialogList";
import TinderPersonCard from "./TinderPersonCard";
import UserFavProvider, { UserFavList } from "../stores/userFavList";
import { getUsers } from "../api/User";
import { AuthContext } from "../stores/AuthStore";
import { likeReq } from "../api/Auth";
import { toast } from "react-toastify";
import StarIcon from "@mui/icons-material/Star";

function TinderCards() {
  const [users, setUsers] = useState<User[]>([]);
  const authStore = useContext(AuthContext);
  useEffect(() => {
    (async () => {
      if (authStore?.token) {
        const _users = await getUsers(authStore?.token);
        setUsers(_users);
        setShowChild(true);
      }
    })();
  }, [authStore?.token]);
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

  const onSwipe = async (direction: Direction, index: number) => {
    updateCurrentIndex(index - 1);

    if (direction === "left") {
      toast.info("Not feel? 🥺", {
        position: "top-right",
        autoClose: 1000,
      });
    } else if (direction === "right") {
      if (authStore) {
        const isMatch = await likeReq(authStore.token, users[index].id);
        if (isMatch) {
          toast.success("New match !!", {
            position: "top-right",
            autoClose: 1000,
          });
        } else {
          toast.success("Like this? ❤️", {
            position: "top-right",
            autoClose: 1000,
          });
        }
      }
    }
  };
  const [showChild, setShowChild] = useState(false);
  const [openDialog, setOpenDialog] = useState<number>(0);

  if (!showChild) {
    return null;
  }

  const onChangeDialog = (type: number) => {
    setOpenDialog(type);
  };

  return (
    <UserFavProvider>
      <SimpleDialog dialogType={openDialog} onClose={() => onChangeDialog(0)} />
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

      <Box
        sx={{ marginTop: 4, width: "100%" }}
        flexDirection="row"
        justifyContent={"space-around"}
      >
        <Fab aria-label="fav" size="medium" onClick={() => onChangeDialog(1)}>
          <LoveIcon />
        </Fab>
        <Fab aria-label="fav" size="medium" onClick={() => onChangeDialog(2)}>
          <StarIcon />
        </Fab>
      </Box>
    </UserFavProvider>
  );
}

export default TinderCards;
