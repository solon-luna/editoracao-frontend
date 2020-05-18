import * as types from '../constants/ActionTypes';

const initialState = {
  locais: null,
  mensagem: '',
  erro: ''
}

const local = (state = initialState, action) => {
  switch(action.type){
    case types.SET_LOCAIS:
      return {
        ...initialState,
        locais: action.locais,
      }
    case types.ADD_LOCAL:
      return {
        ...state,
        erro: '',
        mensagem: action.mensagem
      }
    case types.UPDATE_LOCAL:
      return {
        ...state,
        locais: action.locais,
        mensagem: "Local atualizado"
      }
    case types.ERRO:
      return {
        ...state,
        erro: action.erro
      }
    default:
      return state;
  }
}

export default local;
