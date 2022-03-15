import { Link, Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import config from "../../config";
import { Helmet } from "react-helmet-async";
// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => {
  const { t } = useTranslation();
  const location = useLocation();
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
                <a href="#" className="signup-logo">
                  <img src={`${config.imagepath}beautilogo-new.png`} alt="" />
                </a>
              </div>
              <div className="signup-header-right col-auto ms-auto">
                <p className="already-login">
                  {location && location.pathname === "/login" && (
                    <Link to="/signup" className="cursor-pointer">
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
                </p>
                <a href="#" className="close-btn ms-md-5">
                  <img src="assets/images/close-icon.svg" alt="" />
                </a>
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
