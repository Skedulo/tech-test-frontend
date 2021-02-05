import React from 'react';

const enhance = (WrappedComp) => (props) => {
  return <WrappedComp {...props} />;
};

export default enhance;
