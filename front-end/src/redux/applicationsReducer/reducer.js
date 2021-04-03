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

const initialState = {
  addApplicationPending: false,
  areApplicationsLoading: false,
  applications: [],
  isApplicationUpdating: false,
  otherDepartments: [],
  areDepartmentUsersLoading: false,
  departmentUsers: [],
};

export const applicationsReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case ADD_APPLICATION_REQUEST: {
      return { ...state, addApplicationPending: true };
    }

    case ADD_APPLICATION_SUCCESS: {
      return { ...state, addApplicationPending: false };
    }

    case ADD_APPLICATION_FAILURE: {
      return { ...state, addApplicationPending: false };
    }

    case GET_APPLICATIONS_REQUEST: {
      return { ...state, areApplicationsLoading: true };
    }

    case GET_APPLICATIONS_SUCCESS: {
      return { ...state, areApplicationsLoading: false, applications: payload };
    }

    case GET_APPLICATIONS_FAILURE: {
      return { ...state, areApplicationsLoading: false };
    }

    case GET_OTHER_DEPARTMENTS_REQUEST: {
      return { ...state };
    }

    case GET_OTHER_DEPARTMENTS_SUCCESS: {
      return {
        ...state,
        otherDepartments: payload,
      };
    }

    case GET_OTHER_DEPARTMENTS_FAILURE: {
      return { ...state };
    }

    case GET_DEPARTMENT_USERS_REQUEST: {
      return { ...state, areDepartmentUsersLoading: true };
    }

    case GET_DEPARTMENT_USERS_SUCCESS: {
      return {
        ...state,
        areDepartmentUsersLoading: false,
        departmentUsers: payload,
      };
    }

    case GET_DEPARTMENT_USERS_FAILURE: {
      return {
        ...state,
        areDepartmentUsersLoading: false,
        departmentUsers: payload,
      };
    }

    case UPDATE_APPLICATION_STATUS_REQUEST: {
      return { ...state, isApplicationUpdating: true };
    }

    case UPDATE_APPLICATION_STATUS_SUCCESS: {
      return {
        ...state,
        applications: payload,
        isApplicationUpdating: false,
      };
    }

    case UPDATE_APPLICATION_STATUS_FAILURE: {
      return { ...state, isApplicationUpdating: false };
    }

    default:
      return state;
  }
};
