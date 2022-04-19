import Dialog from "@mui/material/Dialog";
import {
  DialogTitle,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import { User } from "../interfaces/User";
import { useContext, useEffect, useState } from "react";
import { getLikeUsers, getMatchUsers } from "../api/User";
import { AuthContext } from "../stores/AuthStore";

export default function SimpleDialog({
  dialogType,
  onClose,
}: {
  dialogType: number;
  onClose: () => void;
}) {
  const [data, setData] = useState<User[]>([]);
  const authStore = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      if (authStore) {
        if (dialogType === 1) {
          const data = await getLikeUsers(authStore.token);
          setData(data);
        } else if (dialogType === 2) {
          const data = await getMatchUsers(authStore.token);
          setData(data);
        }
      }
    })();
  }, [dialogType, authStore]);
  return (
    <Dialog onClose={onClose} open={dialogType > 0}>
      {dialogType === 1 && (
        <DialogTitle sx={{ textAlign: "center" }}>Like list</DialogTitle>
      )}

      {dialogType === 2 && (
        <DialogTitle sx={{ textAlign: "center" }}>Match list</DialogTitle>
      )}

      <ImageList sx={{ width: 500, height: 450, padding: 2 }}>
        {data.map((user) => (
          <ImageListItem key={user.name} sx={{ marginLeft: 2, marginRight: 2 }}>
            <img src={user.photoUrl} alt={user.name} loading="lazy" />
            <ImageListItemBar
              title={`${user.name}, ${
                new Date().getFullYear() - new Date(user.dob).getFullYear()
              }`}
              position="below"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Dialog>
  );
}
