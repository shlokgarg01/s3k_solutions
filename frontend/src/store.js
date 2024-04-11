import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import {
  adminDetailsReducer,
  allUsersReducer,
  newUserReducer,
  editUserReducer,
  secondaryUserReducer,
  userReducer,
} from "./reducers/userReducers";
import { deleteDocumentReducer, uploadDocumentsReducer } from "./reducers/documentReducer";
import { allTicketsReducer, ticketInfoReducer, updateTicketReducer } from "./reducers/ticketReducer";

const reducer = combineReducers({
  user: userReducer,
  allUsers: allUsersReducer,
  newUser: newUserReducer,
  editUser: editUserReducer,
  secondaryUser: secondaryUserReducer,

  uploadDocuments: uploadDocumentsReducer,
  deletedDocument: deleteDocumentReducer,

  adminDetails: adminDetailsReducer,

  tickets: allTicketsReducer,
  ticket: ticketInfoReducer,
  updatedTicket: updateTicketReducer
});

let initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
