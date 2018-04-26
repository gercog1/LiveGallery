import { login } from '../LoginPage/reducers';
import { addPhoto, profilePosts } from '../UserPage/reducer';
import { postComments, onePhoto} from '../SinglePhoto/reducer';
import { userList} from '../UserList/reducer';
import { randomPosts, randomUser} from '../RandomUser/reducer';
import { allPosts} from "../Home/reducer";

export const reducers = {
  login,
  addPhoto,
  profilePosts,
  postComments,
  userList,
  randomPosts,
  randomUser,
  allPosts,
  onePhoto
};

