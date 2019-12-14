import React from 'react';
import PropTypes from 'prop-types';

const SubmitButton = ({ submitting, valid, text = 'Submit' }) => {
  return (
    <div className='field is-grouped'>
      <div className='control'>
        {submitting ? (
          <button className='button is-primary is-loading'>Loading...</button>
        ) : (
          <button
            type='submit'
            className='button is-primary'
            disabled={submitting || !valid}
          >
            {text}
          </button>
        )}
      </div>
    </div>
  );
};

SubmitButton.propTypes = {
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  text: PropTypes.string
};

export default SubmitButton;
