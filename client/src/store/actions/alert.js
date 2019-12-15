import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './index';

export const setAlert = (message, type, timeout = 5000) => dispatch => {
  const id = uuid.v4();

  dispatch({
    type: SET_ALERT,
    payload: { message, type, id }
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
