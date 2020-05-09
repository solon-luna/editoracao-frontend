import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import AutoComplete from 'material-ui/AutoComplete';
import CircularProgress from 'material-ui/CircularProgress';

import { HTTP_HEADER } from '../../../src/constants/Api';

class DynamicAutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, dataSource: [], error: null };
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: this.props.url,
      headers: HTTP_HEADER,
    }).then((res) => {
      console.log('res', res);
      if (!Array.isArray(res.data)) {
        this.setState({ error: 'Response data should be an array type', isLoading: false });
      } else {
        this.setState({ dataSource: res.data, isLoading: false });
      }
    }).catch((e) => {
      console.log('error', e);
      this.setState({ error: 'Erro ao tentar obter dados do servidor', isLoading: false });
    });
  }

  render() {
    if (this.state.error) { return <span>{this.state.error}</span>; }
    if (this.state.isLoading) {
      return (
        <div>
          <AutoComplete dataSource={this.state.dataSource} disabled hintText="carregando..." />
          <CircularProgress key={`circular${this.props.url}`} size={20} />
        </div>
      );
    }
    return <AutoComplete dataSource={this.state.dataSource} floatingLabelText={this.props.label} />;
  }
}

DynamicAutoComplete.propTypes = {
  url: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  params: PropTypes.object,
};

export default DynamicAutoComplete;
