import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// Import F7 Styles
import "framework7/css/framework7.bundle.css";
// Import Icons and App Custom Styles
import "./style/css/app.css";
import "./style/public.less";

// import core from "./core";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

// Import F7 Bundle
import Framework7 from "framework7/framework7-lite.esm.bundle.js";

// Import F7-React Plugin
import Framework7React from "framework7-react";

// Init F7-React Plugin
Framework7.use(Framework7React);

declare global {
  interface Window {
    GlobalReactObject: any;
    MXSetting: any;
    MXCommon: any;
  }
}

const globalReactObject = ReactDOM.render(
  <App />,
  document.getElementById("root")
);

window.GlobalReactObject = globalReactObject;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

console.log("url>", process.env.REACT_APP_BASE_URL, process.env);

