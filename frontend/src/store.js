import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import {allUsersReducer, newUserReducer, resetUserPasswordReducer, userReducer} from './reducers/userReducers'

const reducer = combineReducers({
  user: userReducer,
  allUsers: allUsersReducer,
  newUser: newUserReducer,
  resetPassword: resetUserPasswordReducer
});

let initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
