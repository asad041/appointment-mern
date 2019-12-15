import _ from 'lodash';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAppointments } from '../../store/actions';
import Slot from './Slot';

const Index = ({ getAppointments, appointment: { appointments } }) => {
  useEffect(() => {
    getAppointments();
  }, [getAppointments]);
  return (
    <section className='section'>
      <div className='container'>
        <div className='columns is-variable is-8'>
          <Slot />
        </div>
        <div className='columns is-variable is-8'>
          <div className='column is-6'>
            {_.map(appointments, (value, key) => (
              <div key={key} className='box' style={{ marginBottom: '0.3rem' }}>
                {value.status}
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
  getAppointments: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  appointment: state.appointment
});

export default connect(mapStateToProps, { getAppointments })(Index);
