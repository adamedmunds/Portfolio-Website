import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { generateRandomColor } from '../Resources/helperFunctions';
import { isNull } from 'lodash';

export const createUser = async (user) => {
  const postData = {
    id: user.uid,
    displayName: isNull(user.displayName) ? user.email : user.displayName,
    email: user.email,
    isVerified: user.emailVerified,
    photoURL: user.photoURL
      ? user.photoURL
      : `https://avatars.dicebear.com/api/identicon/${uuidv4()}.svg`,
    createdAt: user.metadata.createdAt,
    color: [generateRandomColor(), generateRandomColor()],
  };
  await axios.post('/api/v1/createUser', { user: postData }).then(() => {});
};
