import React from 'react';

export default function Sidebar() {
  return (
    <div id="sidebar">
        <nav id="sidebar-nav">
            <ul className="list-unstyled">
                <li><a href="/"><i className="fas fa-tachometer-alt"></i> <span>Dashboard</span></a></li>
                <li><a href="/reaches"><i className="fas fa-user-edit"></i> <span>Reaches</span></a></li>
                <li><a href="/users"><i className="fas fa-user-friends"></i> <span>Users</span></a></li>
            </ul>
        </nav>
    </div>
  )
}
