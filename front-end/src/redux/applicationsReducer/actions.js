import axios from "axios";
import {
  ADD_APPLICATION_REQUEST,
  ADD_APPLICATION_SUCCESS,
  ADD_APPLICATION_FAILURE,
  GET_APPLICATIONS_REQUEST,
  GET_APPLICATIONS_SUCCESS,
  GET_APPLICATIONS_FAILURE,
  GET_OTHER_DEPARTMENTS_REQUEST,
  GET_OTHER_DEPARTMENTS_SUCCESS,
  GET_OTHER_DEPARTMENTS_FAILURE,
  GET_DEPARTMENT_USERS_REQUEST,
  GET_DEPARTMENT_USERS_SUCCESS,
  GET_DEPARTMENT_USERS_FAILURE,
  UPDATE_APPLICATION_STATUS_REQUEST,
  UPDATE_APPLICATION_STATUS_SUCCESS,
  UPDATE_APPLICATION_STATUS_FAILURE,
} from "./actionTypes";

export const addApplicationRequest = (payload) => ({
  type: ADD_APPLICATION_REQUEST,
  payload,
});

export const addApplicationSuccess = (payload) => ({
  type: ADD_APPLICATION_SUCCESS,
  payload,
});

export const addApplicationFailure = (payload) => ({
  type: ADD_APPLICATION_FAILURE,
  payload,
});

export const addApplication = (payload) => async (dispatch) => {
  dispatch(addApplicationRequest(payload));

  const config = {
    method: "post",
    url: "http://localhost:5000/api/application/add-application",
    headers: {
      "Content-Type": "application/json",
    },
    data: payload,
  };

  try {
    const response = await axios(config);
    dispatch(addApplicationSuccess(response.data));
  } catch (err) {
    dispatch(addApplicationFailure(err));
  }
};

export const getApplicationsRequest = (payload) => ({
  type: GET_APPLICATIONS_REQUEST,
  payload,
});

export const getApplicationsSuccess = (payload) => ({
  type: GET_APPLICATIONS_SUCCESS,
  payload,
});

export const getApplicationsFailure = (payload) => ({
  type: GET_APPLICATIONS_FAILURE,
  payload,
});

export const getApplications = (payload) => async (dispatch) => {
  dispatch(getApplicationsRequest(payload));

  const { assignedDepartment, assignedToUserId, createdByUserId, status } = payload;
  let queryParams;
  if (assignedDepartment) {
    queryParams = `assignedDepartment=${assignedDepartment}&assignedToUserId=${assignedToUserId}`;
  } else {
    queryParams = `createdByUserId=${createdByUserId}&status=${status}`;
  }

  const config = {
    method: "get",
    url: `http://localhost:5000/api/application/get-applications?${queryParams}`,
  };

  try {
    const response = await axios(config);
    dispatch(getApplicationsSuccess(response.data));
  } catch (err) {
    dispatch(getApplicationsFailure(err));
  }
};

export const getOtherDepartmentsRequest = (payload) => ({
  type: GET_OTHER_DEPARTMENTS_REQUEST,
  payload,
});

export const getOtherDepartmentsSuccess = (payload) => ({
  type: GET_OTHER_DEPARTMENTS_SUCCESS,
  payload,
});

export const getOtherDepartmentsFailure = (payload) => ({
  type: GET_OTHER_DEPARTMENTS_FAILURE,
  payload,
});

export const getOtherDepartments = (payload) => async (dispatch) => {
  getOtherDepartmentsRequest(payload);

  const config = {
    method: "get",
    url: `http://localhost:5000/api/application/get-other-departments?department=${payload}`,
  };

  try {
    const response = await axios(config);
    dispatch(getOtherDepartmentsSuccess(response.data));
  } catch (err) {
    dispatch(getOtherDepartmentsFailure(payload));
  }
};

export const getDepartmentUsersRequest = (payload) => ({
  type: GET_DEPARTMENT_USERS_REQUEST,
  payload,
});

export const getDepartmentUsersSuccess = (payload) => ({
  type: GET_DEPARTMENT_USERS_SUCCESS,
  payload,
});

export const getDepartmentUsersFailure = (payload) => ({
  type: GET_DEPARTMENT_USERS_FAILURE,
  payload,
});

export const getDepartmentUsers = (payload) => async (dispatch) => {
  getDepartmentUsersRequest(payload);

  const { department } = payload;

  const config = {
    method: "get",
    url: `http://localhost:5000/api/application/get-department-users?department=${department}`,
  };

  try {
    const response = await axios(config);
    dispatch(getDepartmentUsersSuccess(response.data));
  } catch (err) {
    dispatch(getDepartmentUsersFailure(payload));
  }
};

export const updateApplicationStatusRequest = (payload) => ({
  type: UPDATE_APPLICATION_STATUS_REQUEST,
  payload,
});

export const updateApplicationStatusSuccess = (payload) => ({
  type: UPDATE_APPLICATION_STATUS_SUCCESS,
  payload,
});

export const updateApplicationStatusFailure = (payload) => ({
  type: UPDATE_APPLICATION_STATUS_FAILURE,
  payload,
});

export const updateApplicationStatus = (payload) => async (
  dispatch,
  getState
) => {
  dispatch(updateApplicationStatusRequest(payload));

  const config = {
    method: "post",
    url: "http://localhost:5000/api/application/update-application-status",
    headers: {
      "Content-Type": "application/json",
    },
    data: payload,
  };

  try {
    const response = await axios(config);

    const { applications } = getState();
    const { applications: applicationsList } = applications;

    const newApplications = applicationsList.map((application) =>
      application._id === payload._id ? response.data : application
    );

    dispatch(updateApplicationStatusSuccess(newApplications));

  } catch (err) {
    dispatch(updateApplicationStatusFailure(payload));
  }
};
