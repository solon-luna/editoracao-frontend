const API_URL = 'http://localhost:3000';
//const API_URL = 'https://editoracao.herokuapp.com';
//const API_URL = 'https://cors-anywhere.herokuapp.com/https://editoracao.herokuapp.com';

export const USUARIO_LOGIN = `${API_URL}/usuario/login`;
export const USUARIO_NEW = `${API_URL}/usuario`;
export const USUARIO_CHECK_TOKEN = `${API_URL}/usuario/me`;
export const USUARIO_LOGOUT = `${API_URL}/usuario/logout`;
export const TOKEN_LOCAL_STORAGE = 'editoracao-x-auth';
export const LOGIN_LOCAL_STORAGE = 'editoracao-login';

export const LOCAL = `${API_URL}/local`;
export const AUTOR = `${API_URL}/autor`;
export const RUBRICA = `${API_URL}/rubrica`;
export const LIVRO = `${API_URL}/livro`;

export const HTTP_HEADER = {
  'Content-Type': 'application/json'
};

export const GET_HTTP_HEADER = token => ({
  'Content-Type': 'application/json',
  Authorization: token
});
