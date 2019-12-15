import _ from 'lodash';
import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { getAppointments, updateStatus } from '../../store/actions';
import Slot from './Slot';
import Alert from '../layout/Alert';
import RenderLoading from '../layout/RenderLoading';

const Index = ({
  getAppointments,
  appointment: { appointments },
  updateStatus
}) => {
  const [requestedApp, setRequestedApp] = useState([]);
  const [acceptedApp, setAcceptedApp] = useState([]);
  const [updating, setUpdating] = useState();

  useEffect(() => {
    getAppointments();
  }, [getAppointments]);

  useEffect(() => {
    if (appointments !== null && appointments.length > 0) {
      let updatedRequestedApp = [];
      let updatedAcceptedApp = [];
      _.map(appointments, value => {
        if (value.status === 'requested') {
          updatedRequestedApp.push(value);
        } else if (value.status === 'accepted') {
          updatedAcceptedApp.push(value);
        }
      });

      setUpdating();
      setRequestedApp(updatedRequestedApp);
      setAcceptedApp(updatedAcceptedApp);
    }
  }, [appointments]);

  const statusHandler = (id, status) => {
    const values = { id, status };
    setUpdating(id);
    updateStatus(values);
  };

  return (
    <section className='section'>
      <div className='container'>
        <Alert />
        <div className='columns is-variable is-8'>
          <Slot availableSlots={acceptedApp.length} />
        </div>
        <div className='columns is-variable is-8'>
          <div className='column is-6'>
            <div className='box' style={{ marginBottom: '0.3rem' }}>
              <p className='has-text-weight-bold'>
                <span className='icon'>
                  <i className='fa fa-bell'></i>
                </span>
                Appointment requests
              </p>
              <p className='is-small has-text-grey-light'>
                To mark as 'accepted', click the pen icon
              </p>
            </div>
            {_.map(requestedApp, (value, key) => (
              <div key={key} className='box' style={{ marginBottom: '0.3rem' }}>
                {updating === value._id ? (
                  <RenderLoading />
                ) : (
                  <Fragment>
                    <p>
                      <span className='icon'>
                        <i className='fa fa-file-alt'></i>
                      </span>
                      <u>{value.buyer.name}</u> has{' '}
                      <span className='tag is-warning'>{value.status}</span> for
                      a slot
                      <span className='is-pulled-right is-grouped'>
                        <button
                          onClick={() => statusHandler(value._id, 'accepted')}
                          className='button is-text is-small has-icons'
                        >
                          <span className='icon'>
                            <i className='fa fa-pen'></i>
                          </span>
                        </button>
                        <button
                          onClick={() => statusHandler(value._id, 'rejected')}
                          className='button is-text is-small has-icons'
                        >
                          <span className='icon'>
                            <i className='fa fa-times'></i>
                          </span>
                        </button>
                      </span>
                    </p>
                    <p className='is-small has-text-grey-light'>
                      @{moment(value.date).format('MMMM Do YYYY, h:mm:ss a')}
                    </p>
                  </Fragment>
                )}
              </div>
            ))}
          </div>
          <div className='column is-6'>
            <div className='box' style={{ marginBottom: '0.3rem' }}>
              <p className='has-text-weight-bold'>
                <span className='icon'>
                  <i className='fa fa-calendar-check'></i>
                </span>
                Accepted appointments
              </p>
              <p className='is-small has-text-grey-light'>
                To mark as 'completed', click the check icon
              </p>
            </div>
            {_.map(acceptedApp, (value, key) => (
              <div key={key} className='box' style={{ marginBottom: '0.3rem' }}>
                {updating === value._id ? (
                  <RenderLoading />
                ) : (
                  <Fragment>
                    <p>
                      <span className='icon'>
                        <i className='fa fa-pen'></i>
                      </span>
                      <u>{value.buyer.name}</u> request has{' '}
                      <span className='tag is-primary'>{value.status}</span> and
                      is in progress
                      <span className='is-pulled-right is-grouped'>
                        <button
                          onClick={() => statusHandler(value._id, 'completed')}
                          className='button is-text is-small has-icons'
                        >
                          <span className='icon'>
                            <i className='fa fa-check'></i>
                          </span>
                        </button>
                      </span>
                    </p>
                    <p className='is-small has-text-grey-light'>
                      @{moment(value.date).format('MMMM Do YYYY, h:mm:ss a')}
                    </p>
                  </Fragment>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

Index.propTypes = {
  appointment: PropTypes.object.isRequired,
  getAppointments: PropTypes.func.isRequired,
  updateStatus: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  appointment: state.appointment
});

export default connect(mapStateToProps, { getAppointments, updateStatus })(
  Index
);
