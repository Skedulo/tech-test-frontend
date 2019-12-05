import React from 'react';

export const Header = props => (
  <header ref={props.headerRef} className={`header ${props.className || ''}`}>
    {props.children}
  </header>
);
