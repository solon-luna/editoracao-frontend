import axios from 'axios';
import * as types from '../constants/Api';
import { SET_RUBRICAS, ADD_RUBRICA, ERRO } from '../constants/ActionTypes';
import { ERRO_AUTENTICACAO, ERRO_COMUNICACAO } from '../constants/MensagensLogin';

// Erro de autenticação
export const erroRubrica = erro => ({
  type: ERRO,
  erro,
});

// Salva os locais no estado
export const setRubricas = rubricas => ({
  type: SET_RUBRICAS,
  rubricas,
});

// Retorna os locais do sistema
export const startGetRubricas = (data = null) => dispatch => axios({
  method: 'get',
  url: types.RUBRICA,
  headers: types.HTTP_HEADER,
  params: { ...data },
  validateStatus(status) {
    return status >= 200 && status <= 401;
  },
}).then((res) => {
  if (res.status === 200) {
    dispatch(setRubricas(res.data));
  } else {
    dispatch(erroRubrica(ERRO_COMUNICACAO));
  }
}).catch((e) => {
  dispatch(erroRubrica(ERRO_COMUNICACAO));
});

export const addRubrica = mensagem => ({
  type: ADD_RUBRICA,
  mensagem,
});

// Salva um novo Local
export const startAddRubrica = (rubrica, token) => (dispatch) => {
  return axios({
    method: 'post',
    url: types.RUBRICA,
    data: rubrica,
    headers: types.GET_HTTP_HEADER(token),
    vavalidateStatus(status) {
      return status >= 200 && status <= 401;
    },
  }).then((res) => {
    if (res.status === 200) {
      dispatch(addRubrica('Rubrica adicionada :)'));
    } else {
      dispatch(erroRubrica(ERRO_AUTENTICACAO));
    }
  }).catch((e) => {
    dispatch(erroRubrica(ERRO_COMUNICACAO));
  });
};
