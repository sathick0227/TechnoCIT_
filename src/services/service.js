import axios from 'axios';
import { SERVICES } from '../constants/constants';

export const SignupFc = (data) => {
  console.log(data)
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

        return resolve(response)
      })
      .catch(function (error) {
        return reject(error.message)
      });

  })
}

export const getEvents = (Token) => {
  return new Promise((resolve, reject) => {
    var config = {
      method: SERVICES.GET,
      url: SERVICES.EVENTS,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`,
      },
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

export const AddEvent = (data, Token) => {
  return new Promise((resolve, reject) => {
    var config = {
      method: SERVICES.POST,
      url: SERVICES.ADDEVENT,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`,
      },
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


export const UpdateEvent = (data, id, Token) => {
  console.log(data, id)
  return new Promise((resolve, reject) => {
    var config = {
      method: SERVICES.PUT,
      url: SERVICES.UPDATE,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`,
      },
      data: data
    };
    axios(config)
      .then(function (response) {
        return resolve(response)
      })
      .catch(function (error) {
        return reject(error)
      });

  })
}

export const deleteEvent = (id, Token) => {
  return new Promise((resolve, reject) => {
    var config = {
      method: SERVICES.POST,
      url: `${SERVICES.DELETE}${id}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`,
      },
      data: ""
    };
    axios(config)
      .then(function (response) {
        return resolve(response)
      })
      .catch(function (error) {
        return reject(error)
      });

  })
}


