import axios from 'axios';
import * as types from '../constants/Api';
import { SET_AUTORES, ADD_AUTOR, UPDATE_AUTOR, ERRO } from '../constants/ActionTypes';
import { ERRO_AUTENTICACAO, ERRO_COMUNICACAO } from '../constants/MensagensLogin';

// Erro de autenticação
export const erroAutor = erro => ({
  type: ERRO,
  erro,
});

// Salva os autores no estado
export const setAutores = autores => ({
  type: SET_AUTORES,
  autores,
});

// Retorna os autores
export const startGetAutores = () => {
  return (dispatch, getState) => {
    return axios({
      method: 'get',
      url: types.AUTOR,
      headers: types.HTTP_HEADER,
      validateStatus: function (status) {
        return status >= 200 && status <= 401;
      }
    }).then((res) => {
      if(res.status === 200){
        dispatch(setAutores(res.data));
      }
      else {
        dispatch(erroAutor(ERRO_COMUNICACAO));
      }
    }).catch((e) => {
      dispatch(erroAutor(ERRO_COMUNICACAO));
    });
  };
}

export const addAutor = (mensagem) => {
 return {
   type: ADD_AUTOR,
   mensagem
 }
}

//Salva um novo Autor
export const startAddAutor = (autor, token) => {
  return (dispatch, getState) => {
    return axios({
      method: 'post',
      url: types.AUTOR,
      data: autor,
      headers: types.GET_HTTP_HEADER(token),
      validateStatus: function (status) {
        return status >= 200 && status <= 401;
      }
    }).then((res) => {
      if(res.status === 200){
        dispatch(addAutor('Autor adicionado :)'));
      }
      else {
        dispatch(erroAutor(ERRO_AUTENTICACAO));
      }
    }).catch((e) => {
      dispatch(erroAutor(ERRO_COMUNICACAO));
    });
  };
}

export const setUpdateAutor = (autores) => {
  return {
    type: UPDATE_AUTOR,
    autores
  }
}

// Atualiza um autor
export const startUpdateAutor = (_id, nome, autores, token) => {
  return (dispatch, getState) => {
    return axios({
      method: 'put',
      url: types.AUTOR + "/" + _id,
      headers: types.GET_HTTP_HEADER(token),
      data: { nome },
      validateStatus: function (status) {
        return status >= 200 && status <= 401;
      }
    }).then((res) => {
      if(res.status === 200){
        autores = autores.map(autor => autor._id === res.data._id ? res.data : autor);
        dispatch(setUpdateAutor(autores));
      }
      else {
        dispatch(erroAutor(ERRO_COMUNICACAO));
      }
    }).catch((e) => {
      dispatch(erroAutor(ERRO_COMUNICACAO));
    });
  };
}
