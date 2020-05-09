import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';

export default class EditAutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = props.state;
  }
  render() {
    return (
      <AutoComplete
        floatingLabelText={this.props.field.label}
        key={`inputKey_${this.props.field.label}`}
        id={`inputId_${this.props.field.label}`}
        searchText={this.state.value ? this.state.value[this.state.dataSourceConfig.text] : ''}
        onNewRequest={(chosenOne) => {
          const field = {};
          const { value } = this.state;
          field.value = {};
          field.value[this.props.field.dataSourceConfig.text] = chosenOne[this.props.field.dataSourceConfig.text];
          field.value[this.props.field.dataSourceConfig.value] = chosenOne[this.props.field.dataSourceConfig.value];
          this.props.onNewRequest(field, this.props.index);
          value[this.props.field.dataSourceConfig.text] = field.value[this.state.dataSourceConfig.text];
          this.setState({ value });
        }}
        onUpdateInput={(searchText) => {
          if (this.state.value) {
            const { value } = this.state;
            value[this.props.field.dataSourceConfig.text] = searchText;
            this.setState({ value });
          } else {
            const value = {};
            value[this.props.field.dataSourceConfig.text] = searchText;
            this.setState({ value })
          }
          this.props.onUpdateInput(this.props.field, this.props.index);
        }}
        filter={AutoComplete.fuzzyFilter}
        openOnFocus
        maxSearchResults={10}
        dataSource={this.props.field.dataSource}
        dataSourceConfig={this.props.field.dataSourceConfig}
      />
    );
  }
}
