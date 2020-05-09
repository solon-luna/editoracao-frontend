import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import EditAutoComplete from './EditAutoComplete';
import DynamicAutoComplete from './DynamicAutoComplete';

class EditDialog extends Component {
  constructor(props) {
    super(props);

    this.actions = [
      <FlatButton label="Cancelar" primary onClick={this.cancel} />,
      <FlatButton label="Salvar" primary onClick={this.save} />,
    ];

    this.state = { ...props.fields };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...nextProps.fields });
  }

  cancel = () => this.props.onCancel();

  save = () => {
    // Validation for each field if it is correctly filled
    this.props.onSave({ id: this.props.id, ...this.state });
  }

  renderFields = () => {
    const items = [];

    for (let i = 0; i < this.props.fields.length; i += 1) {
      if (this.props.fields[i].type === 'text') {
        items.push(<TextField
          floatingLabelText={Object.values(this.state)[i].label}
          value={Object.values(this.state)[i].value}
          onChange={(e) => {
            const fields = this.state;
            fields[i].value = e.target.value;
            this.setState({ ...fields });
          }}
          key={`inputKey_${this.props.fields[i].label}`}
          id={`inputId_${this.props.fields[i].label}`}
          inputStyle={{ color: '#2c3e50' }}
        />);
      } else if (this.props.fields[i].type === 'dynamic') {
        items.push(<DynamicAutoComplete
          url={this.props.fields[i].url}
          key={`inputKey_${this.props.fields[i].label}`}
          dataSourceConfig={this.props.fields[i]}
          label={this.props.fields[i].label}
        />);
      } else {
        const fields = this.state;
        items.push(<EditAutoComplete
          key={`inputKey_${this.props.fields[i].label}`}
          field={this.props.fields[i]}
          state={this.state[i]}
          index={i}
          onNewRequest={(field, index) => {
            fields[index] = field;
            this.setState({ fields });
          }}
          onUpdateInput={(field, index) => {
            fields[index] = field;
            this.setState({ fields });
          }}
        />);
      }
    }
    return items;
  }

  render() {
    return (
      <Dialog
        title={this.props.title}
        actions={this.actions}
        modal={true}
        open={this.props.visible}
      >

        <div className="container">
          {this.renderFields()}
        </div>

      </Dialog>
    );
  }
}

EditDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
};

export default EditDialog;
