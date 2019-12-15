import axios from 'axios';
import { GET_SLOT, NO_SLOT, GET_APPOINTMENTS } from './types';
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

export const getAppointments = () => async disptach => {
  try {
    const response = await axios.get('/api/appointment/seller');
    disptach({
      type: GET_APPOINTMENTS,
      payload: response.data
    });
  } catch (error) {
    const { data } = error.response;
    if (data && data.msg) {
      disptach(setAlert(data.msg, 'danger'));
    }
  }
};
