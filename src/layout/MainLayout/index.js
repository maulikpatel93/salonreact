import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Helmet } from "react-helmet-async";
import Fancybox from "../../component/fancybox.js";
// import config from "../../config";
// ==============================|| MAIN LAYOUT ||============================== //
const MainLayout = () => {
  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="/css/style.css" />
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
