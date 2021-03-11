import axios from "axios";

class HttpMethod {
  constructor() {
    this.axios = axios;
    // this.axios.defaults.withCredentials = true;
  }

  attachTokenToHeader(token) {
    this.axios.interceptors.request.use((config) => {
      config.headers['Authorization'] = `Token ${token}`;
      config.headers['Accept'] = 'application/json; charset=utf-8';
      return config;
  }, (error) => {
      return Promise.reject(error);
  });
  }

  setUserToLocalStorage(user) {
    window.localStorage.setItem('user', JSON.stringify(user));
  }

  clearUserLocalStorage() {
    window.localStorage.removeItem('user');
  }

  getUserLocalStorage() {
    const user = window.localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
  
    return null;
  }

  get(...arg) {
    return this.axios.get(...arg);
  }

  post(...arg) {
    return this.axios.post(...arg);
  }

  put(...arg) {
    return this.axios.put(...arg);
  }

  patch(...arg) {
    return this.axios.patch(...arg);
  }

  delete(...arg) {
    return this.axios.delete(...arg);
  }
}

export default new HttpMethod();