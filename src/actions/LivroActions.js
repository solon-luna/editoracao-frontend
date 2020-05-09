import axios from 'axios';
import * as types from '../constants/Api';
import { SET_LIVROS, SET_LIVROS_ASSUNTOS, ERRO } from '../constants/ActionTypes';
import { ERRO_AUTENTICACAO, ERRO_COMUNICACAO } from '../constants/MensagensLogin';

// Erro de autenticação
export const erroLivro = erro => ({
  type: ERRO,
  erro,
});

// Salva os locais no estado
export const setLivros = livros => ({
  type: SET_LIVROS,
  livros,
});

// Retorna os livros cadastrados
export const startGetLivros = () => dispatch => axios({
  method: 'get',
  url: types.LIVRO,
  headers: types.HTTP_HEADER,
  validateStatus(status) {
    return status >= 200 && status <= 401;
  },
}).then((res) => {
  if (res.status === 200) {
    dispatch(setLivros(res.data));
  } else {
    dispatch(erroLivro(ERRO_COMUNICACAO));
  }
}).catch((e) => {
  dispatch(erroLivro(ERRO_COMUNICACAO));
});
