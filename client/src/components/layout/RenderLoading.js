import React from 'react';
import PropTypes from 'prop-types';

const RenderLoading = ({ text }) => {
  let contents = (
    <div className='has-margin-top-10'>
      <div className='loader-wrapper'>
        <div className='loader is-loading'></div>
      </div>
      {text && <p className='has-text-grey-light has-text-centered'>{text}</p>}
    </div>
  );

  return contents;
};

RenderLoading.propTypes = {
  text: PropTypes.string
};

export default RenderLoading;
