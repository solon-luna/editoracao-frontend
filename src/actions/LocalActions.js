import axios from 'axios';
import * as types from '../constants/Api';
import { SET_LOCAIS, ADD_LOCAL, UPDATE_LOCAL, ERRO } from '../constants/ActionTypes';
import { ERRO_AUTENTICACAO, ERRO_COMUNICACAO} from '../constants/MensagensLogin';

// Erro de autenticação
export const erroLocal = (erro) => {
  return {
    type: ERRO,
    erro
  }
};

// Salva os locais no estado
export const setLocais = (locais) => {
  return {
    type: SET_LOCAIS,
    locais,
  };
};

// Retorna os locais do sistema
export const startGetLocais = () => {
  return (dispatch, getState) => {
    return axios({
      method: 'get',
      url: types.LOCAL,
      headers: types.HTTP_HEADER,
      validateStatus: function (status) {
        return status >= 200 && status <= 401;
      }
    }).then((res) => {
      if(res.status === 200){
        dispatch(setLocais(res.data));
      }
      else {
        dispatch(erroLocal(ERRO_COMUNICACAO));
      }
    }).catch((e) => {
      dispatch(erroLocal(ERRO_COMUNICACAO));
    });
  };
}

export const addLocal = (mensagem) => {
 return {
   type: ADD_LOCAL,
   mensagem
 }
}

//Salva um novo Local
export const startAddLocal = (local, token) => {
  return (dispatch, getState) => {
    return axios({
      method: 'post',
      url: types.LOCAL,
      data: local,
      headers: types.GET_HTTP_HEADER(token),
      validateStatus: function (status) {
        return status >= 200 && status <= 401;
      }
    }).then((res) => {
      if(res.status === 200){
        dispatch(addLocal('Local adicionado :)'));
      }
      else {
        dispatch(erroLocal(ERRO_AUTENTICACAO));
      }
    }).catch((e) => {
      dispatch(erroLocal(ERRO_COMUNICACAO));
    });
  };
}


export const setUpdateLocal = (locais) => {
  return {
    type: UPDATE_LOCAL,
    locais
  }
}

// Atualiza um autor
export const startUpdateLocal = (_id, params, locais, linkedData, token) => {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: `${types.LOCAL}/${_id}`,
      headers: types.GET_HTTP_HEADER(token),
      data: params,
      validateStatus: status => status >= 200 && status <= 401
    }).then((res) => {
      if (res.status === 200) {
        // Update the array of Locais and setThe _idSubLocal with the correspondind data
        const newLocais = locais.map((local) => {
          if (local._id === res.data._id) {
            res.data._idSubLocal = linkedData;
            return res.data;
          }
          return local;
        });
        dispatch(setUpdateLocal(newLocais));
      } else {
        dispatch(erroLocal(ERRO_COMUNICACAO));
      }
    }).catch(() => {
      dispatch(erroLocal(ERRO_COMUNICACAO));
    });
  };
}
