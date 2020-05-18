import React, { Component } from "react";
import swal from "sweetalert";
import { withRouter, Link } from "react-router-dom";
class Header extends Component {
  Logout = e => {
    swal("Deseja realmente sair?", {
      buttons: {
        nope: {
          text: "Nao",
          value: "nope"
        },
        sure: {
          text: "Sim",
          value: "sure"
        }
      }
    }).then(value => {
      switch (value) {
        case "sure":
          swal("Voce Saiu!", "obrigado").then(val => {
            localStorage.removeItem("TOKEN_KEY");
            //return this.props.history.push("/login");
            return this.props.history.push("/");
          });
          break;
        case "nope":
          swal("Ok", "obrigado");
          break;
        default:
          swal("Obrigado!");
      }
    });
  };
  render() {
    return (
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="# ">
              <i className="fas fa-bars" />
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="/" className="nav-link">
              Home
            </a>
          </li>
        </ul>
        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          {/* Messages Dropdown Menu */}
          {/* Notifications Dropdown Menu */}

          <li className="nav-item dropdown">
            <a className="nav-link" data-toggle="dropdown" href="# ">
              <i className="far fa-user" />
            </a>

            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <span className="dropdown-item dropdown-header">menu</span>
              <div className="dropdown-divider" />
              <Link to="/profile" className="dropdown-item">
                <i className="fas fa-user-alt mr-2" /> Atualizar Perfil
              </Link>
              <div className="dropdown-divider" />
              <a
                href = "javascript:void(0)"
                onClick={() => this.Logout()}
                className="dropdown-item"
              >
                <i className="fas fa-sign-out-alt mr-2" /> Sair
              </a>
            </div>
          </li>
        </ul>
      </nav>
    );
  }
}

export default withRouter(Header);
