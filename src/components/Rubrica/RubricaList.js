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

import { startGetRubricas } from '../../actions/RubricaActions';
import { Loader } from '../util/Loader';

class RubricaList extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(startGetRubricas());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.rubrica.rubricas) {
      this.setState({ isLoading: false });
    }
  }

  _renderTable() {
    if (this.state.isLoading) {
      return <Loader />;
    }

    const tableRows = this.props.rubrica.rubricas.map(rubrica => (
      <TableRow key={rubrica._id} style={{ borderColor: '#ffffff' }}>
        <TableRowColumn style={text}>{ rubrica.codigo }</TableRowColumn>
        <TableRowColumn style={text}>{ rubrica.descricao }</TableRowColumn>
        <TableRowColumn style={text}>{ rubrica.tipo }</TableRowColumn>
      </TableRow>
    ));

    return (
      <Table style={{ backgroundColor: '#1abc9c' }}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow style={{ borderColor: '#ffffff' }}>
            <TableHeaderColumn style={header}>Código</TableHeaderColumn>
            <TableHeaderColumn style={header}>Descrição</TableHeaderColumn>
            <TableHeaderColumn style={header}>Tipo</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} >
          { tableRows }
        </TableBody>
      </Table>
    );
  }

  render() {
    return (
      <section className="containerEntrada">
        { this._renderTable() }
      </section>
    );
  }
}

const text = {
  color: '#2c3e50',
  fontSize: '0.9em',
  fontRamily: 'Source Sans Pro',
};

const header = {
  ...text,
  color: '#ffffff',
  fontSize: '1.1em',
  fontWeight: 'bold',
};

const mapStateToProps = store => ({
  rubrica: store.rubrica,
});

export default connect(mapStateToProps)(RubricaList);
