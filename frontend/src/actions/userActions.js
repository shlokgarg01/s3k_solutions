import axiosInstance from "../utils/Config";
import {
  CLEAR_ERRORS,
  ADMIN_LOGOUT_SUCCESS,
  ADMIN_LOGOUT_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  GET_ADMIN_DETAILS_REQUEST,
  GET_ADMIN_DETAILS_SUCCESS,
  GET_ADMIN_DETAILS_FAIL,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL,
} from "../constants/userConstants";

// Login via email & password
export const login = (contactNumber, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axiosInstance.post(
      `/api/v1/login`,
      { contactNumber, password },
      config
    );
    localStorage.setItem("token", JSON.stringify(data.token));

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// load existing user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    const { data } = await axiosInstance.get(`/api/v1/me`);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response?.data?.message,
    });
  }
};

// logout user --Admin
export const userLogout = (userId) => async (dispatch) => {
  try {
    await axiosInstance.get(`/api/v1/logout/${userId}`);
    dispatch({ type: USER_LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// logout admin --Admin
export const adminLogout = (userId) => async (dispatch) => {
  try {
    await axiosInstance.get(`/api/v1/logout/${userId}`);
    localStorage.clear();
    dispatch({ type: ADMIN_LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({
      type: ADMIN_LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// register a user -- Admin
export const register = (params) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axiosInstance.post(
      `/api/v1/register`,
      params,
      config
    );
    dispatch({ type: REGISTER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Users -- Admin
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });
    const { data } = await axiosInstance.get(`/api/v1/admin/users`);
    dispatch({ type: ALL_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_USERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get User Details -- Admin
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axiosInstance.get(`/api/v1/admin/user/${id}`);
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Reset Password -- Admin
export const resetUserPassword = (userId, password) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axiosInstance.post(
      `/api/v1/admin/user/${userId}/reset_password`,
      { password },
      config
    );
    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Dashboard Details -- Admin
export const dashboardDetails = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ADMIN_DETAILS_REQUEST });
    const { data } = await axiosInstance.get(`/api/v1/admin/adminDetails`);
    dispatch({ type: GET_ADMIN_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ADMIN_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Edit User Profile -- Admin
export const editProfile = (userId, name, email) => async (dispatch) => {
  try {
    dispatch({ type: EDIT_PROFILE_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axiosInstance.put(
      `/api/v1/admin/user/${userId}/update`,
      { name, email },
      config
    );
    dispatch({ type: EDIT_PROFILE_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: EDIT_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Used to clear all the errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
