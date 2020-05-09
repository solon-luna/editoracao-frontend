import React, { Component } from "react";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/header";
import Menu from "./components/menu";
import Footer from "./components/footer";
import Register from "./components/register";
import Login from "./components/login";
import Home from "./components/home";
import Profile from "./components/profile";
import Passwordreset from "./components/passwordreset";
import Passwordforgot from "./components/passwordforgot";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
const isLoggedIn = () => {
  return localStorage.getItem("TOKEN_KEY") != null;
};
//const token = this.state.match.params["token"];
//const verifyActivation = token => dispatch(startActivation(token));

// Protected Route
const SecuredRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      // ternary condition

      isLoggedIn() === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export default class App extends Component {
  UNSAFE_componentWillUpdate(nextProps, nextState) {
    console.log("update");
  }

  render() {
    return (
      <Router>
        <Switch>
          <div>
            {isLoggedIn() && <Header />}
            {isLoggedIn() && <Menu />}
            <Route path="/register" component={Register} />
            <Route path="/login/:token" component={Login} />
            <Route path="/password/reset/:token" component={Passwordreset} />
            <Route path="/password/forgot" component={Passwordforgot} />
            <SecuredRoute path="/home" component={Home} />
            <SecuredRoute path="/profile" component={Profile} />
            <Route path="/" exact component={Login} />
            {isLoggedIn() && <Footer />}
          </div>
        </Switch>
      </Router>
    );
  }
}
