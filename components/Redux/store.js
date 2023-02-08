import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import headerDucks from "./headerDucks";
import songsDucks from "./songsDucks";

const rootReducer = combineReducers({
  songsData: songsDucks,
  headerData: headerDucks,
});

export default function generateStore() {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return store;
}
