import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import {
  allUsersReducer,
  newUserReducer,
  resetUserPasswordReducer,
  secondaryUserReducer,
  userReducer,
} from "./reducers/userReducers";
import { uploadDocumentsReducer } from "./reducers/documentReducer";

const reducer = combineReducers({
  user: userReducer,
  allUsers: allUsersReducer,
  newUser: newUserReducer,
  resetPassword: resetUserPasswordReducer,
  secondaryUser: secondaryUserReducer,

  uploadDocuments: uploadDocumentsReducer
});

let initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
