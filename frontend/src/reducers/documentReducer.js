import {
  CLEAR_ERRORS,
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

export const uploadDocumentsReducer = (state = { documents: {} }, action) => {
  switch (action.type) {
    case UPLOAD_MISC_DOC_REQUEST:
    case UPLOAD_ITR_DOC_REQUEST:
    case UPLOAD_GST_DOC_REQUEST:
      return {
        loading: true,
      };
    case UPLOAD_MISC_DOC_SUCCESS:
    case UPLOAD_GST_DOC_SUCCESS:
    case UPLOAD_ITR_DOC_SUCCESS:
      return {
        ...state,
        loading: false,
        isUploaded: true,
        documents: action.payload,
      };
    case UPLOAD_MISC_DOC_FAIL:
    case UPLOAD_GST_DOC_FAIL:
    case UPLOAD_ITR_DOC_FAIL:
      return {
        ...state,
        loading: false,
        documents: null,
        isUploaded: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        isUploaded: false,
        error: null,
      };
    default:
      return state;
  }
};
