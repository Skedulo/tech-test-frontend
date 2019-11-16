import React from 'react'

import './Header.css'

type HeaderProps = {
  className: string;
}

const Header: React.FC<HeaderProps> = ({ className }) =>
  <div className={`header ${className}`}>Header</div>

export default Header
