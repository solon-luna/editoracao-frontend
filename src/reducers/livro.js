import * as types from '../constants/ActionTypes';

const initialState = {
  livros: null,
  mensagem: '',
  erro: '',
};

const livro = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LIVROS:
      return {
        ...initialState,
        livros: action.livros,
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

export default livro;
