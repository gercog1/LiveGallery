import { listConstants} from './constants';

const initialStatePostComments = {
  isLoadedList: false,
  users: []
};

export const userList = (state = initialStatePostComments , action) => {
  switch (action.type) {
  case listConstants.GET_USERS_REQUEST:
    return {
      ...state,
    };
  case listConstants.GET_USERS_SUCCESS:
    return {
      ...state,
      users: action.users,
      isLoadedList: true,
    };
  case listConstants.GET_USERS_FAILURE:
    return {};
  default:
    return state;
  }
};

