import React, { Component } from 'react';
import { connect } from 'react-redux';

import Snackbar from 'material-ui/Snackbar';
import { startGetLocais, startAddLocal } from '../../actions/LocalActions';
import MinimalForm from '../util/MinimalForm';
import { Loader } from '../util/Loader';

class LocalAdd extends Component {

  constructor(props) {
    super(props);

    this.state = { isLoading: true, isSaved: false, response: ''};
  }

  componentWillReceiveProps(nextProps) {
    let {isLoading, response, isSaved} = this.state;
    if(nextProps.local.locais) {
      isLoading = false;
    }

    if(nextProps.local.erro !== "") {
      isLoading = false;
      response = nextProps.local.erro;
    }
    else {
      if(nextProps.local.mensagem !== "") {
        isLoading = false;
        isSaved = true;
      }
    }
    this.setState({isLoading, isSaved, response});
  }

  componentDidMount() {
    let { dispatch } = this.props;
    dispatch(startGetLocais());
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
      const local = {
        _idSubLocal: fields[0]._id ? fields[0]._id : null,
        descricao: fields[1].value
      };
      dispatch(startAddLocal(local, token));
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
              type: 'datasource',
              allowNull: true,
              dataSource: this.props.local.locais,
              dataSourceConfig: { value: '_id', text: 'descricao' },
              label: 'Este local está associado a algum outro local?',
              maxLength: 20,
            },
            {
              type: 'text',
              label: 'Qual o nome do local?',
              maxLength: 20,
              errorMessage: 'O nome do local deve ser preenchido',
            },
          ]}
        />
      );
    }
  }

  render() {
    return (
      <section className="containerEntrada">
        <span className="title">{ this.state.isSaved ? this.props.local.mensagem : 'Vamos adicionar um novo local!'}</span>
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
  local: store.local,
});

export default connect(mapStateToProps)(LocalAdd);
