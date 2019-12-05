import React from 'react';

import LoadingImage from './loading.gif';

import './Loading.css';

export const Loading = props => (
  <div className={`loading ${props.className || ''}`}>
    <img src={LoadingImage} alt="Loading"></img>
  </div>
);
