import {
  SIGNUP_USER_REQUEST,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE,
  GET_DEPARTMENTS_REQUEST,
  GET_DEPARTMENTS_SUCCESS,
  GET_DEPARTMENTS_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
} from "./actionTypes";

import { saveData } from "./../store";

const initialState = {
  areDepartmentsLoading: false,
  departments: [],
  isAuthenticating: false,
  isRegisterationPending: false,
  isLoggedIn: false,
  user: {},
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGNUP_USER_REQUEST: {
      return { ...state, isRegisterationPending: true };
    }

    case SIGNUP_USER_SUCCESS: {
      saveData("user", { userData: payload, isLoggedIn: true });
      return { ...state, isRegisterationPending: false, user: payload };
    }

    case SIGNUP_USER_FAILURE: {
      return { ...state, isRegisterationPending: false };
    }

    case GET_DEPARTMENTS_REQUEST: {
      return { ...state, areDepartmentsLoading: true };
    }

    case GET_DEPARTMENTS_SUCCESS: {
      return {
        ...state,
        areDepartmentsLoading: false,
        departments: payload,
      };
    }

    case GET_DEPARTMENTS_FAILURE: {
      return { ...state, areDepartmentsLoading: false };
    }

    case LOGIN_USER_REQUEST: {
      return { ...state, isAuthenticating: true };
    }

    case LOGIN_USER_SUCCESS: {
      saveData("user", { userData: payload, isLoggedIn: true });
      return {
        ...state,
        isAuthenticating: false,
        isLoggedIn: true,
        user: payload,
      };
    }

    case LOGIN_USER_FAILURE: {
      return { ...state, isAuthenticating: false };
    }

    default:
      return state;
  }
};
