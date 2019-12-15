import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import alert from './alert';
import auth from './auth';
import appointment from './appointment';

export default combineReducers({
  form,
  alert,
  auth,
  appointment
});
