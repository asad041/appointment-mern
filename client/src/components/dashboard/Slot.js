import _ from 'lodash';
import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { getSlot } from '../../store/actions';
import { SLOT_FIELDS } from '../helper/fields';
import { validate } from '../helper/validator';
import { inputFieldWithIcon } from '../layout/FormFields';
import RenderLoading from '../layout/RenderLoading';
import SubmitButton from '../layout/SubmitButton';

const Slot = ({
  getSlot,
  appointment: { loading, slot },
  handleSubmit,
  submitting,
  valid
}) => {
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    getSlot();
  }, [getSlot]);

  const editHandler = () => {
    setEdit(true);
  };

  const cancelHandler = () => {
    setEdit(false);
  };

  return (
    <Fragment>
      {loading && <RenderLoading />}
      <div className='column'>
        {slot && slot !== null && (
          <div className='message is-dark'>
            <div className='message-body'>
              <p style={{ marginBottom: '5px' }}>
                <strong>
                  <span className='icon'>
                    <i className='fa fa-cog'></i>
                  </span>{' '}
                  Configurations
                </strong>{' '}
                <span className='is-pulled-right'>
                  {!edit ? (
                    <button
                      onClick={editHandler}
                      className='button is-text is-small'
                    >
                      <span className='icon'>
                        <i className='fa fa-pen'></i>
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={cancelHandler}
                      className='button is-text is-small'
                    >
                      <span className='icon'>
                        <i className='fa fa-times'></i>
                      </span>
                    </button>
                  )}
                </span>
              </p>
              {!edit ? (
                <Fragment>
                  <p>
                    <span>Available slots: NA</span>
                    <span className='is-pulled-right'>
                      Total Slots: {slot.total}
                    </span>
                  </p>
                  <p className='has-text-grey is-small'>{slot.description}</p>
                </Fragment>
              ) : (
                <form onSubmit={handleSubmit}>
                  {_.map(SLOT_FIELDS, (value, key) => (
                    <Field
                      key={key}
                      type={value.type}
                      name={key}
                      placeholder={value.placeholder}
                      icon={value.icon}
                      required={value.required}
                      component={inputFieldWithIcon}
                    />
                  ))}
                  <SubmitButton
                    text='Save changes'
                    valid={valid}
                    submitting={submitting}
                  />
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

Slot.propTypes = {
  getSlot: PropTypes.func.isRequired,
  appointment: PropTypes.object.isRequired
};

const SlotWithReduxForm = reduxForm({
  form: 'slot',
  Fields: _.keys(SLOT_FIELDS),
  fieldsRules: SLOT_FIELDS,
  validate
})(Slot);

const mapStateToProps = state => ({
  appointment: state.appointment,
  initialValues: state.appointment.slot
});

export default connect(mapStateToProps, { getSlot })(SlotWithReduxForm);
