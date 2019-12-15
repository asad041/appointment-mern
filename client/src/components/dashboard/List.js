import _ from 'lodash';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { getAppointments, updateStatus } from '../../store/actions';
import Alert from '../layout/Alert';
import RenderLoading from '../layout/RenderLoading';

const APPOINTMENT_STATUS = {
  requested: 'warning',
  accepted: 'primary',
  completed: 'success',
  rejected: 'danger',
  unknown: 'light'
};

const List = ({ getAppointments, appointment: { appointments, loading } }) => {
  useEffect(() => {
    getAppointments();
  }, [getAppointments]);

  return (
    <section className='section'>
      <div className='container'>
        <Alert />
        <div className='columns is-variable is-8'>
          {loading && <RenderLoading />}
        </div>
        <div className='columns is-variable is-8 is-multiline'>
          <div className='column is-12'>
            <div className='box' style={{ marginBottom: '0.3rem' }}>
              <p className='has-text-weight-bold'>
                <span className='icon'>
                  <i className='fa fa-calendar-check'></i>
                </span>
                All appointments
              </p>
              <p className='is-small has-text-grey-light'>
                To mark as 'accepted', click the pen icon
              </p>
            </div>
          </div>
          {_.map(appointments, (value, key) => (
            <div key={key} className='column is-6 is-padding-vertical-0'>
              <div className='box' style={{ marginBottom: '0.3rem' }}>
                <p>
                  <span className='icon'>
                    <i className='fa fa-file-alt'></i>
                  </span>
                  <u>{value.buyer.name}</u>
                  <span className='is-small has-text-grey'>
                    {' '}
                    ({value.buyer.email})
                  </span>
                </p>
                <p className='is-small has-text-grey-light'>
                  @{moment(value.date).format('MMMM Do YYYY, h:mm:ss a')}
                  <span
                    className={`tag is-${
                      APPOINTMENT_STATUS[value.status]
                    } is-pulled-right`}
                  >
                    {value.status}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

List.propTypes = {
  appointment: PropTypes.object.isRequired,
  getAppointments: PropTypes.func.isRequired,
  updateStatus: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  appointment: state.appointment
});

export default connect(mapStateToProps, { getAppointments, updateStatus })(
  List
);
