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

export const allTicketsReducer = (state = { tickets: {} }, action) => {
  switch (action.type) {
    case ALL_TICEKTS_REQUEST:
      return {
        loading: true,
      };
    case ALL_TICEKTS_SUCCESS:
      return {
        ...state,
        loading: false,
        tickets: action.payload,
      };
    case ALL_TICEKTS_FAIL:
      return {
        ...state,
        loading: false,
        tickets: null,
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

export const ticketInfoReducer = (state = { ticket: {} }, action) => {
  switch (action.type) {
    case TICKET_INFO_REQUEST:
      return {
        loading: true,
      };
    case TICKET_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        ticket: action.payload,
      };
    case TICKET_INFO_FAIL:
      return {
        ...state,
        loading: false,
        ticket: null,
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

export const updateTicketReducer = (state = { updatedTicket: {} }, action) => {
  switch (action.type) {
    case UPDATE_STATUS_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: true,
        ticket: action.payload,
      };
    case UPDATE_STATUS_FAIL:
      return {
        ...state,
        loading: false,
        ticket: null,
        isUpdated: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        isUpdated: false,
        error: null,
      };
    default:
      return state;
  }
};
