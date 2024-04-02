import {
  ALL_USERS_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  CLEAR_ERRORS,
  EDIT_PROFILE_FAIL,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  GET_ADMIN_DETAILS_FAIL,
  GET_ADMIN_DETAILS_REQUEST,
  GET_ADMIN_DETAILS_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  ADMIN_LOGOUT_FAIL,
  ADMIN_LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL,
} from "../constants/userConstants";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case ADMIN_LOGOUT_SUCCESS:
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
      };
    case LOAD_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case ADMIN_LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const allUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.users,
        usersCount: action.payload.usersCount,
      };
    case ALL_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newUserReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        loading: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUserCreated: true,
        user: action.payload,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        user: null,
        isUserCreated: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        isUserCreated: false,
      };
    default:
      return state;
  }
};

export const editUserReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
    case EDIT_PROFILE_REQUEST:
      return {
        loading: true,
      };
    case RESET_PASSWORD_SUCCESS:
    case EDIT_PROFILE_SUCCESS:
    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: true,
        user: action.payload,
      };
    case RESET_PASSWORD_FAIL:
    case EDIT_PROFILE_FAIL:
    case USER_LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        user: null,
        isUpdated: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        isUpdated: false,
      };
    default:
      return state;
  }
};

export const secondaryUserReducer = (state = { users: [] }, action) => { // used to fetch user documents
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        userDocuments: action.payload.userDocuments,
      };
    case USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        user: null,
        userDocuments: {},
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const adminDetailsReducer = (state = { adminDetails: {} }, action) => {
  switch (action.type) {
    case GET_ADMIN_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case GET_ADMIN_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        adminDetails: {
          usersCount: action.payload.usersCount,
          totalDocuments: action.payload.totalDocuments,
          itrDocumentsCount: action.payload.itrDocumentsCount,
          gstDocumentsCount: action.payload.gstDocumentsCount,
          miscDocumentsCount: action.payload.miscDocumentsCount,
        },
      };
    case GET_ADMIN_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        user: null,
        adminDetails: {
          usersCount: 0,
          totalDocuments: 0,
          itrDocumentsCount: 0,
          gstDocumentsCount: 0,
          miscDocumentsCount: 0,
        },
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
