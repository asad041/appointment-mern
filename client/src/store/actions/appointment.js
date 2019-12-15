import axios from 'axios';
import {
  GET_SLOT,
  SAVE_SLOT,
  NO_SLOT,
  GET_APPOINTMENTS,
  UPDATE_APPOINTMENT
} from './types';
import { setAlert } from './alert';

export const getSlot = () => async disptach => {
  try {
    const response = await axios.get('/api/slots/me');
    disptach({
      type: GET_SLOT,
      payload: response.data
    });
  } catch (error) {
    const { data } = error.response;
    if (data && data.msg) {
      disptach(setAlert(data.msg, 'danger'));
    }
    disptach({
      type: NO_SLOT
    });
  }
};

export const saveSlot = values => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify(values);
    const response = await axios.post('/api/slots', body, config);
    dispatch({
      type: SAVE_SLOT,
      payload: response.data
    });
  } catch (error) {
    const { data } = error.response;
    if (data && data.msg) {
      dispatch(setAlert(data.msg, 'danger'));
    }
    dispatch({
      type: NO_SLOT
    });
  }
};

export const getAppointments = () => async dispatch => {
  try {
    const response = await axios.get('/api/appointment/seller');
    dispatch({
      type: GET_APPOINTMENTS,
      payload: response.data
    });
  } catch (error) {
    const { data } = error.response;
    if (data && data.msg) {
      dispatch(setAlert(data.msg, 'danger'));
    }
  }
};

export const updateStatus = values => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify(values);
    const response = await axios.put('/api/appointment/update', body, config);
    dispatch({
      type: UPDATE_APPOINTMENT,
      payload: response.data
    });
  } catch (error) {
    const { data } = error.response;
    if (data && data.msg) {
      dispatch(setAlert(data.msg, 'danger'));
    } else {
      dispatch(setAlert(error.message, 'danger'));
    }
  }
};
