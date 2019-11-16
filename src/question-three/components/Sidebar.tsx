import React from 'react'
import './Sidebar.css'

type SidebarProps = {
  className: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) =>
  <div className={`sidebar ${className}`}>
    <div className="sidebar__item"/>
    <div className="sidebar__item"/>
    <div className="sidebar__item"/>
    <div className="sidebar__item"/>
    <div className="sidebar__item"/>
    <div className="sidebar__item"/>
  </div>

export default Sidebar
