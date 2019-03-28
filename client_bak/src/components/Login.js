import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authActions';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            rememberme: true,
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleCheck(e) {
        this.setState({ rememberme: !this.state.rememberme });
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password,
        }

        this.props.loginUser(user);
    }

    render() {
        const { errors} = this.state;
        return (
            <div id="main" className="Login">
                <div className="container">
                    <div className="card login-card shadow-sm">
                        <div className="card-header bg-primary-blue">
                            <h1>Login</h1>
                        </div>
                        <div className="card-body">
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input
                                        type="email"
                                        className={classnames('form-control', { 'is-invalid': errors.email })}
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                    />
                                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className={classnames('form-control', { 'is-invalid': errors.password })}
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                                </div>
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="rememberme"
                                        onChange={this.handleCheck}
                                        defaultChecked={this.state.rememberme}
                                    />
                                    <label className="form-check-label" htmlFor="rememberme">Remember Me</label>
                                </div>
                                <div className="text-right mt-3">
                                    <button type="submit" className="btn btn-primary-blue login-btn">Login</button>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer bg-transparent">
                            <a href="/forgot-password" className="text-uppercase"><small>Forgot Password?</small></a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {loginUser})(Login);
