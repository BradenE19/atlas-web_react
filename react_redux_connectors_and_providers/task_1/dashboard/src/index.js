import React from "react";
import ReactDOM from "react-dom";
import { creatStore, Provider } from "react-redux";
import App from "./App/App";
import { uiReducer } from "./reducers/uiReducer";

const store = creatStore(uiReducer)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);