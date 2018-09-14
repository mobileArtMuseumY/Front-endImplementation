import Cookie from './cookie';

export const setToken = (data) => Cookie.set('token', data);
export const getToken = () => Cookie.get('token');

export const setUser = (user) => Cookie.set('user', user);
export const getUser = () => Cookie.get('user');
