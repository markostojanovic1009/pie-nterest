import { combineReducers } from 'redux';
import messages from './messages';
import auth from './auth';
import images from './images_reducers';

export default combineReducers({
  messages,
  auth,
  images
});
