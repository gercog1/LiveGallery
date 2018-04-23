import { login } from '../LoginPage/reducers';
import { addPhoto, profilePosts } from '../UserPage/reducer';
import { postComments} from '../SinglePhoto/reducer';
import { userList} from '../UserList/reducer';
import { randomPosts, randomUser} from '../RandomUser/reducer';

export const reducers = {
  login,
  addPhoto,
  profilePosts,
  postComments,
  userList,
  randomPosts,
    randomUser
};

