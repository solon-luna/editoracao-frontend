import React, { Component } from 'react';
import { connect } from 'react-redux';

import Snackbar from 'material-ui/Snackbar';
import { startAddAutor } from '../../actions/AutorActions';
import MinimalForm from '../util/MinimalForm';
import { Loader } from '../util/Loader';

class AutorAdd extends Component {

  constructor(props) {
    super(props);

    this.state = { isLoading: false, isSaved: false, response: ''};
  }

  componentWillReceiveProps(nextProps) {
    let {isLoading, response, isSaved} = this.state

    if(nextProps.autor.erro !== "") {
      isLoading = false;
      response = nextProps.autor.erro;
    }
    else {
      if(nextProps.autor.mensagem !== "") {
        isLoading = false;
        isSaved = true;
      }
    }

    this.setState({isLoading, isSaved, response});
  }

  handleRequestClose = () => {
    this.setState({
      response: '',
    });
  };

  save = (fields) => {
    let {dispatch} = this.props;
    let {token} = this.props.usuario;
    this.setState({isLoading: true}, () => {
      let autor = {
        nome: fields[0].value
      };
      dispatch(startAddAutor( autor, token ));
    });
  }

  _renderForm() {
    if( this.state.isLoading ) {
      return <Loader />;
    }
    else {
      if(!this.state.isSaved) {
        return (
          <MinimalForm
            onSave={this.save}
            fields={[
              {
                type: "text",
                label: "Qual o nome do autor?",
                maxLength: 20,
                errorMessage: 'O nome do autor deve ser preenchido'
              }
            ]}/>
        );
      }
    }
  }

  render() {
    return (
      <section className="containerEntrada">
        <span className="title">{ this.state.isSaved ? this.props.autor.mensagem : 'Vamos adicionar um novo autor!'}</span>
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

const mapStateToProps = (store) => {
  return {
    usuario: store.usuario,
    autor: store.autor
  }
}

export default connect(mapStateToProps)(AutorAdd);
