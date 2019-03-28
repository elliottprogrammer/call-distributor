import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { logoutUser } from '../../actions/authActions';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      dropdownOpen: false,
    };
    this.handleUserDropdown = this.handleUserDropdown.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleUserDropdown(e) {
    e.preventDefault();
    const { dropdownOpen } = this.state;
    this.setState({ dropdownOpen: !dropdownOpen });
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.logoutUser();
    window.location.href = '/login';
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    return (
      <header id="header" className="bg-primary-blue text-white py-3">
        <div className="header-sidebar" />
        <div className="header-title">
          <div>
            <button className="menu-btn">
              <i className="menu-icon fas fa-bars" />
            </button>
            <span className="app-name">Phone Call Distributor</span>
          </div>
        </div>
        {isAuthenticated && (
          <div className="header-user">
            <div className="user-info">
              <a
                href="#"
                className="user-toggle"
                onClick={this.handleUserDropdown}
              >
                <div className="user-profile">
                  <i className="fas fa-user-circle" />
                </div>
                <div className="user-desc">
                  <div className="user-name">{user.name}</div>
                  <div className="user-role">{user.role}</div>
                </div>
              </a>
              <div
                className={classnames('user-dropdown dropdown-menu', {
                  show: this.state.dropdownOpen,
                })}
              >
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={this.handleLogout}
                >
                  <i className="fas fa-sign-out-alt" /> Logout
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    );
  }
}

Header.PropTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Header);
