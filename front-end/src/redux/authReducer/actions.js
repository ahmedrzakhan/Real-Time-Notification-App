import axios from "axios";
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

export const registerUserRequest = (payload) => ({
  type: SIGNUP_USER_REQUEST,
  payload,
});

export const registerUserSuccess = (payload) => ({
  type: SIGNUP_USER_SUCCESS,
  payload,
});

export const registerUserFailure = (payload) => ({
  type: SIGNUP_USER_FAILURE,
  payload,
});

export const registerUser = (payload) => async (dispatch) => {
  dispatch(registerUserRequest(payload));

  const config = {
    method: "post",
    url: "http://localhost:5000/api/user/register",
    headers: {
      "Content-Type": "application/json",
    },
    data: payload,
  };

  try {
    const response = await axios(config);
    dispatch(registerUserSuccess(response.data));
  } catch (err) {
    dispatch(registerUserFailure(err));
  }
};

export const loginUserRequest = (payload) => ({
  type: LOGIN_USER_REQUEST,
  payload,
});

export const loginUserSuccess = (payload) => ({
  type: LOGIN_USER_SUCCESS,
  payload,
});

export const loginUserFailure = (payload) => ({
  type: LOGIN_USER_FAILURE,
  payload,
});

export const loginUser = (payload) => async (dispatch) => {
  dispatch(loginUserRequest(payload));

  const config = {
    method: "post",
    url: "http://localhost:5000/api/user/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: payload,
  };

  try {
    const response = await axios(config);
    dispatch(loginUserSuccess(response.data));
  } catch (err) {
    dispatch(loginUserFailure(err));
  }
};

export const getDepartmentsRequest = (payload) => ({
  type: GET_DEPARTMENTS_REQUEST,
  payload,
});

export const getDepartmentsSuccess = (payload) => ({
  type: GET_DEPARTMENTS_SUCCESS,
  payload,
});

export const getDepartmentsFailure = (payload) => ({
  type: GET_DEPARTMENTS_FAILURE,
  payload,
});

export const getDepartments = (payload) => async (dispatch) => {
  dispatch(getDepartmentsRequest(payload));

  const config = {
    method: "get",
    url: "http://localhost:5000/api/user/departments",
  };

  try {
    const response = await axios(config);
    dispatch(getDepartmentsSuccess(response.data));
  } catch (err) {
    dispatch(getDepartmentsFailure(err));
  }
};
