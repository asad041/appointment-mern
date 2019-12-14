import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './auth';

export default combineReducers({
  form,
  auth
});
