import React from "react";
// import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "./assets/css/font-awsome.css";
import "./assets/scss/react-bootstrap.scss";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/style.css";
import "./assets/css/custom.css";
import "./assets/scss/custom.scss";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import "./i18n";
// import NavigationScroll from 'layout/NavigationScroll';
import * as serviceWorker from "./serviceWorker";
// import config from "./config";

import { store, persister } from "./store";
import { ToastContainer } from "react-toastify";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <BrowserRouter forceRefresh={true}>
          <HelmetProvider>
            {/* <NavigationScroll> */}
            <App />
            <ToastContainer position="top-right" autoClose={5000} icon={false} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
            {/* </NavigationScroll> */}
          </HelmetProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persister}>
//         <BrowserRouter forceRefresh={true}>
//           <HelmetProvider>
//             {/* <NavigationScroll> */}
//             <App />
//             <ToastContainer position="top-right" autoClose={5000} icon={false} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
//             {/* </NavigationScroll> */}
//           </HelmetProvider>
//         </BrowserRouter>
//       </PersistGate>
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById("root"),
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// serviceWorker.register();
serviceWorker.unregister();
