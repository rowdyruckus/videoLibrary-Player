import React from 'react';
import {SET_LOGIN_DATA} from '../actions/ApiData';

const initialState = {
  loginData: null,
};

const ApiData = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_DATA:
      return {
        ...state,
        loginData: action.response,
      };
    default:
      return state;
  }
};

export default ApiData;
