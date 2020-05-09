import React, { Component } from 'react';
import { connect } from 'react-redux';

import Snackbar from 'material-ui/Snackbar';
import { startAddRubrica } from '../../actions/RubricaActions';
import MinimalForm from '../util/MinimalForm';
import { Loader } from '../util/Loader';

class RubricaAdd extends Component {
  constructor(props) {
    super(props);

    this.state = { isLoading: false, isSaved: false, response: '' };
  }

  componentWillReceiveProps(nextProps) {
    let { isLoading, response, isSaved } = this.state;

    if (nextProps.rubrica.erro !== '') {
      isLoading = false;
      response = nextProps.rubrica.erro;
    }
    else {
      if (nextProps.rubrica.mensagem !== '') {
        isLoading = false;
        isSaved = true;
      }
    }

    this.setState({ isLoading, isSaved, response} );
  }

  handleRequestClose = () => {
    this.setState({
      response: '',
    });
  };

  save = (fields) => {
    const { dispatch } = this.props;
    const { token } = this.props.usuario;
    this.setState({ isLoading: true }, () => {
      const rubrica = {
        codigo: fields[0].value,
        descricao: fields[1].value,
        tipo: fields[2].value,
      };
      dispatch(startAddRubrica(rubrica, token));
    });
  }

  _renderForm() {
    if (this.state.isLoading) {
      return <Loader />;
    }

    if (!this.state.isSaved) {
      return (
        <MinimalForm
          onSave={this.save}
          fields={[
            {
              type: 'text',
              label: 'Qual o código da rubrica?',
              maxLength: 20,
              errorMessage: 'O código da rubrica deve ser preenchido',
            },
            {
              type: 'text',
              label: 'Descrição',
              maxLength: 20,
              allowNull: true,
            },
            {
              type: 'text',
              label: 'Qual o tipo dessa rubrica',
              maxLength: 10,
              errorMessage: 'O tipo da rubrica inválido',
            },
          ]}
        />
      );
    }
  }

  render() {
    return (
      <section className="containerEntrada">
        <span className="title">{ this.state.isSaved ? this.props.rubrica.mensagem : 'Vamos adicionar uma nova rubrica!'}</span>
        { this._renderForm() }

        <Snackbar
          open={this.state.response.length > 0}
          message={this.state.response}
          autoHideDuration={2000}
          onRequestClose={this.handleRequestClose}
        />
      </section>
    );
  }
}

const mapStateToProps = store => ({
  usuario: store.usuario,
  rubrica: store.rubrica,
});

export default connect(mapStateToProps)(RubricaAdd);
