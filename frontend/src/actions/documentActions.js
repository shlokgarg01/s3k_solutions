import axiosInstance from "../utils/Config";
import {
  CLEAR_ERRORS,
  DELETE_DOC_FAIL,
  DELETE_DOC_REQUEST,
  DELETE_DOC_SUCCESS,
  UPLOAD_GST_DOC_FAIL,
  UPLOAD_GST_DOC_REQUEST,
  UPLOAD_GST_DOC_SUCCESS,
  UPLOAD_ITR_DOC_FAIL,
  UPLOAD_ITR_DOC_REQUEST,
  UPLOAD_ITR_DOC_SUCCESS,
  UPLOAD_MISC_DOC_FAIL,
  UPLOAD_MISC_DOC_REQUEST,
  UPLOAD_MISC_DOC_SUCCESS,
} from "../constants/documentConstants";

// upload Misc Document for a user
export const uploadMiscDocument = (userId, name, file) => async (dispatch) => {
  try {
    dispatch({ type: UPLOAD_MISC_DOC_REQUEST });

    let formData = new FormData();
    formData.append("name", name);
    formData.append("files", file);

    const { data } = await axiosInstance.post(
      `api/v1/admin/user/${userId}/misc/new`,
      formData
    );

    dispatch({ type: UPLOAD_MISC_DOC_SUCCESS, payload: data.documents });
  } catch (error) {
    dispatch({
      type: UPLOAD_MISC_DOC_FAIL,
      payload: error.response.data.message,
    });
  }
};

// upload GST Document for a user
export const uploadGSTDocument = (userId, name, file) => async (dispatch) => {
  try {
    dispatch({ type: UPLOAD_GST_DOC_REQUEST });

    let formData = new FormData();
    formData.append("name", name);
    formData.append("files", file);

    const { data } = await axiosInstance.post(
      `api/v1/admin/user/${userId}/gst/new`,
      formData
    );

    dispatch({ type: UPLOAD_GST_DOC_SUCCESS, payload: data.documents });
  } catch (error) {
    dispatch({
      type: UPLOAD_GST_DOC_FAIL,
      payload: error.response.data.message,
    });
  }
};

// upload ITR Document for a user
export const uploadItrDocument = (userId, name, file) => async (dispatch) => {
  try {
    dispatch({ type: UPLOAD_ITR_DOC_REQUEST });

    let formData = new FormData();
    formData.append("name", name);
    formData.append("files", file);

    const { data } = await axiosInstance.post(
      `api/v1/admin/user/${userId}/itr/new`,
      formData
    );

    dispatch({ type: UPLOAD_ITR_DOC_SUCCESS, payload: data.documents });
  } catch (error) {
    dispatch({
      type: UPLOAD_ITR_DOC_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Document for a user
export const deleteDocument =
  (userId, doc_type, file_id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_DOC_REQUEST });
      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axiosInstance.delete(
        `api/v1/admin/user/${userId}/${doc_type}/delete/${file_id}`,
        config
      );

      dispatch({ type: DELETE_DOC_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: DELETE_DOC_FAIL,
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
