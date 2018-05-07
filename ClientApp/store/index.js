import { login } from '../LoginPage/reducers';

import { postComments, onePhoto} from '../SinglePhoto/reducer';
import { userList} from '../UserList/reducer';
import { randomPosts, randomUser, addPhoto} from '../RandomUser/reducer';
import { allPosts} from "../Home/reducer";
import { followers, following} from "../RandomUser/reducer";
import { userProfile} from "../UserPage/reducer";

export const reducers = {
  login,
  addPhoto,
  postComments,
  userList,
  randomPosts,
  randomUser,
  allPosts,
  onePhoto,
  followers,
  following,
  userProfile,
};

