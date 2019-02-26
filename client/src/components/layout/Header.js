import React, { Component } from 'react';
import { link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';


class Header extends Component {
    render() {
        
        const { isAuthenticated, user } = this.props.auth;
        
        const userInfo = (
            <div className="header-user">
                <div className="user-info">
                    <a className="user-toggle">
                        <div className="user-profile"><i className="fas fa-user-circle"></i></div>
                        <div className="user-desc">
                            <div className="user-name">{user.name}</div>
                            <div className="user-role">{user.role}</div>
                        </div>
                    </a>
                </div>
            </div>
        );
    return (
        <header id="header" className="bg-primary-blue text-white py-3">
            <div className="header-sidebar"></div>
            <div className="header-title">
                <div>
                    <button className="menu-btn"><i className="menu-icon fas fa-bars"></i></button>
                    <span className="app-name">Phone Call Distributor</span>
                </div>
            </div>
            { isAuthenticated ? userInfo : '' }
        </header>
    )
    }
}

Header.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(Header);