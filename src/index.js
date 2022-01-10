import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "./assets/css/font-awsome.css";
import "./assets/scss/react-bootstrap.scss";
import "./assets/scss/custom.scss";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import "./i18n";
import NavigationScroll from 'layout/NavigationScroll';
import * as serviceWorker from 'serviceWorker';
// import config from "./config";

import { store, persister } from "./store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <BrowserRouter>
          <HelmetProvider>
            <NavigationScroll>
            <App />
            </NavigationScroll>
          </HelmetProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorker.register();
// serviceWorker.unregister();
