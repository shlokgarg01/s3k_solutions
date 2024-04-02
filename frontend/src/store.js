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
import { uploadDocumentsReducer } from "./reducers/documentReducer";

const reducer = combineReducers({
  user: userReducer,
  allUsers: allUsersReducer,
  newUser: newUserReducer,
  editUser: editUserReducer,
  secondaryUser: secondaryUserReducer,

  uploadDocuments: uploadDocumentsReducer,

  adminDetails: adminDetailsReducer
});

let initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
