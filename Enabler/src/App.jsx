import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import Navigation from "./Navigation";
import { Provider } from "react-redux";
import { store } from "./Store/store";

const App = () => (
  <div className=" dark-theme">
    <div className="app-container">
      <Navigation />
    </div>
  </div>
);
// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById("app")
// );

const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
