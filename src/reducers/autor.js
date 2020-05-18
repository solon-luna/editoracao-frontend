import * as types from '../constants/ActionTypes';

const initialState = {
  autores: null,
  mensagem: '',
  erro: '',
};

const autor = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_AUTORES:
      return {
        ...initialState,
        autores: action.autores,
      };
    case types.ADD_AUTOR:
      return {
        ...state,
        mensagem: action.mensagem,
      };
    case types.UPDATE_AUTOR:
      return {
        ...state,
        autores: action.autores,
        mensagem: 'Autor atualizado',
      };
    case types.ERRO:
      return {
        ...state,
        mensagem: '',
        erro: action.erro,
      };
    default:
      return state;
  }
};

export default autor;
