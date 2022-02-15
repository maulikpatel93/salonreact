import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Helmet } from "react-helmet-async";
import Fancybox from "../../component/fancybox.js";
import config from "../../config";
// ==============================|| MAIN LAYOUT ||============================== //
const MainLayout = () => {
  useEffect(() => {
   
  }, []);
  return (
    <>
      <Helmet>
        <link rel="stylesheet" href={config.baseUrl + "/css/style.css"} />
      </Helmet>
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
