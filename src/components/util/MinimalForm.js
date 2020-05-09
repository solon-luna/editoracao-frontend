import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ReactCSSTransitionReplace from 'react-css-transition-replace';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import 'font-awesome/css/font-awesome.min.css';
import './MinimalForm.styles.css';

// fields
/*
  {
    type: text, dataSource, datePicker, number, checkBox,
    data: ,
    label: ,
    maxLength: ,
    errorMessage: ,
  }

*/

class MinimalForm extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);

    this.state = {
      currentIndex: 0,
      errorMessage: '',
      value: '',
      _id: null,
    };

    this.fields = props.fields;
  }

  next = () => {
    if (this.state.currentIndex !== this.props.fields.length - 1) {
      const index = this.state.currentIndex;

      if (this.fields[index].type === 'datasource') {
        // Check if the search is inputed but none data source was selected
        this.fields[index].value = this.state._id === null ? null : this.state.value;
        this.fields[index]._id = this.state._id;
      } else {
        this.fields[index].value = this.state.value;
      }

      if (this.state.value.length >= 2 || this.props.fields[index].allowNull) {
        this.setState({
          currentIndex: index + 1,
          errorMessage: '',
          _id: this.fields[index + 1]._id ? this.fields[index + 1]._id : null,
          value: this.fields[index + 1].value ? this.fields[index + 1].value : '',
        });
      } else {
        this.setState({ errorMessage: this.props.fields[index].errorMessage });
      }
    } else {
      // Check the last field and call save
      this.save();
    }
  }

  previous = () => {
    const index = this.state.currentIndex;

    if (this.state.currentIndex !== 0) {
      this.setState({
        value: this.fields[index - 1].value ? this.fields[index - 1].value : '',
        _id: this.fields[index - 1]._id ? this.fields[index - 1]._id : null,
        currentIndex: this.state.currentIndex - 1,
        errorMessage: '',
      });
    }
  }

  // Last element trigger the onSubmit property
  save() {
    const index = this.state.currentIndex;
    this.fields[index].value = this.state.value;
    if (this.state.value !== '') {
      this.props.onSave(this.fields);
    } else if (this.props.fields[index].allowNull) {
      this.props.onSave(this.fields);
    } else {
      this.setState({ errorMessage: 'Este campo não pode ficar em branco' });
    }
  }

  handleUpdateInput = (searchText) => {
    this.setState({
      value: searchText,
    });
  };

  /* eslint no-unused-vars: 0 */
  handleNewRequest = (chosenOne, index) => {
    const label = this.props.fields[this.state.currentIndex].dataSourceConfig;
    this.setState({
      value: chosenOne[label.text],
      _id: chosenOne[label.value],
    });
  };

  /* eslint no-unused-vars: 1 */

  renderItem = (index) => {
    let input;

    if (this.props.fields[index].type === 'datasource') {
      input = (<AutoComplete
        id="input"
        searchText={this.state.value}
        onUpdateInput={this.handleUpdateInput}
        onNewRequest={this.handleNewRequest}
        filter={AutoComplete.fuzzyFilter}
        openOnFocus
        maxSearchResults={10}
        dataSource={this.props.fields[index].dataSource}
        dataSourceConfig={this.props.fields[index].dataSourceConfig}
        inputStyle={{ color: '#2c3e50' }}
        underlineStyle={{ borderColor: '#08aa8a' }}
        underlineFocusStyle={{ borderColor: '#1abc9c' }}
      />);
    } else {
      input = (<TextField
        id="input"
        value={this.state.value}
        onChange={e => this.setState({ value: e.target.value })}
        inputStyle={{ color: '#2c3e50' }}
        underlineStyle={{ borderColor: '#08aa8a' }}
        underlineFocusStyle={{ borderColor: '#1abc9c' }}
      />);
    }

    const icon = this.props.fields.length - 1 === index ? <span className="fa fa-check iconNext" /> : <span className="fa fa-arrow-right iconNext" />;
    return (
      <div className="minimalFormContainer" key={`fieldKey${index}`}>

        <strong className="label">{this.props.fields[index].label}</strong>

        <div className="inputContainer">

          { input }

          <div className="iconContainer" onClick={this.next}>
            { icon }
          </div>
        </div>
        <strong className="errorText">{this.state.errorMessage}</strong>
      </div>
    );
  }

  renderBack = () => (
    <div className="iconContainer" onClick={this.previous}>
      <span className="fa fa-arrow-left iconNext" />
    </div>
  )

  renderPagination = () => (
    <div className="steps">
      { this.state.currentIndex !== 0 ? this.renderBack() : null }
      <span>Passo {this.state.currentIndex + 1} de { this.props.fields.length } </span>
    </div>
  )

  render() {
    return (
      <ReactCSSTransitionReplace transitionName="component" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
        <section key={`keyIndex${this.state.currentIndex}`}>
          {this.renderItem(this.state.currentIndex)}
          { this.props.showPagination ? this.renderPagination() : null}
        </section>
      </ReactCSSTransitionReplace>
    );
  }
}

MinimalForm.defaultProps = {
  showPagination: true,
};

MinimalForm.propTypes = {
  /* eslint react/forbid-prop-types: 0 */
  fields: PropTypes.array.isRequired,
  showPagination: PropTypes.bool,
  onSave: PropTypes.func.isRequired,
};

export default MinimalForm;
