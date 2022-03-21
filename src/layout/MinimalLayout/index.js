import React, { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import config from "../../config";
import { Helmet } from "react-helmet-async";
// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const location = useLocation();
  useEffect(() => {
    dispatch({ type: "signup/reset" });
  }, []);
  return (
    <>
      <Helmet>
        {/* <link rel="stylesheet" href={config.baseUrl + "/css/style.css"} /> */}
        <link rel="stylesheet" href={"https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"} />
      </Helmet>
      <main>
        <div className="signup-page" style={{ backgroundImage: `url(${config.imagepath}signupimg.png)` }}>
          <div className="signup-header bg-white">
            <div className="row align-items-center">
              <div className="signup-header-left col-auto">
                <Link to={"/login"} className="signup-logo">
                  <img src={`${config.imagepath}beautilogo-new.png`} alt="" />
                </Link>
              </div>
              <div className="signup-header-right col-auto ms-auto">
                <p className="already-login">
                  {location && location.pathname === "/login" && (
                    <Link to="/signup" className="cursor-pointer" onClick={() => dispatch({ type: "signup/reset" })}>
                      {t("Create Account")}
                    </Link>
                  )}
                  {location && location.pathname === "/signup" && (
                    <>
                      {t("Already have an account?")}
                      <Link to="/login" className="cursor-pointer">
                        {t("Login here")}.
                      </Link>
                    </>
                  )}
                  {location && location.pathname === "/forgotpassowrd" && (
                    <>
                      <Link to="/login" className="cursor-pointer ms-md-5">
                        {t("Login here")}.
                      </Link>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default MinimalLayout;
