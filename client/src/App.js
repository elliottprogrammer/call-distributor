import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions';
import { Provider } from 'react-redux';
import store from './store';

import Login from './components/Login';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Check for token
if(localStorage.jwtToken) {
    // set auth token header
    setAuthToken(localStorage.jwtToken);
    // Decode token and get user info
    const decoded = jwt_decode(localStorage.jwtToken);
    // set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div id="wrapper">
                        <Header />
                        <div id="page-body">
                            <Route exact path="/login" component={Login} />
                        </div>
                        <Footer />
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;