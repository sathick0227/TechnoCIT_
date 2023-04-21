import axios from 'axios';
import { SERVICES } from '../constants/constants';

export const SignupFc = (data) => {
  return new Promise((resolve, reject) => {
    var config = {
      method: SERVICES.POST,
      url: SERVICES.REGISTER,
      headers: SERVICES.HEADERS,
      data: data
    };
    axios(config)
      .then(function (response) {
        return resolve(response)
      })
      .catch(function (error) {
        return reject(error.message)
      });

  })
}

export const LoginForms = (body) => {
  return new Promise((resolve, reject) => {
    var config = {
      method: SERVICES.POST,
      url: SERVICES.AUTHENTICATE,
      headers: SERVICES.HEADERS,
      data: body
    };
    axios(config)
      .then(function (response) {
        localStorage.setItem('token', response.data.token);
        const cache = localStorage.getItem('token')
        console.log(cache)
        return resolve(response)
      })
      .catch(function (error) {
        return reject(error.message)
      });

  })
}
