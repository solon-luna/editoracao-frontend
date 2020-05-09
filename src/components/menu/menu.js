import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import swal from "sweetalert";

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import Home from '../../../src/components/home';
import Entrada from '../../../src/components/Entrada/Entrada';
import LocalAdd from '../../../src/components/Local/LocalAdd';
import LocalList from '../../../src/components/Local/LocalList';
import AutorAdd from '../../../src/components/Autor/AutorAdd';
import AutorList from '../../../src/components/Autor/AutorList';
import RubricaAdd from '../../../src/components/Rubrica/RubricaAdd';
import RubricaList from '../../../src/components/Rubrica/RubricaList';

import './menu.styles.css';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleClose = () => this.setState({ open: false });

  render() { 
    return (
      <Router>
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* Brand Logo */}
            <a href="../../index3.html" className="brand-link"> 
              <img
                src="../../public/Rui.jpg"
                alt="Rui Desenho"
                className="brand-image img-circle elevation-3"
                style={{ opacity: ".8" }}
              />
              <span className="brand-text font-weight-light">Controle de Livros</span>
            </a>
            {/* Sidebar */}
            <div className="sidebar">
              {/* Sidebar user (optional) */}
              <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                <div className="image">
                  <img
                    src="../../public/Rui.jpg"
                    className="img-circle elevation-2"
                    alt="User"
                  />
              </div>
              <div className="info">
                <a href="# " className="d-block">
                  Casa de Rui Barbosa
                </a>
              </div>
             {/* Sidebar Menu */}
              <nav className="mt-2">
                <ul
                  className="nav nav-pills nav-sidebar flex-column"
                  data-widget="treeview"
                  role="menu"
                  data-accordion="false"
                >
                  {/* Add icons to the links using the .nav-icon class
                   with font-awesome or any other icon font library */}

              <li className="nav-item has-treeview">
                <a href="# " className="nav-link">
                  <i className="nav-icon fas fa-edit" />
                  <p>
                    Locais
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/local/novo" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Novo</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/local/lista" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Listar</p>
                    </a>
                  </li>
                </ul>
              </li>    

              <li className="nav-item has-treeview">
                <a href="# " className="nav-link">
                  <i className="nav-icon fas fa-edit" />
                  <p>
                    Autores
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/autor/novo" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Novo</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/autor/lista" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Listar</p>
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item has-treeview">
                <a href="# " className="nav-link">
                  <i className="nav-icon fas fa-edit" />
                  <p>
                    Rubricas
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/rubrica/novo" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Nova</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/rubrica/lista" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Listar</p>
                    </a>
                  </li>    
                </ul>
              </li>

              <li className="nav-item">
                <a href="/" className="nav-link">
                  <i className="nav-icon fas fa-edit" />
                  <p>
                    Estoque
                    <span className="right badge badge-danger">Novo</span>
                  </p>
                </a>
              </li>

              <li className="nav-item">
                <a href="/entrada" className="nav-link">
                  <i className="nav-icon fas fa-edit" />
                  <p>
                    Entrada de Livros
                    <span className="right badge badge-danger">Novo</span>
                  </p>
                </a>
              </li>

              <div className="body">
                <Route exact path="/" component={Home} />
                <Route path="/entrada" component={Entrada} />
                <Route path="/local/novo" component={LocalAdd} />
                <Route path="/local/lista" component={LocalList} />
                <Route path="/autor/novo" component={AutorAdd} />
                <Route path="/autor/lista" component={AutorList} />
                <Route path="/rubrica/novo" component={RubricaAdd} />
                <Route path="/rubrica/lista" component={RubricaList} />
              </div>

            </ul>
          </nav>             
          </div> 
          </div> 
        </aside> 
      </Router> 
    );
  }
}

const menuItemStyles = {
  fontFamily: 'Source Sans Pro',
  color: '#0c7563',
  paddingLeft: '2vw',
};

const menuItemHeaderStyles = {
  fontFamily: 'Source Sans Pro',
  color: '#000000',
  opacity: '0.54',
  paddingLeft: '2vw',
};

const subItemStyles = {
  fontFamily: 'Source Sans Pro',
  color: '#0c7563',
  paddingLeft: '3vw',
};

const mapStateToProps = store => ({
  user: store.user,
});


export default connect(mapStateToProps)(Menu);
