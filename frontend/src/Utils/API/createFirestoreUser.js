import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const createFirestoreUser = async (user) => {
  const postData = {
    id: user.uid,
    displayName: user.displayName,
    email: user.email,
    isVerified: user.emailVerified,
    photoURL: user.photoURL
      ? user.photoURL
      : `https://avatars.dicebear.com/api/identicon/${uuidv4()}.svg`,
    createdAt: user.metadata.createdAt,
  };
  await axios.post("/api/v1/createUser", { user: postData }).then(() => {});
};
