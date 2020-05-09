import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import 'font-awesome/css/font-awesome.min.css';

import './Entrada.styles.css';

class Step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      nf: '',
      ne: '',
      numeroProcesso: '',
      descricao: '',
      erroDate: '',
      erroNf: '',
      erroNe: '',
      erroNumeroProcesso: '',
    };
  }

  next = () => {
    // const erroDate = this.state.date === null ? 'A data não pode ficar em branco' : '';
    // const erroNf = this.state.nf === null || this.state.nf.length < 10 ? 'Nota fiscal inválida' : '';
    // const erroNe = this.state.ne === null || this.state.ne.length < 12 ? 'Nota de empenho inválida' : '';
    // const erroNumeroProcesso = this.state.numeroProcesso === null || this.state.numeroProcesso.length < 12 ? 'Número do processo inválido' : '';
    //
    // this.setState({
    //   erroDate,
    //   erroNf,
    //   erroNe,
    //   erroNumeroProcesso,
    // }, () => {
    //   if (erroDate === '' && erroNf === '' && erroNe === '' && erroNumeroProcesso === '') {
    //     const data = {
    //       step1: {
    //         date: this.state.date,
    //         nf: this.state.nf,
    //         ne: this.state.ne,
    //         numeroProcesso: this.state.numeroProcesso,
    //         descricao: this.state.descricao,
    //       },
    //     };
    //
    //     this.props.onNext(data);
    //   }
    // });

    const data = {
      step1: {
        date: this.state.date,
        nf: this.state.nf,
        ne: this.state.ne,
        numeroProcesso: this.state.numeroProcesso,
        descricao: this.state.descricao,
      },
    };
    this.props.onNext(data);
  }

  renderPagination = () => (
    <div className="steps">
      <span>Passo { this.props.index + 1 } de 3 </span>
    </div>
  )

  render() {
    const icon = this.props.index !== 2 ? <span className="fa fa-arrow-right iconNext" /> : <span className="fa fa-check iconNext" />;
    return (
      <section>
        <strong className="label">Data</strong>
        <div className="inputContainer">
          <DatePicker
            value={this.state.date}
            onChange={(e, date) => this.setState({ date })}
            locale="pt-BR"
            underlineStyle={{ borderColor: '#08aa8a' }}
            underlineFocusStyle={{ borderColor: '#1abc9c' }}
          />
        </div>
        <strong className="errorText">{this.state.erroDate}</strong>

        <strong className="label">Nota Fiscal</strong>
        <div className="inputContainer">
          <TextField
            maxLength="40"
            value={this.state.nf}
            onChange={e => this.setState({ nf: e.target.value })}
            inputStyle={{ color: '#2c3e50' }}
            underlineStyle={{ borderColor: '#08aa8a' }}
            underlineFocusStyle={{ borderColor: '#1abc9c' }}
          />
        </div>
        <strong className="errorText">{this.state.erroNf}</strong>

        <strong className="label">Número do Empenho</strong>
        <div className="inputContainer">
          <TextField
            maxLength="12"
            value={this.state.ne}
            onChange={e => this.setState({ ne: e.target.value })}
            inputStyle={{ color: '#2c3e50' }}
            underlineStyle={{ borderColor: '#08aa8a' }}
            underlineFocusStyle={{ borderColor: '#1abc9c' }}
          />
        </div>
        <strong className="errorText">{this.state.erroNe}</strong>

        <strong className="label">Número do Processo</strong>
        <div className="inputContainer">
          <TextField
            maxLength="26"
            value={this.state.numeroProcesso}
            onChange={e => this.setState({ numeroProcesso: e.target.value })}
            inputStyle={{ color: '#2c3e50' }}
            underlineStyle={{ borderColor: '#08aa8a' }}
            underlineFocusStyle={{ borderColor: '#1abc9c' }}
          />
        </div>
        <strong className="errorText">{this.state.erroNumeroProcesso}</strong>

        <strong className="label">Descrição</strong>
        <div className="inputContainer">
          <TextField
            maxLength="60"
            value={this.state.descricao}
            onChange={e => this.setState({ descricao: e.target.value })}
            inputStyle={{ color: '#2c3e50' }}
            underlineStyle={{ borderColor: '#08aa8a' }}
            underlineFocusStyle={{ borderColor: '#1abc9c' }}
          />
        </div>

        <div className="inputContainer pagination">
          <strong className="label labelNext">{this.props.index !== 2 ? 'PRÓXIMO' : 'SALVAR'}</strong>
          <div className="iconContainer" onClick={this.next}>
            { icon }
          </div>
        </div>

        { this.renderPagination() }

      </section>
    );
  }
}

Step1.propTypes = {
  /* eslint react/forbid-prop-types: 0 */
  index: PropTypes.number.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default Step1;
