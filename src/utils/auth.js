import Cookie from 'js-cookie';

export const setToken = (data) => Cookie.set('token', data);
export const getToken = () => Cookie.get('token');
export const removeToken = () => Cookie.remove('token');


export const setUserId = (data) => Cookie.set('id', data);
export const getUserId = () => Cookie.get('id');
export const removeUserId = () => Cookie.remove('id');

// export const setUser = (user) => Cookie.set('user', user);
// export const getUser = () => Cookie.get('user');
