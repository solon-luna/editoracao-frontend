import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="main-footer">
        <div className="float-right d-none d-sm-block">
          <b>Version</b> 1.0.0
        </div>
        <strong>
          Copyright © 2020 <a href="http://www.casaruibarbosa.gov.br/">Casa de Rui Barbosa</a>.
        </strong>{" "}
        Todos os direitos reservados.
      </footer>
    );
  }
}

export default Footer;
