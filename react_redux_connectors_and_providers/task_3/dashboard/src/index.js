import React from "react";
import ReactDOM from "react-dom";
import { creatStore, Provider, applyMiddleware, compose} from "react-redux";
import thunk from 'redux-thunk'
import App from "./App/App";
import { uiReducer } from "./reducers/uiReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = creatStore(uiReducer, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);