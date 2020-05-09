import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle';
import RemoveCircleIcon from 'material-ui/svg-icons/content/remove-circle';
import FiberNewIcon from 'material-ui/svg-icons/av/fiber-new';
import 'font-awesome/css/font-awesome.min.css';

import './Entrada.styles.css';
import { AUTOR } from '../../constants/Api';
import EditDialog from '../Dialogs/EditDialog';

class Step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      livro: null,
      livros: [],
      searchText: '',
      newDialogOpen: false,
    };
  }

  next = () => {
    const data = {
      step2: {
        livro: this.state.livro,
        quantidade: 0,
        valor: 0.00,
      },
    };
    this.props.onNext(data);
  }

  previous = () => {
    this.props.onPrevious();
  }

  handleUpdateInput = (searchText) => {
    this.setState({
      searchText,
    });
  };

  /* eslint no-unused-vars: 0 */
  handleNewRequest = (chosenOne, index) => {
    this.setState({ livro: chosenOne });
    // const label = this.props.livros[this.state.currentIndex].dataSourceConfig;
    // this.setState({
    //   value: chosenOne[label.text],
    //   _id: chosenOne[label.value],
    // });
  };

  addLivro() {
    if (this.state.livro !== null &&
    this.state.quantidade.length > 0 &&
    this.state.valor.length > 0) {
      const { livros } = this.state;
      const livro = Object.assign({}, this.state.livro);
      livro.quantidade = Number(this.state.quantidade);
      livro.valor = Number(this.state.valor);
      livros.push(livro);

      this.setState({
        livro: null,
        livros,
        searchText: '',
        quantidade: '',
        valor: '',
      });
    }
  }

  newLivro() {

  }

  removeLivro(index) {
    const array = this.state.livros;
    array.splice(index, 1);
    this.setState({ livros: array });
  }

  renderPagination = () => (
    <div className="steps">
      <div className="iconContainer" onClick={this.previous}>
        <span className="fa fa-arrow-left iconNext" />
      </div>

      <span>Passo { this.props.index + 1 } de 3 </span>
    </div>
  )

  renderLivrosList = () => {
    const list = [];
    list.push((
      <section>
        <div className="inputContainer listContainer listHeader">
          <span className="listItem">TÍTULO</span>
          <span className="listItem">QUANTIDADE</span>
          <span className="listItem">VALOR UNITÁRIO</span>
          <span className="listItemAction" />
        </div>
        <Divider />
      </section>
    ));

    if (this.state.livros.length === 0) {
      list.push((
        <section>
          <div className="inputContainer listContainer">
            <span className="listItem" />
            <span className="listItem" />
            <span className="listItem" />
          </div>
          <Divider />
        </section>
      ));
    } else {
      for (let i = 0; i < this.state.livros.length; i += 1) {
        list.push((
          <section>
            <div className="inputContainer listContainer">
              <span className="listItem">{this.state.livros[i].titulo}</span>
              <span className="listItem">{this.state.livros[i].quantidade}</span>
              <span className="listItem">{Number(this.state.livros[i].valor).toFixed(2).replace('.', ',')}</span>
              <IconButton tooltip="Remover livro" onClick={() => this.removeLivro(i)}>
                <RemoveCircleIcon color="#ff5252" hoverColor="#ffbaba" />
              </IconButton>
            </div>
            <Divider />
          </section>
        ));
      }
    }

    return list;
  }

  render() {
    const icon = this.props.index !== 2 ? <span className="fa fa-arrow-right iconNext" /> : <span className="fa fa-check iconNext" />;

    return (
      <section>
        <div className="inputContainer">
          <AutoComplete
            searchText={this.state.searchText}
            onUpdateInput={this.handleUpdateInput}
            onNewRequest={this.handleNewRequest}
            filter={AutoComplete.fuzzyFilter}
            openOnFocus
            maxSearchResults={10}
            dataSource={this.props.livros}
            dataSourceConfig={{ value: '_id', text: 'titulo' }}
            inputStyle={{ color: '#2c3e50' }}
            underlineStyle={{ borderColor: '#08aa8a' }}
            underlineFocusStyle={{ borderColor: '#1abc9c' }}
            floatingLabelFocusStyle={{ color: '#fefefe' }}
            floatingLabelStyle={{ color: '#2c3e50' }}
            floatingLabelText="Livro"
          />
          <TextField
            value={this.state.quantidade}
            onChange={(e) => {
              if (e.target.value.toString().length <= 4) {
                this.setState({ quantidade: e.target.value });
              }
            }}
            style={{ marginLeft: '20px', marginRight: '20px' }}
            inputStyle={{ color: '#2c3e50' }}
            underlineStyle={{ borderColor: '#08aa8a' }}
            underlineFocusStyle={{ borderColor: '#1abc9c' }}
            floatingLabelFocusStyle={{ color: '#fefefe' }}
            floatingLabelStyle={{ color: '#2c3e50' }}
            floatingLabelText="Quantidade"
            type="number"
          />
          <TextField
            value={this.state.valor}
            onChange={(e) => {
              // validation of decimal part
              if (e.target.value.toString().length <= 10) {
                if (e.target.value.toString().indexOf('.') !== -1) {
                  const parts = e.target.value.toString().split('.');
                  if (parts[1].length <= 2) {
                    this.setState({ valor: e.target.value });
                  }
                } else {
                  this.setState({ valor: e.target.value });
                }
              }
            }}
            inputStyle={{ color: '#2c3e50' }}
            underlineStyle={{ borderColor: '#08aa8a' }}
            underlineFocusStyle={{ borderColor: '#1abc9c' }}
            floatingLabelFocusStyle={{ color: '#fefefe' }}
            floatingLabelStyle={{ color: '#2c3e50' }}
            floatingLabelText="Valor Unitário"
            type="number"
            maxLength="10"
          />

          <IconButton
            tooltip="Adicionar livro"
            style={{ marginLeft: '20px', marginTop: '20px' }}
            onClick={ this.addLivro.bind(this) }
          >
            <AddCircleIcon color="#ff5252" hoverColor="#ffbaba" />
          </IconButton>

          <IconButton
            tooltip="Novo livro"
            style={{ marginLeft: '20px', marginTop: '20px' }}
            onClick={() => this.setState({ newDialogOpen: true })}
          >
            <FiberNewIcon color="#eeee55" hoverColor="#ffbaba" />
          </IconButton>
        </div>

        <strong className="label">Livros</strong>
        <Paper zDepth={2} style={{ marginTop: '20px', marginBottom: '20px' }}>
          { this.renderLivrosList() }
        </Paper>

        <div className="inputContainer">
          <strong className="label labelNext">{this.props.index !== 2 ? 'PRÓXIMO' : 'SALVAR'}</strong>
          <div className="iconContainer" onClick={this.next}>
            { icon }
          </div>
        </div>

        { this.renderPagination() }

        <EditDialog
          visible={this.state.newDialogOpen}
          title="Novo Livro"
          onCancel={() => this.setState({ newDialogOpen: false })}
          onSave={livro => this.onSaveLivro(livro)}
          id="newLivro"
          fields={[
            {
              label: 'Nome',
              minLength: 5,
              paramName: 'nome',
              value: this.state.autor ? this.state.autor.nome : null,
              type: 'text',
            },
            {
              label: 'Autor',
              minLength: 5,
              paramName: 'autor',
              url: AUTOR,
              type: 'dynamic',
              dataSourceConfig: { value: '_id', text: 'nome' },
            },
          ]}
        />
      </section>
    );
  }
}

Step2.propTypes = {
  /* eslint react/forbid-prop-types: 0 */
  index: PropTypes.number.isRequired,
  livros: PropTypes.array.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
};

export default Step2;
