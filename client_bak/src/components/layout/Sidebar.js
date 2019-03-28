import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Sidebar extends Component {
    constructor() {
        super();
        this.state = {}
    }
    render() {
        const { isAuthenticated, user } = this.props.auth;
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
  
}

Sidebar.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Sidebar);
