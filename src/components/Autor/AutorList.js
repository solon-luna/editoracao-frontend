import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit';

import { startGetAutores, startUpdateAutor } from '../../actions/AutorActions';
import { Loader } from '../util/Loader';
import EditDialog from '../Dialogs/EditDialog';

class AutorList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editDialogOpen: false,
      isLoading: true,
      autor: null,
      response: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(startGetAutores());
  }

  componentWillReceiveProps(nextProps) {
    let { isLoading, response, editDialogOpen } = this.state;

    if (nextProps.autor.erro !== '') {
      isLoading = false;
      response = nextProps.autor.erro;
    } else if (nextProps.autor.mensagem !== '') {
      isLoading = false;
      response = nextProps.autor.mensagem;
      editDialogOpen = false;
    } else if (nextProps.autor.autores) {
      isLoading = false;
    }
    this.setState({ isLoading, response, editDialogOpen });
  }

  // Dispatch the action to send the data
  onSave = (autor) => {
    let { dispatch } = this.props;
    dispatch(startUpdateAutor(autor._id, autor['0'].value, this.props.autor.autores, this.props.usuario.token));
    this.setState({ isLoading: true });
  }

  handleDialog = () => {
    this.setState({ editDialogOpen: !this.state.editDialogOpen });
  }

  openEditDialog = (autor) => {
    this.setState({ editDialogOpen: true, autor });
  }

  _renderTable() {
    if (this.state.isLoading) {
      return <Loader />;
    }

    const tableRows = this.props.autor.autores.map(autor => (
      <TableRow key={autor._id} style={{ borderColor: '#ffffff', overflow: 'visible' }}>
        <TableRowColumn style={text}>{ autor.nome }</TableRowColumn>
        <TableRowColumn style={{ ...text, ...actionText, overflow: 'visible' }}>
          <div className="tooltipContainer">
            <IconButton tooltip="Editar Autor" onClick={() => this.openEditDialog(autor)}>
              <ModeEditIcon color="#e2ecf7" hoverColor="#ffffff" />
            </IconButton>
            <IconButton tooltip="Apagar Autor">
              <DeleteIcon color="#ff5252" hoverColor="#ffbaba" />
            </IconButton>
          </div>
        </TableRowColumn>
      </TableRow>
    ));

    return (
      <Table
        style={{ backgroundColor: '#1abc9c', overflow: 'visible' }}
        wrapperStyle={{ paddingBottom: '20px', height: '88%' }}
      >
        <TableHeader displaySelectAll={false} adjustForCheckbox={false} style={{ border: 'none' }}>
          <TableRow style={{ borderColor: '#ffffff' }}>
            <TableHeaderColumn style={header}>Nome do autor</TableHeaderColumn>
            <TableHeaderColumn style={{ ...header, ...actionText }}>Ações</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} style={{ overflow: 'visible', paddingBottom: '40px' }}>
          { tableRows }
        </TableBody>
      </Table>
    );
  }

  render() {
    return (
      <section className="containerTable">
        { this._renderTable() }

        <EditDialog
          visible={this.state.editDialogOpen}
          title="Autor"
          onCancel={() => this.setState({ editDialogOpen: false })}
          onSave={autor => this.onSave(autor)}
          id={this.state.autor ? this.state.autor._id : null}
          fields={[
            {
              label: 'Nome',
              minLength: 5,
              paramName: 'nome',
              value: this.state.autor ? this.state.autor.nome : null,
              type: 'text',
            },
          ]}
        />

        <Snackbar
          open={this.state.response.length > 0}
          message={this.state.response}
          autoHideDuration={2000}
          onRequestClose={() => this.setState({ response: '' })}
        />
      </section>
    );
  }
}

const text = {
  color: '#2c3e50',
  fontSize: '0.9em',
  fontRamily: 'Source Sans Pro',
};

const actionText = {
  textAlign: 'right',
};

const header = {
  ...text,
  color: '#ffffff',
  fontSize: '1.1em',
  fontWeight: 'normal',
};

const mapStateToProps = store => ({
  autor: store.autor,
  usuario: store.usuario,
});

export default connect(mapStateToProps)(AutorList);
