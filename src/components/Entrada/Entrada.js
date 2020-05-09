import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Snackbar from 'material-ui/Snackbar';
import ReactCSSTransitionReplace from 'react-css-transition-replace';

import { startGetLivros } from '../../actions/LivroActions';
import { Loader } from '../util/Loader';
import Step1 from './Step1';
import Step2 from './Step2';
import './Entrada.styles.css';

class Entrada extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
      isLoading: true,
      response: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(startGetLivros());
  }

  componentWillReceiveProps(nextProps) {
    let { isLoading, response } = this.state;
    if (nextProps.livro.erro !== '') {
      isLoading = false;
      response = nextProps.livro.erro;
    } else if (nextProps.livro.mensagem !== '') {
      isLoading = false;
      response = nextProps.livro.mensagem;
    } else {
      isLoading = false;
    }

    this.setState({ isLoading, response });
  }

  save = () => {}

  next = (data) => {
    const obj = { ...data };
    if (obj.step1) {
      this.setState({ step1: obj.step1, currentIndex: this.state.currentIndex + 1 });
    }
  }

  previous = () => {
    if (this.state.currentIndex > 0) {
      this.setState({ currentIndex: this.state.currentIndex - 1 });
    }
  }

  renderItem = () => {
    const components = [];
    switch (this.state.currentIndex) {
      case 0:
        components.push(<Step1 index={this.state.currentIndex} onNext={this.next} key="fieldKeyStep1" />);
        break;
      case 1:
        components.push(<Step2
          index={this.state.currentIndex}
          onNext={this.next}
          onPrevious={this.previous}
          livros={this.props.livro.livros}
          key="fieldKeyStep2"
        />);
        break;
      case 2:
        components.push(<Step1 />);
        break;
      default:
        return null;
    }
    return components;
  }

  render() {
    if (this.state.isLoading) {
      return <Loader />;
    }

    return (
      <section className="containerEntrada">

        <span className="title">Vamos registrar a entrada de livros :)</span>
        <br />

        <ReactCSSTransitionReplace transitionName="component" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
          <section key={`keyIndex${this.state.currentIndex}`}>
            { this.renderItem() }
          </section>
        </ReactCSSTransitionReplace>
      </section>
    );
  }
}

Entrada.propTypes = {
  /* eslint react/forbid-prop-types: 0 */
  usuario: PropTypes.any.isRequired,
  livro: PropTypes.any.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  livro: store.livro,
  usuario: store.usuario,
});

export default connect(mapStateToProps)(Entrada);
