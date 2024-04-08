import {
  ALL_TICEKTS_FAIL,
  ALL_TICEKTS_REQUEST,
  ALL_TICEKTS_SUCCESS,
  CLEAR_ERRORS,
  TICKET_INFO_FAIL,
  TICKET_INFO_REQUEST,
  TICKET_INFO_SUCCESS,
  UPDATE_STATUS_FAIL,
  UPDATE_STATUS_REQUEST,
  UPDATE_STATUS_SUCCESS,
} from "../constants/ticketConstants";
import axiosInstance from "../utils/Config";

// get all tickets
export const getAllTickets = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_TICEKTS_REQUEST });
    const { data } = await axiosInstance.get("/api/v1/admin/ticket/all");

    dispatch({ type: ALL_TICEKTS_SUCCESS, payload: data.tickets });
  } catch (error) {
    dispatch({
      type: ALL_TICEKTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get ticket info
export const getTicketInfo = (id) => async (dispatch) => {
  try {
    dispatch({ type: TICKET_INFO_REQUEST });
    const { data } = await axiosInstance.get(`/api/v1/admin/ticket/${id}`);

    dispatch({ type: TICKET_INFO_SUCCESS, payload: data.ticket });
  } catch (error) {
    dispatch({
      type: TICKET_INFO_FAIL,
      payload: error.message.data.message,
    });
  }
};

// update ticket status
export const updateTicketStatus = (id, status) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_STATUS_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axiosInstance.put(
      `/api/v1/admin/ticket/update/${id}`,
      { status },
      config
    );

    dispatch({ type: UPDATE_STATUS_SUCCESS, payload: data.ticket });
  } catch (error) {
    dispatch({
      type: UPDATE_STATUS_FAIL,
      payload: error?.message?.data?.message,
    });
  }
};

// Used to clear all the errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
