import swal from 'sweetalert';

import { userConstants } from './constants';
import {userService} from "./services";

const setDescription = description => ({ type: userConstants.SET_ADD_PHOTO_DESCRIPTION, description });
const setFile = file => ({ type: userConstants.SET_ADD_PHOTO_FILE, file });

const addPhoto = () => (dispatch, getState) => {
  const { addPhoto: { description, file }} = getState();
  userService.addPhoto(description, file)
    .then(response => {
      swal('success', '', 'error');
    })
    .catch(error => {

      swal(error.message, '', 'error');
    });
};

const actions = {
  setDescription,
  setFile,
  addPhoto
};

export default actions;