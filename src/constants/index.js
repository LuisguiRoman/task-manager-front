//servidor
export const server_url = process.env.REACT_APP_SERVER;
//Raiz de los servicios
export const api_url    = `${process.env.REACT_APP_SERVER}/api`;
//token de autenticacion para la sesión del usuario
export const auth_token = localStorage.getItem('user_tk');

//Endpoints
export const endpoints = {
    user: '/user',
    login: '/user/login',
    session: '/user/session',
    tasks: '/tasks'
};
