import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Fancybox from "../../component/fancybox.js";
// import { Helmet } from "react-helmet-async";
// import config from "../../config";
// ==============================|| MAIN LAYOUT ||============================== //
const MainLayout = () => {
  return (
    <>
      {/* <Helmet>
        <link rel="stylesheet" href={config.baseUrl + "/css/style.css"} />
      </Helmet> */}
      <Fancybox />
      <main>
        <div className="body-wrapper">
          <Header />
          <Sidebar />
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default MainLayout;
